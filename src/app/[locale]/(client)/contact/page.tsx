"use client";
import React from "react";
import ContactForm from "./_components/contact-form";
import ContactIcons from "./_components/contact-icons";

// Contact Main Page
export default function page() {
  return (
    <div className="container m-auto flex items-center justify-between">
      {/* Contact Icons */}
      <ContactIcons />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
}
