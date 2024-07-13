import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const session = cookies().get("session")?.value;

  const formData = await request.formData();
  const name = formData.get("name");
  const type = formData.get("type");
  const event_date = formData.get("event_date");
  const location = formData.get("location");
  const status = formData.get("status");

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/events`,
      { name, type, event_date, location, status },
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
