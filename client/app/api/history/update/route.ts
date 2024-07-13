import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: NextRequest) {
  const session = cookies().get("session")?.value;

  const formData = await request.formData();
  const status = formData.get("status");
  const id = formData.get("id");
  const reason = formData.get("reason");

  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/events/${id}`,
      { status, reason },
      { withCredentials: true, headers: { Authorization: `Bearer ${session}` } }
    );

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: e.response.data.message },
      { status: 400 }
    );
  }
}
