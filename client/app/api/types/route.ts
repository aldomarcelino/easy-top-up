import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_RESTURL_API_SERVER}/types`,
      {
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data?.types, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 401 });
  }
}
