import { getJWT } from "@/helpers/getJWT";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function handler(req: Request) {
  if (req.method === "POST") {
    const session = getJWT();
    const canUpload = session?.user.roles.filter((r: string) =>
      r.includes("ROLE_ADD_FIT")
    )
      ? true
      : false;
    if (!canUpload) {
      return NextResponse.json({ error: "Not Authorized" });
    } else {
      const body = await req.json();

      if (body.fit.length <= 0) return NextResponse.json({ error: "No fit provided" });

      const cookieStore = cookies();
      const jwt = cookieStore.get("JWT");
      try {
        const resp = await fetch(`${process.env.URL}/fit`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt?.value}`,
          },
        });
        if (resp.ok) {
        const message = await resp.json();
    
          revalidatePath("/ui/fittings", "layout");
          return NextResponse.json({ message: "Fitting added successfully", newFit:message });
        } else {
          return NextResponse.json({ error: "Internal server error" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  } else if (req.method === "DELETE") {
    const session = getJWT();
    const canUpload = session?.user.roles.filter((r: string) =>
      r.includes("ROLE_ADD_FIT")
    )
      ? true
      : false;
    if (!canUpload) {
      return NextResponse.json({ error: "Not Authorized" });
    } else {
      const body = await req.json();

      if (!body) return NextResponse.json({ error: "No id provided" });

      const cookieStore = cookies();
      const jwt = cookieStore.get("JWT");
      try {
        const resp = await fetch(`${process.env.URL}/fit/${body}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt?.value}`,
          },
        });

        if (resp.ok) {
          revalidatePath("/ui/fittings", "layout");
          return NextResponse.json({ message: "Fitting deleted successfully" });
        } else {
          return NextResponse.json({ error: "Internal server error" });
        }
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Could not connect to the server" });
      }
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
export { handler as POST, handler as DELETE };
