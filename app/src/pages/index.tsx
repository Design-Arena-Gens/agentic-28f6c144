import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Agentic Dashboard - Launch AI chatbots for your business</title>
        <meta
          name="description"
          content="Create, customize, and deploy white-labelled AI chatbots in minutes with Agentic Dashboard."
        />
      </Head>
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-white/5 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <div className="flex items-center gap-3 text-lg font-semibold">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg font-bold text-slate-950">
                AG
              </span>
              <span>Agentic Dashboard</span>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
              <a className="hover:text-white" href="#features">
                Features
              </a>
              <a className="hover:text-white" href="#how-it-works">
                How it works
              </a>
              <a className="hover:text-white" href="#pricing">
                Pricing
              </a>
            </nav>
            <Link
              href="/dashboard"
              className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:shadow-xl hover:shadow-emerald-400/40"
            >
              Launch Dashboard
            </Link>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl" />
              <div className="absolute -right-12 bottom-12 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
            </div>
            <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-24 text-center md:flex-row md:text-left">
              <div className="flex-1 space-y-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200">
                  Build. Embed. Scale.
                </span>
                <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                  Ship a branded AI chatbot for your business in minutes-not months.
                </h1>
                <p className="max-w-xl text-lg text-slate-200">
                  Agentic Dashboard is the fastest way to create support, sales, and onboarding AI agents. Design conversations, upload FAQs, and drop the embed snippet into your site-no engineers required.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:shadow-xl hover:shadow-emerald-400/40"
                  >
                    Start for free
                  </Link>
                  <a
                    href="#pricing"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-300/60 hover:text-white"
                  >
                    View pricing
                  </a>
                </div>
                <div className="flex items-center gap-6 text-left text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-white">5 minute setup</p>
                    <p>No developer hand-off</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Unlimited chat volume</p>
                    <p>Usage-based billing</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="rounded-2xl bg-white p-6 text-left text-slate-900 shadow-2xl">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-lg font-semibold">Onboarding Assistant</h2>
                        <p className="text-sm text-slate-500">Welcoming visitors 24/7</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        Live preview
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-slate-100 p-4">
                        <p className="text-sm font-medium text-slate-700">Agent</p>
                        <p className="text-sm text-slate-600">
                          Hello! I&apos;m here to guide you through our product. What are you curious about today?
                        </p>
                      </div>
                      <div className="rounded-2xl bg-emerald-500 p-4 text-white">
                        <p className="text-sm font-medium">Visitor</p>
                        <p className="text-sm">
                          I&apos;d like help choosing the right plan for my team.
                        </p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-4">
                        <p className="text-sm font-medium text-slate-700">Agent</p>
                        <p className="text-sm text-slate-600">
                          Happy to help! Teams that need collaboration start with Scale. It includes approval flows and CRM sync.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="bg-slate-900">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <div className="mb-12 max-w-3xl">
                <h2 className="text-3xl font-semibold text-white">Everything you need to launch a conversion-ready AI agent</h2>
                <p className="mt-4 text-slate-300">
                  Configure tone, knowledge, and routing in an interface your team will love. Generate a shareable snippet with one click.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold text-white">Visual conversation designer</h3>
                  <p className="mt-3 text-sm text-slate-300">
                    Draft guided flows for onboarding or lead qualification, mix them with FAQ automation, and hand off to humans when needed.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold text-white">Brand-perfect customization</h3>
                  <p className="mt-3 text-sm text-slate-300">
                    Control colors, tone of voice, and avatar. Embed seamlessly into any site with a single script tag.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold text-white">Insights that drive revenue</h3>
                  <p className="mt-3 text-sm text-slate-300">
                    Track conversations, capture leads, and measure performance with no extra tooling.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold text-white">Usage-based pricing</h3>
                  <p className="mt-3 text-sm text-slate-300">
                    Pay as you grow. Chargeback to clients with built-in seat management and billing exports.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="bg-slate-950">
            <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24 md:flex-row">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-semibold text-white">Launch a chatbot in three steps</h2>
                <p className="mt-4 text-slate-300">
                  Agentic Dashboard handles the entire lifecycle-from design to deployment and billing.
                </p>
              </div>
              <div className="grid flex-1 gap-8">
                {["Design your agent", "Generate embed snippet", "Track revenue"].map(
                  (title, index) => (
                    <div
                      key={title}
                      className="flex items-start gap-6 rounded-3xl border border-white/10 bg-white/5 p-8"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 text-lg font-semibold text-emerald-100">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                        <p className="mt-2 text-sm text-slate-300">
                          {[
                            "Choose tone, add FAQs, and craft automations tailored to your business goals.",
                            "Copy a single script tag and drop it into any website or no-code builder.",
                            "Monitor usage, bill clients, and fine tune performance from one dashboard.",
                          ][index]}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          <section id="pricing" className="bg-slate-900">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <div className="mb-12 text-center md:text-left">
                <h2 className="text-3xl font-semibold text-white">Simple pricing for growing teams</h2>
                <p className="mt-4 text-slate-300">
                  Start free and upgrade only when you need advanced workflows or higher usage limits.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold text-white">Launch</h3>
                  <p className="mt-2 text-sm text-slate-300">Everything you need to get live</p>
                  <p className="mt-6 text-3xl font-bold text-white">$49<span className="text-base font-normal text-slate-300">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-200">
                    <li>2 active chatbots</li>
                    <li>2K conversations included</li>
                    <li>Email capture</li>
                  </ul>
                </div>
                <div className="flex flex-col rounded-3xl border border-emerald-300/40 bg-emerald-400/10 p-8 shadow-xl shadow-emerald-400/10">
                  <h3 className="text-xl font-semibold text-white">Scale</h3>
                  <p className="mt-2 text-sm text-slate-200">Best for high-volume teams</p>
                  <p className="mt-6 text-3xl font-bold text-white">$149<span className="text-base font-normal text-emerald-100">/mo</span></p>
                  <ul className="mt-6 space-y-3 text-sm text-emerald-50">
                    <li>10 active chatbots</li>
                    <li>10K conversations included</li>
                    <li>CRM &amp; Slack integrations</li>
                    <li>Priority support</li>
                  </ul>
                </div>
                <div className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h3 className="text-xl font-semibold text-white">Enterprise</h3>
                  <p className="mt-2 text-sm text-slate-300">White-glove activation</p>
                  <p className="mt-6 text-3xl font-bold text-white">Custom</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-200">
                    <li>Unlimited chatbots</li>
                    <li>Dedicated CSM</li>
                    <li>SAML SSO &amp; audit logs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 bg-slate-950/90">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Agentic Dashboard. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a className="hover:text-white" href="mailto:hello@agentic.app">
                Contact
              </a>
              <Link className="hover:text-white" href="/dashboard">
                Launch dashboard
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
