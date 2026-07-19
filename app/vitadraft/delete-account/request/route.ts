import { NextRequest, NextResponse } from "next/server";

const fallbackBackendUrl = "https://vitadraft-backend-production.up.railway.app";

function getBackendUrl() {
  const configuredUrl = process.env.VITADRAFT_BACKEND_URL?.trim();
  return (configuredUrl || fallbackBackendUrl).replace(/\/$/, "");
}

export async function POST(request: NextRequest) {
  const resultUrl = new URL("/vitadraft/delete-account", request.url);
  let status = "error";

  try {
    const form = await request.formData();
    const email = form.get("email");
    const website = form.get("website");
    const response = await fetch(`${getBackendUrl()}/account/deletion-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: typeof email === "string" ? email : "",
        website: typeof website === "string" ? website : "",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (response.ok) {
      status = "accepted";
    }
  } catch {
    status = "error";
  }

  resultUrl.searchParams.set("status", status);
  return NextResponse.redirect(resultUrl, 303);
}
