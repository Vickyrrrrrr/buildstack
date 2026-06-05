import Link from "next/link";
import { ArrowRight, CheckCircle2, MonitorDown, RefreshCw } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OpenDesktopButton } from "./OpenDesktopButton";
import { redirect } from "next/navigation";

const nextSteps = [
  "Choose Open AgentIC Desktop and approve the browser handoff when prompted.",
  "IMPORTANT: Sign in to the desktop app using the exact same Google email you just verified before purchasing on Lemon Squeezy.",
  "Configure your BYOK model provider, then start your local workspace run.",
] as const;

// Lemon Squeezy API Key
const API_KEY = process.env.LEMON_SQUEEZY_API_KEY;

interface LemonSqueezyOrderResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      status: string;
      created_at: string;
    };
  };
}

async function verifyOrder(orderId: string): Promise<boolean> {
  if (!API_KEY) {
    console.warn("LEMON_SQUEEZY_API_KEY is not defined. Skipping validation in development.");
    return true; // Bypass in dev environment if API key is not configured
  }

  try {
    const res = await fetch(`https://api.lemonsqueezy.com/v1/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    });

    if (!res.ok) {
      console.error(`Lemon Squeezy API returned error: ${res.statusText}`);
      return false;
    }

    const json: LemonSqueezyOrderResponse = await res.json();
    const status = json.data?.attributes?.status;
    const createdAt = json.data?.attributes?.created_at;

    // 1. Order status must be paid or completed
    if (status !== "paid" && status !== "completed") {
      console.error(`Order is not paid. Status: ${status}`);
      return false;
    }

    // 2. Prevent replay attacks / sharing order links by ensuring the purchase was recent (within the last 30 minutes)
    if (createdAt) {
      const orderTime = new Date(createdAt).getTime();
      const currentTime = Date.now();
      const diffMinutes = (currentTime - orderTime) / (1000 * 60);

      if (diffMinutes > 30 || diffMinutes < -2) { // Allow slight clock drift
        console.error(`Order link expired. Created ${diffMinutes.toFixed(1)} minutes ago.`);
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error("Error verifying Lemon Squeezy order:", err);
    return false;
  }
}

export default async function AgentICSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; order_id?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId || params.order_id;

  if (!orderId) {
    redirect("/agentic/pricing");
  }

  const isValid = await verifyOrder(orderId);
  if (!isValid) {
    redirect("/agentic/pricing");
  }

  return (
    <div className="page-shell">
      <Navigation />

      <main className="pt-28">
        <section className="section-shell">
          <div className="container">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-launch-radial shadow-surface">
              <div className="circuit-tile relative p-6 md:p-10">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                  <Badge variant="accent" className="mx-auto w-fit">
                    Payment Complete
                  </Badge>
                  <CheckCircle2 className="mx-auto h-12 w-12 text-accent-primary" />
                  <div className="space-y-4">
                    <h1 className="section-title">Your purchase is complete.</h1>
                    <p className="body-copy text-lg">
                      Your AgentIC license has been saved successfully. If you already have the desktop app installed, click the button below to open it. Otherwise, you can download it to get started.
                    </p>
                  </div>
                  <OpenDesktopButton />
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button asChild variant="ghost" size="lg">
                      <Link href="/agentic/download">
                        <MonitorDown className="h-4 w-4" />
                        Download Desktop
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg">
                      <Link href="/contact">
                        Need Help
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 grid max-w-4xl gap-3">
              {nextSteps.map((step) => (
                <div key={step} className="surface-panel flex items-center gap-4 p-5">
                  <RefreshCw className="h-5 w-5 shrink-0 text-accent-primary" />
                  <p className="text-text-primary">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
