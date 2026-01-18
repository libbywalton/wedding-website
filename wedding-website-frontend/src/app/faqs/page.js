"use client";
import faqData from "../../../public/content/faqs.json";
import Navigation from "../components/navigation";

export default function FAQs() {
  return (
    <>
      <Navigation />
      <div className="p-8">
        <h1 className="text-6xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <ul className="space-y-4">
          {faqData.map((faq, index) => (
            <li key={index} className="border-b pb-4">
              <h2 className="text-xl font-semibold">{faq.question}</h2>
              <p className="mt-2">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
