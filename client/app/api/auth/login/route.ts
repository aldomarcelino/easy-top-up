import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");
  const email = formData.get("email");
  const options: any = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    // Save the session in a cookie
    cookies().set("session", response.data.token, options);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.response.data.message },
      { status: 400 }
    );
  }
}
