import { NextResponse } from "next/server";

async function handler(req: Request) {
  if (req.method === "GET") {
    const { searchParams } = new URL(req.url);
    const jwt = searchParams.get("jwt");

    if (jwt) {
      return NextResponse.redirect(new URL("/", process.env.HOST), {
        headers: {
          "Set-Cookie": `JWT=${jwt}; sameSite=lax; maxAge=Session; Path=/;`,
        },
      });
    }
    return NextResponse.json({ error: "Invalid params" });
  }
  return NextResponse.json({ error: "Method not allowed" });
}

export { handler as GET };
