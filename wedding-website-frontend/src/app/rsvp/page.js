"use client";

import { useState } from "react";
import { weddingApi } from "../utils/api";
import Navigation from "../components/navigation";

export default function RSVPPage() {
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      if (!form.name.trim()) {
        setErrors({ name: "Please enter your name" });
        return;
      }
      const response = await weddingApi.submitRsvp(form);
      console.log("RSVP submitted successfully:", response);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      const message = error.message || "Failed to submit RSVP";
      setErrors({ submit: message });
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(k, v) {
    setForm((s) => ({ ...s, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  const container = { maxWidth: 720, margin: "2rem auto", padding: "1rem" };
  const field = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "0.75rem",
  };
  const input = {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: 6,
    border: "1px solid #ccc",
  };
  const label = { marginBottom: "0.35rem", fontWeight: 600 };
  const errorStyle = {
    color: "#b00020",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  };

  return (
    <>
      <Navigation />
      <div style={container}>
        <h1 className="text-6xl font-bold mb-4 text-center">RSVP</h1>
        <p className="text-center">
          Please let us know if you&apos;ll be joining us — we can&apos;t wait
          to celebrate with you.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={field}>
            <label style={label} htmlFor="name">
              Your name *
            </label>
            <input
              id="name"
              name="name"
              style={input}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            {errors.name && <div style={errorStyle}>{errors.name}</div>}
          </div>

          <fieldset style={field}>
            <legend style={label}>Will you attend? *</legend>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label>
                <input
                  type="radio"
                  name="attending"
                  checked={form.attending === "yes"}
                  onChange={() => updateField("attending", "yes")}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="attending"
                  checked={form.attending === "no"}
                  onChange={() => updateField("attending", "no")}
                />{" "}
                No
              </label>
            </div>
            {errors.attending && (
              <div style={errorStyle}>{errors.attending}</div>
            )}
          </fieldset>

          {submitted && (
            <div
              style={{
                background: "#d4edda",
                color: "#155724",
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                border: "1px solid #c3e6cb",
              }}
            >
              Thank you! Your RSVP has been submitted successfully.
            </div>
          )}

          {errors.submit && (
            <div
              style={{
                background: "#f8d7da",
                color: "#721c24",
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                border: "1px solid #f5c6cb",
              }}
            >
              {errors.submit}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              type="submit"
              disabled={submitting || submitted}
              style={{
                padding: "0.6rem 1rem",
                borderRadius: 6,
                backgroundColor: submitting ? "#6c757d" : "#007bff",
                color: "white",
                border: "none",
                cursor: submitting || submitted ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Sending..." : submitted ? "Sent!" : "Send RSVP"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
