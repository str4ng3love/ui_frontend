import { getJWT } from "@/helpers/getJWT";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function handler(req: Request) {
  if (req.method === "GET") {
    const session = getJWT();
    if (!session) {
      return NextResponse.json({ error: "You need to be authenticated" });
    }
    const cookieStore = cookies();
    const jwt = cookieStore.get("JWT");

    try {
      const now = new Date();
      const monthAgo = new Date();
      monthAgo.setDate(now.getDate() - 30);

      const params = new URLSearchParams({
        startDate: `${monthAgo.getFullYear()}-${ monthAgo.getMonth() + 1 }-${monthAgo.getDate()}T${now.getUTCHours()}:${now.getUTCMinutes()}:00.000-00:00`,
        endDate: `${now.getFullYear()}-${ now.getMonth() + 1}-${now.getDate()}T${now.getUTCHours()}:${now.getUTCMinutes()}:00.000-00:00`,
      });

      const resp = await fetch(`${process.env.URL}/activity?` + params, {
        headers: { Authorization: `Bearer ${jwt?.value}` },
      });

      if (resp.ok) {
        const activity:{ checkingDate: string; quota: number }[] = [...(await resp.json())];
      
        // activity.reverse()
        // let groupedByday: { checkingDate: string; quota: number }[] = [];
        // let activityByDay: { checkingDate: string; quota: number }[][] = [];

        // let prev = activity[0].checkingDate.toString().slice(0, -19);
        
        // activity.map((el: { checkingDate: string; quota: number }) => {

        //   if (el.checkingDate.toString().slice(0, -10).includes(prev)) {

        //     groupedByday.push(el);
        //   } else {
   
        //     activityByDay.push(groupedByday);
        //     groupedByday = [];
        //     groupedByday.push(el);
        //     prev = el.checkingDate.toString().slice(0, -19);
        //   }
        // });
        
        return NextResponse.json({ activity });
      } else if (resp.status === 403) {
        return NextResponse.json({ error: "Token invalid" });
      } else {
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
  //   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
export { handler as GET };
