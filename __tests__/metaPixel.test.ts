/**
 * @jest-environment jsdom
 *
 * E2E-ish unit coverage for the Meta Pixel tracking contract:
 *  - events fire exactly once per session (dedupe)
 *  - the same event with a different `source` fires separately
 *    (Dashboard vs Free journey distinction)
 *  - the Purchase success gate ignores the unreplaced Stripe placeholder
 */
import { trackPixelEvent } from "../lib/metaPixel";

describe("trackPixelEvent — fire-once + journey distinction", () => {
  let calls: Array<[string, string, any]>;

  beforeEach(() => {
    sessionStorage.clear();
    calls = [];
    // Stand in for the Meta Pixel global.
    (window as any).fbq = jest.fn((...args: any[]) =>
      calls.push(args as [string, string, any])
    );
  });

  test("fires an event exactly once, dedupes a repeat call", () => {
    trackPixelEvent("ViewContent", { source: "free", content_name: "free_insight_teaser" });
    trackPixelEvent("ViewContent", { source: "free", content_name: "free_insight_teaser" });

    const viewContent = calls.filter((c) => c[1] === "ViewContent");
    expect(viewContent).toHaveLength(1);
    expect(viewContent[0][2]).toMatchObject({ source: "free" });
  });

  test("same event name with different source fires separately (dashboard vs free)", () => {
    trackPixelEvent("InitiateCheckout", { source: "free" });
    trackPixelEvent("InitiateCheckout", { source: "dashboard" });
    trackPixelEvent("InitiateCheckout", { source: "free" }); // duplicate → ignored

    const ic = calls.filter((c) => c[1] === "InitiateCheckout");
    expect(ic).toHaveLength(2);
    expect(ic.map((c) => c[2].source).sort()).toEqual(["dashboard", "free"]);
  });

  test("Purchase carries value/currency/source and fires once per session", () => {
    const data = { value: 21.0, currency: "AUD", source: "dashboard", session_id: "cs_test_123" };
    trackPixelEvent("Purchase", data);
    trackPixelEvent("Purchase", data);

    const purchases = calls.filter((c) => c[1] === "Purchase");
    expect(purchases).toHaveLength(1);
    expect(purchases[0][2]).toMatchObject({ value: 21.0, currency: "AUD", source: "dashboard" });
  });
});

describe("Purchase success gate (mirrors onboardingMain / signup-flow guard)", () => {
  // The exact condition used on both success pages before firing Purchase.
  const shouldFirePurchase = (sessionId: string | null) =>
    !!sessionId && sessionId !== "{CHECKOUT_SESSION_ID}";

  test("does NOT fire on missing session_id (non-payment re-entry)", () => {
    expect(shouldFirePurchase(null)).toBe(false);
  });

  test("does NOT fire on the unreplaced Stripe placeholder", () => {
    expect(shouldFirePurchase("{CHECKOUT_SESSION_ID}")).toBe(false);
  });

  test("fires on a real Stripe session id", () => {
    expect(shouldFirePurchase("cs_live_a1b2c3")).toBe(true);
  });
});
