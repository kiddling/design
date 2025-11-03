import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

type ReportCallback = (metric: Metric) => void;

export function setupWebVitals(onReport?: ReportCallback) {
  const reportMetric = onReport || sendToAnalytics;

  onCLS(reportMetric);
  onFCP(reportMetric);
  onINP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);
}

function sendToAnalytics(metric: Metric) {
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
  }

  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics/vitals", body);
  } else {
    fetch("/api/analytics/vitals", {
      body,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(console.error);
  }
}

export function logPageView(path: string) {
  if (import.meta.env.DEV) {
    console.log("[Analytics] Page view:", path);
  }

  fetch("/api/analytics/pageview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, timestamp: Date.now() }),
  }).catch(console.error);
}
