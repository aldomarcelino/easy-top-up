import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = cookies().get("session")?.value;
    const urlWithQueryParams = new URL(request.url);
    const page = urlWithQueryParams.searchParams.get("page");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/history`,
      {
        params: { page },
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
