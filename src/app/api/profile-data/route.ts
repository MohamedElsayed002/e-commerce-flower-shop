import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiUrl = `${process.env.API}/auth/profile-data`;
  const token = await getToken({ req });
  
  if (!token?.token) {
    return NextResponse.json({ error: "No session token found" }, { status: 401 });
  }
  
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "API request failed" },
        { status: response.status }
      );
    }

    const payload = await response.json();

    return NextResponse.json(payload.user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" }, 
      { status: 500 }
    );
  }
}