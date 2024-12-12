// src/app/api/paytr/callback/route.ts
export async function POST() {
  // Hiçbir işlem yapmadan sadece "OK" döner
  return new Response("OK", { status: 200 });
}
