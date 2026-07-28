import { NextResponse } from "next/server";
import { EXPERIENCE_SOURCE } from "../../../source";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const source = EXPERIENCE_SOURCE[slug];

  if (!source) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ source });
}
