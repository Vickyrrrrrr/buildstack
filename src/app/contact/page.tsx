import type { Metadata } from "next";
import ContactClientPage from "./client";

export const metadata: Metadata = {
  title: "Contact Us | Buildstack",
  description: "Contact the Buildstack team regarding AgentIC licensing, EDA automation partnerships, proprietary tool adapters, or support requests.",
};

export default function ContactPage() {
  return <ContactClientPage />;
}
