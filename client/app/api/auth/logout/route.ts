import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  cookies().set("role", "", { expires: new Date(0) });
  console.log("masukkk");

  return NextResponse.json({ message: "success" }, { status: 200 });
}
