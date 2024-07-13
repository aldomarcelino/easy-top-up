import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = cookies().get("session")?.value;

    console.log(session, "<<session");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/history`,
      {
        headers: { Authorization: `Bearer ${session}` },
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.response.data.message },
      { status: 401 }
    );
  }
}
