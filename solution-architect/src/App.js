import { useState } from "react";

const layers = [
  {
    id: "client",
    label: "01",
    name: "Client / Presentation Layer",
    color: "#FF6B35",
    accent: "#FF9A6C",
    icon: "◈",
    tagline: "What users see & touch",
    description:
      "The interface users interact with directly. Responsible for rendering UI, handling user input, and communicating with backend services. Must balance performance, accessibility, and experience.",
    options: [
      {
        name: "Web (SPA)",
        examples: "React, Vue, Angular",
        why: "Rich interactivity, fast navigation after initial load, great DX ecosystem",
        tradeoff: "Slower first load, SEO complexity",
      },
      {
        name: "Server-Side Rendering",
        examples: "Next.js, Nuxt, Remix",
        why: "Fast initial paint, SEO-friendly, works without JS",
        tradeoff: "Server cost, more complex caching strategy",
      },
      {
        name: "Mobile Native",
        examples: "Swift, Kotlin",
        why: "Best performance, full device access, native UX patterns",
        tradeoff: "Two codebases, slower iteration",
      },
      {
        name: "Cross-Platform Mobile",
        examples: "React Native, Flutter",
        why: "One codebase for iOS + Android, good performance",
        tradeoff: "Not 100% native feel, bridge overhead",
      },
      {
        name: "Desktop",
        examples: "Electron, Tauri, .NET MAUI",
        why: "Offline-first, system integration, powerful local compute",
        tradeoff: "Distribution complexity, update management",
      },
    ],
    when: "Choose based on your audience's device, SEO needs, and how much interactivity vs. initial speed you need.",
  },
  {
    id: "gateway",
    label: "02",
    name: "API Gateway / Edge Layer",
    color: "#8B5CF6",
    accent: "#A78BFA",
    icon: "⬡",
    tagline: "The front door to your backend",
    description:
      "Sits between clients and backend services. Handles cross-cutting concerns like auth, rate limiting, routing, and protocol translation so individual services don't have to.",
    options: [
      {
        name: "API Gateway",
        examples: "AWS API Gateway, Kong, NGINX",
        why: "Centralized auth, rate limiting, logging, SSL termination",
        tradeoff: "Single point of failure if not HA; adds latency hop",
      },
      {
        name: "BFF (Backend for Frontend)",
        examples: "Custom Node/Go service per client type",
        why: "Tailor API shape per client (mobile vs. web), reduce over-fetching",
        tradeoff: "More services to maintain",
      },
      {
        name: "GraphQL Gateway",
        examples: "Apollo Federation, Hasura",
        why: "Clients request exactly what they need, schema stitching across services",
        tradeoff: "Complex caching, N+1 queries if not careful",
      },
      {
        name: "CDN / Edge",
        examples: "Cloudflare Workers, Vercel Edge, Fastly",
        why: "Sub-10ms latency globally, DDoS protection, cache at the edge",
        tradeoff: "Limited compute; cold starts; vendor lock-in risk",
      },
    ],
    when: "Always have some gateway. If you have multiple client types (web, mobile, partner APIs), consider a BFF pattern.",
  },
  {
    id: "application",
    label: "03",
    name: "Application / Business Logic Layer",
    color: "#10B981",
    accent: "#34D399",
    icon: "⬢",
    tagline: "Where your core rules live",
    description:
      "The heart of your system. Encodes business rules, workflows, and domain logic. The most important layer to get right — changes here ripple everywhere.",
    options: [
      {
        name: "Monolith",
        examples: "Rails, Django, Laravel, Spring Boot",
        why: "Simple deployment, easy refactoring, fast early iteration, single transaction boundary",
        tradeoff:
          "Hard to scale individual bottlenecks; team size limit ~50 engineers",
      },
      {
        name: "Microservices",
        examples: "Node, Go, Java services via Kubernetes",
        why: "Independent scaling, team autonomy, polyglot tech choices",
        tradeoff: "Network latency, distributed transactions, ops complexity",
      },
      {
        name: "Serverless Functions",
        examples: "AWS Lambda, Vercel Functions, Cloudflare Workers",
        why: "Zero infra management, pay-per-use, infinite auto-scale",
        tradeoff: "Cold starts, 15min max execution, hard to debug locally",
      },
      {
        name: "Event-Driven / CQRS",
        examples: "Kafka consumers, EventBridge, Axon",
        why: "Loose coupling, great for audit logs, time-travel debugging",
        tradeoff: "Eventual consistency; harder to reason about state",
      },
    ],
    when: "Start with a modular monolith. Extract microservices only when you have clear scaling bottlenecks or team ownership boundaries.",
  },
  {
    id: "data",
    label: "04",
    name: "Data / Persistence Layer",
    color: "#F59E0B",
    accent: "#FCD34D",
    icon: "◉",
    tagline: "The source of truth",
    description:
      "Stores, retrieves, and manages your application's data. The choice here has the longest-lasting consequences — migrations are expensive and data outlives code.",
    options: [
      {
        name: "Relational DB (SQL)",
        examples: "PostgreSQL, MySQL, Aurora",
        why: "ACID transactions, powerful queries, mature tooling, schema enforces integrity",
        tradeoff: "Horizontal scaling is complex; rigid schema changes",
      },
      {
        name: "Document DB (NoSQL)",
        examples: "MongoDB, DynamoDB, Firestore",
        why: "Flexible schema, horizontal scale, good for hierarchical data",
        tradeoff: "No joins; eventual consistency; easy to create data chaos",
      },
      {
        name: "Time-Series DB",
        examples: "InfluxDB, TimescaleDB, ClickHouse",
        why: "Optimized for append-heavy metrics, logs, IoT data",
        tradeoff: "Not general-purpose; updating past records is awkward",
      },
      {
        name: "Graph DB",
        examples: "Neo4j, Amazon Neptune",
        why: "Perfect for relationships (social graphs, recommendation engines)",
        tradeoff: "Niche use case; steep learning curve",
      },
      {
        name: "Cache Layer",
        examples: "Redis, Memcached, Valkey",
        why: "Sub-millisecond reads, session storage, rate limiting, pub/sub",
        tradeoff: "Volatile by default; cache invalidation is notoriously hard",
      },
    ],
    when: "Default to PostgreSQL. Add Redis for caching. Add specialized DBs only when PostgreSQL genuinely can't serve the use case.",
  },
  {
    id: "integration",
    label: "05",
    name: "Integration / Messaging Layer",
    color: "#EC4899",
    accent: "#F9A8D4",
    icon: "⟁",
    tagline: "How services talk to each other",
    description:
      "Manages async communication between services and external systems. Decouples producers from consumers so they can evolve independently and absorb traffic spikes.",
    options: [
      {
        name: "Message Queue",
        examples: "RabbitMQ, AWS SQS, Azure Service Bus",
        why: "Point-to-point async, guaranteed delivery, work distribution",
        tradeoff: "Not for broadcasting; consumer must pull",
      },
      {
        name: "Event Streaming",
        examples: "Apache Kafka, AWS Kinesis, Redpanda",
        why: "Replay events, fan-out to many consumers, event sourcing",
        tradeoff: "Higher ops complexity; consumer offset management",
      },
      {
        name: "REST / HTTP",
        examples: "OpenAPI, JSON:API",
        why: "Universal, human-readable, cacheable, easy to debug",
        tradeoff: "Synchronous (caller waits); tight temporal coupling",
      },
      {
        name: "gRPC",
        examples: "Protocol Buffers over HTTP/2",
        why: "10x faster than REST for internal services, strongly typed, streaming",
        tradeoff: "Binary (harder to debug), not browser-native without proxy",
      },
      {
        name: "Webhooks",
        examples: "Stripe events, GitHub webhooks",
        why: "Push model — no polling needed, great for 3rd party integrations",
        tradeoff: "You must handle retries; no ordering guarantee",
      },
    ],
    when: "Use REST for external APIs. Use gRPC for internal service-to-service. Use Kafka/SQS for anything that needs to be async or fan out.",
  },
  {
    id: "infra",
    label: "06",
    name: "Infrastructure / Platform Layer",
    color: "#06B6D4",
    accent: "#67E8F9",
    icon: "▣",
    tagline: "What your code runs on",
    description:
      "The foundation everything sits on. Determines cost structure, operational complexity, and scaling behavior. A bad choice here is very expensive to change later.",
    options: [
      {
        name: "Cloud Managed (IaaS/PaaS)",
        examples: "AWS, GCP, Azure",
        why: "Massive ecosystem, global regions, managed everything from DBs to ML",
        tradeoff: "Vendor lock-in; bill shock without cost controls",
      },
      {
        name: "Containers (Kubernetes)",
        examples: "EKS, GKE, AKS, self-hosted k8s",
        why: "Portable workloads, fine-grained resource control, strong ecosystem",
        tradeoff: "High ops overhead; overkill for small teams",
      },
      {
        name: "Platform-as-a-Service",
        examples: "Heroku, Render, Railway, Fly.io",
        why: "Git-push deploys, managed everything, fast time-to-value",
        tradeoff: "Less control, more expensive at scale",
      },
      {
        name: "Serverless Platform",
        examples: "Vercel, Netlify, AWS Lambda",
        why: "Zero infra ops, auto-scale to zero, pay only for usage",
        tradeoff: "Runtime limits; cold start latency; complex local dev",
      },
      {
        name: "Bare Metal / On-Prem",
        examples: "Colocation, private cloud, VMware",
        why: "Maximum performance, data sovereignty, predictable cost at scale",
        tradeoff: "You manage everything; high upfront capex",
      },
    ],
    when: "Start on a PaaS or managed cloud. Graduate to Kubernetes when you have a dedicated platform team (5+ engineers).",
  },
  {
    id: "observability",
    label: "07",
    name: "Observability Layer",
    color: "#EF4444",
    accent: "#FCA5A5",
    icon: "◎",
    tagline: "Can you see what's happening?",
    description:
      "The 'nervous system' of production. Without it you're flying blind. Covers logs, metrics, traces, and alerts — the three pillars of observability.",
    options: [
      {
        name: "Logging",
        examples: "ELK Stack, Datadog Logs, Loki/Grafana",
        why: "Detailed event capture, debugging production issues, audit trails",
        tradeoff: "High storage cost at volume; must be structured (JSON)",
      },
      {
        name: "Metrics & Dashboards",
        examples: "Prometheus + Grafana, Datadog, CloudWatch",
        why: "Quantitative health signals, SLA tracking, capacity planning",
        tradeoff: "Metrics alone don't explain 'why'; need logs + traces too",
      },
      {
        name: "Distributed Tracing",
        examples: "Jaeger, Zipkin, Datadog APM, OpenTelemetry",
        why: "Follow a request across 20 microservices; find latency bottlenecks",
        tradeoff: "Sampling needed at scale; instrumentation overhead",
      },
      {
        name: "Error Tracking",
        examples: "Sentry, Rollbar, Bugsnag",
        why: "Catch exceptions in real-time, group by root cause, alert on regressions",
        tradeoff: "PII leakage risk; need scrubbing rules",
      },
      {
        name: "Alerting & On-Call",
        examples: "PagerDuty, OpsGenie, Grafana Alerting",
        why: "Get woken up before customers complain; define SLOs formally",
        tradeoff: "Alert fatigue if thresholds aren't tuned carefully",
      },
    ],
    when: "Build this from day one. The cheapest observability is the kind already in place before the outage happens.",
  },
];
export default function App() {
  const [active, setActive] = useState(0);
  const [expandedOption, setExpandedOption] = useState(null);
  const layer = layers[active];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e8e6e0",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #1e1e2e",
          padding: "28px 40px 20px",
          display: "flex",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#555",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Solution Architecture
        </span>
        <span style={{ color: "#222" }}>—</span>
        <span style={{ fontSize: 13, color: "#888", fontFamily: "monospace" }}>
          7 Essential Layers
        </span>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left nav */}
        <div
          style={{
            width: 260,
            borderRight: "1px solid #1a1a26",
            padding: "32px 0",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          {layers.map((l, i) => (
            <button
              key={l.id}
              onClick={() => {
                setActive(i);
                setExpandedOption(null);
              }}
              style={{
                width: "100%",
                background: active === i ? "#13131f" : "transparent",
                border: "none",
                borderLeft:
                  active === i
                    ? `3px solid ${l.color}`
                    : "3px solid transparent",
                padding: "14px 24px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  color: active === i ? l.color : "#333",
                  transition: "color 0.15s",
                  width: 22,
                  textAlign: "center",
                }}
              >
                {l.icon}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: active === i ? l.accent : "#444",
                    letterSpacing: "0.15em",
                    marginBottom: 3,
                  }}
                >
                  {l.label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: active === i ? "#e8e6e0" : "#666",
                    lineHeight: 1.3,
                    fontFamily: "monospace",
                    fontWeight: active === i ? "600" : "400",
                  }}
                >
                  {l.name}
                </div>
              </div>
            </button>
          ))}
        </div>
        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>
          {/* Layer header */}
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 36, color: layer.color }}>
                {layer.icon}
              </span>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: layer.accent,
                    letterSpacing: "0.2em",
                    marginBottom: 4,
                  }}
                >
                  LAYER {layer.label}
                </div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 400,
                    color: "#f0ede8",
                    lineHeight: 1.2,
                  }}
                >
                  {layer.name}
                </h1>
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                color: layer.color,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                marginBottom: 16,
                paddingLeft: 52,
              }}
            >
              ↳ {layer.tagline}
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "#9a9890",
                maxWidth: 680,
                margin: "0 0 0 52px",
                borderLeft: `2px solid ${layer.color}22`,
                paddingLeft: 20,
              }}
            >
              {layer.description}
            </p>
          </div>
          {/* Options */}
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "#444",
                letterSpacing: "0.2em",
                marginBottom: 16,
                paddingLeft: 4,
              }}
            >
              OPTIONS & TRADE-OFFS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {layer.options.map((opt, i) => {
                const isOpen = expandedOption === i;
                return (
                  <div
                    key={i}
                    style={{
                      background: isOpen ? "#13131f" : "#0d0d18",
                      border: `1px solid ${isOpen ? layer.color + "55" : "#1e1e2e"}`,
                      borderRadius: 4,
                      overflow: "hidden",
                      transition: "all 0.2s",
                    }}
                  >
                    <button
                      onClick={() => setExpandedOption(isOpen ? null : i)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        padding: "14px 20px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: isOpen ? layer.color : "#333",
                          flexShrink: 0,
                          transition: "background 0.2s",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            fontSize: 14,
                            color: isOpen ? "#f0ede8" : "#aaa",
                            fontFamily: "monospace",
                            fontWeight: isOpen ? "600" : "400",
                          }}
                        >
                          {opt.name}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "#555",
                            fontFamily: "monospace",
                            marginLeft: 12,
                          }}
                        >
                          {opt.examples}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          color: layer.color,
                          fontFamily: "monospace",
                          opacity: isOpen ? 1 : 0.3,
                        }}
                      >
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 20px 18px 40px" }}>
                        <div
                          style={{ display: "flex", gap: 24, flexWrap: "wrap" }}
                        >
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <div
                              style={{
                                fontSize: 9,
                                fontFamily: "monospace",
                                color: layer.accent,
                                letterSpacing: "0.2em",
                                marginBottom: 6,
                              }}
                            >
                              WHY USE IT
                            </div>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                color: "#b8b5ae",
                                lineHeight: 1.65,
                              }}
                            >
                              {opt.why}
                            </p>
                          </div>
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <div
                              style={{
                                fontSize: 9,
                                fontFamily: "monospace",
                                color: "#EF4444",
                                letterSpacing: "0.2em",
                                marginBottom: 6,
                              }}
                            >
                              TRADE-OFF
                            </div>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 13,
                                color: "#b8b5ae",
                                lineHeight: 1.65,
                              }}
                            >
                              {opt.tradeoff}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Decision guide */}
          <div
            style={{
              background: `linear-gradient(135deg, ${layer.color}08, ${layer.color}03)`,
              border: `1px solid ${layer.color}22`,
              borderRadius: 4,
              padding: "18px 24px",
              maxWidth: 680,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: layer.color,
                letterSpacing: "0.2em",
                marginBottom: 8,
              }}
            >
              ARCHITECT'S RULE OF THUMB
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#c0bdb5",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              {layer.when}
            </p>
          </div>
          {/* Layer navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 48,
              paddingTop: 24,
              borderTop: "1px solid #1a1a26",
            }}
          >
            <button
              disabled={active === 0}
              onClick={() => {
                setActive((a) => a - 1);
                setExpandedOption(null);
              }}
              style={{
                background: "transparent",
                border: "1px solid #1e1e2e",
                color: active === 0 ? "#333" : "#888",
                padding: "8px 20px",
                cursor: active === 0 ? "default" : "pointer",
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                borderRadius: 2,
              }}
            >
              ← PREV LAYER
            </button>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#444",
                alignSelf: "center",
              }}
            >
              {active + 1} / {layers.length}
            </span>
            <button
              disabled={active === layers.length - 1}
              onClick={() => {
                setActive((a) => a + 1);
                setExpandedOption(null);
              }}
              style={{
                background: "transparent",
                border: `1px solid ${active === layers.length - 1 ? "#1e1e2e" : layer.color + "44"}`,
                color: active === layers.length - 1 ? "#333" : layer.color,
                padding: "8px 20px",
                cursor: active === layers.length - 1 ? "default" : "pointer",
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                borderRadius: 2,
              }}
            >
              NEXT LAYER →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
