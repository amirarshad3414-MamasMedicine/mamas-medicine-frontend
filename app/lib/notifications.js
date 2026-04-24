/**
 * Notifications Helper
 * Client-side utilities for triggering admin notification emails
 */

/**
 * Send a purchase notification email
 * @param {Object} purchaseData
 */
export async function notifyPurchase({
  parentName,
  childName,
  customerEmail,
  productName,
  amount,
  orderId,
  customerId,
  paymentType,
}) {
  try {
    const response = await fetch("/api/notifications/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parentName,
        childName,
        customerEmail,
        productName,
        amount,
        orderId,
        customerId,
        paymentType,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[notifyPurchase] Success:", data);
    return data;
  } catch (error) {
    console.error("[notifyPurchase] Error:", error);
    throw error;
  }
}

/**
 * Send an onboarding completion notification email
 * @param {Object} onboardingData
 */
export async function notifyOnboarding({
  parentName,
  childName,
  parentEmail,
  parentDob,
  parentTimeOfBirth,
  parentPlaceOfBirth,
  childDob,
  childTimeOfBirth,
  childPlaceOfBirth,
  additionalContext,
  tonePreferences,
  otherPreferences,
}) {
  try {
    const response = await fetch("/api/notifications/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parentName,
        childName,
        parentEmail,
        parentDob,
        parentTimeOfBirth,
        parentPlaceOfBirth,
        childDob,
        childTimeOfBirth,
        childPlaceOfBirth,
        additionalContext,
        tonePreferences,
        otherPreferences,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[notifyOnboarding] Success:", data);
    return data;
  } catch (error) {
    console.error("[notifyOnboarding] Error:", error);
    throw error;
  }
}

/**
 * Send an issue flag notification email
 * @param {Object} issueData
 */
export async function notifyIssueFlag({
  stage,
  parentName,
  childName,
  customerEmail,
  errorMessage,
  relevantData,
  stackTrace,
}) {
  try {
    const response = await fetch("/api/notifications/issue-flag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stage,
        parentName,
        childName,
        customerEmail,
        errorMessage,
        relevantData,
        stackTrace,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("[notifyIssueFlag] Success:", data);
    return data;
  } catch (error) {
    console.error("[notifyIssueFlag] Error:", error);
    throw error;
  }
}
