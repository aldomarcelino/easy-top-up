import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const session = cookies().get("session")?.value;

  const formData = await request.formData();
  const amount = formData.get("amount");
  const method = formData.get("method");
  const note = formData.get("note");

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/history`,
      { amount: amount && Number(amount), method, note },
      { withCredentials: true, headers: { Authorization: `Bearer ${session}` } }
    );

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.response.data.message },
      { status: 400 }
    );
  }
}
