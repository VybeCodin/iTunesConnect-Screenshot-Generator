import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dataUrl, width, height } = body;

    if (!dataUrl || !width || !height) {
      return NextResponse.json(
        { error: "Missing required fields: dataUrl, width, height" },
        { status: 400 }
      );
    }

    // For MVP, we pass through the client-side rendered image
    // In production, this would use Sharp for optimization
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="screenshot-${width}x${height}.png"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Export failed" },
      { status: 500 }
    );
  }
}
