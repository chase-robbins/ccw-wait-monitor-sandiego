import { NextResponse } from "next/server";

const retoolApiUrl = process.env.NEXT_PUBLIC_RETOOL_API_URL;
const retoolApiKey = process.env.NEXT_PUBLIC_RETOOL_API_KEY;

export async function POST() {
  try {
    const response = await fetch(retoolApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Workflow-Api-Key": retoolApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
