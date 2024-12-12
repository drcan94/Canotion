// src/app/api/paytr/callback/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  // Burada normalde gelen POST verilerini okuyup hash doğrulaması yapmanız,
  // sipariş durumunu güncellemeniz gerekir.
  // Bu örnekte sadece "OK" döner.

  return new NextResponse("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": "no-store",
    },
  });
}
