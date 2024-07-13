import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request: NextRequest) {
  const session = cookies().get("session")?.value;

  const formData = await request.formData();
  const id = formData.get("id");

  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/events/${id}`,
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
