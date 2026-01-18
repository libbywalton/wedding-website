"use client";
import React, { useState, useEffect } from "react";

const guestLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/story" },
  { label: "Schedule", href: "/schedule" },
  { label: "RSVP", href: "/rsvp" },
  { label: "FAQs", href: "/faqs" },
];

const adminLinks = [
  ...guestLinks,
  { label: "Guest List", href: "/guest-list" },
];

export default function Navigation({ guest = guestLinks, admin = adminLinks }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = sessionStorage.getItem("role");
    setRole(savedRole);
  }, []);

  const links = role === "admin" ? admin : guest;

  return (
    <nav
      className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 justify-between md:justify-center"
      aria-label="Main navigation"
    >
      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="no-underline px-2 py-1 rounded-md text-base hover:text-sky-400"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Mobile: hamburger + dropdown */}
      <div className="md:hidden">
        <button
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="p-2 cursor-pointer"
          style={{ color: "var(--color-cornflower)" }}
          onClick={() => setOpen((s) => !s)}
          title="Toggle navigation"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            {open ? (
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M3 7h18M3 12h18M3 17h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        <div
          id="mobile-menu"
          role="menu"
          className={`md:hidden absolute left-0 right-0 top-full bg-background border-b border-gray-100 shadow-lg p-3 ${
            open ? "block" : "hidden"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              role="menuitem"
              className="block px-3 py-2 rounded-md no-underline text-sky-300 hover:text-sky-400"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
