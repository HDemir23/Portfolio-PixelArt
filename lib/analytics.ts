"use client";

export type AnalyticsEventName =
  | "studio_enter"
  | "scene_open"
  | "object_open"
  | "external_link_click"
  | "portfolio_project_click"
  | "contact_click";

type AnalyticsPrimitive = string | number | boolean | null;
type AnalyticsEventParams = Record<string, AnalyticsPrimitive | undefined>;
type DataLayerEvent = {
  event: AnalyticsEventName;
} & Record<string, AnalyticsPrimitive>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function trackEvent(
  event: AnalyticsEventName,
  params: AnalyticsEventParams = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...withoutUndefinedValues(params),
  });
}

function withoutUndefinedValues(params: AnalyticsEventParams) {
  return Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, AnalyticsPrimitive] => (
      typeof entry[1] !== "undefined"
    )),
  );
}
