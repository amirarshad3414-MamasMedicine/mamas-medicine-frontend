"use client";
import React from "react";
import { motion } from "framer-motion";

export const OnboardingBegin = () => {
  return (
    <section style={styles.page}>
      {/* Animated Background Glow */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.glow3} />

      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* TITLE */}
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          I'm so excited to begin this with you.
        </motion.h1>

        {/* FEATURES */}
        <motion.div
          style={styles.features}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {[
            { icon: "⚡", text: "We'll ask for a few details so your insight can be prepared with care." },
            { icon: "🎯", text: "You don't need to rush, and you don't need to get everything perfect." },
            { icon: "🔒", text: "You can pause and return at any time." },
          ].map((item, i) => (
            <motion.div
              key={i}
              style={styles.feature}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span style={styles.featureIcon}>{item.icon}</span>
              <span style={styles.featureText}>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* BUTTONS */}
        <motion.div
          style={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            style={styles.primaryBtn}
            whileHover={{ scale: 1.05, backgroundColor: "#FFD4B5" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/onboarding/next")}
          >
            Get Started
            <span style={styles.btnArrow}>→</span>
          </motion.button>

          <motion.button
            style={styles.secondaryBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Skip for now
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    background: "#FFFFFF",
    position: "relative",
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    top: "20%",
    left: "-10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(252,189,151,0.3), transparent 70%)",
    filter: "blur(80px)",
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  },

  glow2: {
    position: "absolute",
    bottom: "10%",
    right: "-5%",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, rgba(252,189,151,0.2), transparent 70%)",
    filter: "blur(100px)",
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  },

  glow3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "800px",
    background: "radial-gradient(circle, rgba(252,189,151,0.15), rgba(252,189,151,0) 70%)",
    filter: "blur(120px)",
    borderRadius: "50%",
    zIndex: 0,
    pointerEvents: "none",
  },

  container: {
    maxWidth: "680px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "32px",
    zIndex: 2,
    position: "relative",
  },

  title: {
    fontSize: "clamp(36px, 6vw, 52px)",
    fontWeight: "700",
    color: "#2c1810",
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
    margin: 0,
  },

  features: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "8px",
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 24px",
    borderRadius: "60px",
    background: "rgba(255, 255, 255, 0.85)",
    border: "1px solid rgba(252, 189, 151, 0.35)",
    fontSize: "15px",
    color: "#000000",
    fontWeight: "500",
    cursor: "default",
    transition: "all 0.2s ease",
  },

  featureIcon: {
    fontSize: "20px",
    flexShrink: 0,
  },

  featureText: {
    flex: 1,
    textAlign: "left",
    lineHeight: "1.4",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "16px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    background: "#FCBD97",
    color: "#000000",
    border: "none",
    padding: "14px 36px",
    borderRadius: "40px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
    boxShadow: "0 8px 20px rgba(252, 189, 151, 0.3)",
  },

  btnArrow: {
    fontSize: "18px",
    transition: "transform 0.2s ease",
  },

  secondaryBtn: {
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(252, 189, 151, 0.4)",
    color: "#000000",
    padding: "14px 32px",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
};