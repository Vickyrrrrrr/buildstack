"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "contactme@buildstack.live",
    href: "mailto:contactme@buildstack.live",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+91 79053 88194",
    href: "https://wa.me/917905388194",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote, working globally",
    href: null,
  },
] as const;

const inquiryTypes = [
  "AgentIC desktop license",
  "EDA automation partnership",
  "Proprietary tool adapter",
  "Support request",
  "Other",
] as const;

export default function ContactClientPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "AgentIC desktop license",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Buildstack inquiry: ${formState.inquiryType}`);
    const body = encodeURIComponent(`Name: ${formState.name}
Email: ${formState.email}
Company: ${formState.company}
Inquiry: ${formState.inquiryType}

Message:
${formState.message}`);

    window.location.href = `mailto:contactme@buildstack.live?subject=${subject}&body=${body}`;
  };

  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28">
        <section className="section-shell">
          <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-5">
                <Badge variant="accent" className="w-fit">
                  Contact Buildstack
                </Badge>
                <h1 className="section-title">Talk to us about silicon automation.</h1>
                <p className="body-copy text-lg">
                  Questions about AgentIC licensing, desktop deployment, proprietary EDA
                  adapters, or commercial support all land here.
                </p>
              </div>

              <div className="grid gap-3">
                {contactMethods.map((item) => (
                  <div key={item.label} className="surface-panel flex items-center gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent-primary/30 bg-accent-primary/10">
                      <item.icon className="h-5 w-5 text-accent-primary" />
                    </div>
                    <div>
                      <p className="eyebrow">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-text-primary transition hover:text-accent-primary">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-text-primary">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="elevated-panel flex gap-4 p-6">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-accent-primary" />
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-[-0.02em]">
                    Do not send confidential design files.
                  </h2>
                  <p className="body-copy text-sm">
                    AgentIC is built so your RTL, PDKs, logs, and artifacts stay local.
                    For support, describe the issue and tool context first; we will ask
                    before any sensitive detail is needed.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="elevated-panel space-y-5 p-6 md:p-8">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="eyebrow">Name</span>
                  <input
                    required
                    value={formState.name}
                    onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
                    className="h-12 rounded-full border border-border bg-bg-base px-4 text-text-primary outline-none transition focus:border-accent-primary"
                    placeholder="Your name"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="eyebrow">Email</span>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))}
                    className="h-12 rounded-full border border-border bg-bg-base px-4 text-text-primary outline-none transition focus:border-accent-primary"
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="eyebrow">Company</span>
                <input
                  value={formState.company}
                  onChange={(event) => setFormState((state) => ({ ...state, company: event.target.value }))}
                  className="h-12 rounded-full border border-border bg-bg-base px-4 text-text-primary outline-none transition focus:border-accent-primary"
                  placeholder="Company or lab"
                />
              </label>

              <label className="grid gap-2">
                <span className="eyebrow">Inquiry</span>
                <select
                  value={formState.inquiryType}
                  onChange={(event) => setFormState((state) => ({ ...state, inquiryType: event.target.value }))}
                  className="h-12 rounded-full border border-border bg-bg-base px-4 text-text-primary outline-none transition focus:border-accent-primary"
                >
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="eyebrow">Message</span>
                <textarea
                  required
                  value={formState.message}
                  onChange={(event) => setFormState((state) => ({ ...state, message: event.target.value }))}
                  className="min-h-40 rounded-[1.5rem] border border-border bg-bg-base px-4 py-4 text-text-primary outline-none transition focus:border-accent-primary"
                  placeholder="Tell us what you are trying to build, what flow you use, and how we can help."
                />
              </label>

              <Button type="submit" size="lg" className="w-full justify-between">
                Open Email Draft
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
