"use client";
import { useEffect, useState } from "react";
import { request } from "../../devlinkModified/env";
import "./purchase.css";
import "../loader.css";
import "../swal.css";
import swal from "sweetalert";

function PurchaseModal({ isOpen = true, redirectUrl, onPurchase }) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    window.location.href = redirectUrl;
  };

  const handlePurchase = () => {
    if (!email) return alert("Enter email");
    onPurchase?.({ email });
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal purchase-modal"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        {/* X button */}
        <div className="modal-close" onClick={handleClose}>
          ✕
        </div>

        <h2>Enter Email</h2>

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <button className="purchase-btn" onClick={handlePurchase}>
          Purchase
        </button>
      </div>
    </div>
  );
}

const App = () => {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const onPurchase = async ({}) => {
    setLoading(true);
    try {
      const { url } = await request({
        method: "POST",
        endpoint: "create_checkout_session",
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: {
          success_url: `${window.location.origin}/signup`,
          cancel_url: `${window.location.origin}?payment_failed`,
          line_items: [
            {
              price: "price_1TJpsTBpexBWLlCZSca5AXtq",
              quantity: 1,
            },
          ],
        },
      });
      window.location.href = url;
    } catch (e) {
      console.error("Purchase error", e);
      swal({
        title: "Error",
        text: e?.message || "Something went wrong. Please try again.",
        icon: "error",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    onPurchase({});
  }, []);

  if (loading)
    return (
      <div className="loader-container" style={{ height: "100vh" }}>
        <div className="loader" />
      </div>
    );

  return <></>;
};

export default App;
