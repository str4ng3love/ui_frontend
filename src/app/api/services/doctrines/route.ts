import { getJWT } from "@/helpers/getJWT";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function handler(req: Request) {
  if (req.method === "GET") {
   
    try {
      const cookieStore = cookies();
      const jwt = cookieStore.get("JWT");
      const resp = await fetch(`${process.env.URL}/doctrine`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt?.value}`,
        },
      });
      
      if (resp.ok) {
        const doctrines = await resp.json();
        const alphaBetaDoctrines = doctrines.sort((a:{name:string},b:{name:string})=>a.name.localeCompare(b.name))
        return NextResponse.json(alphaBetaDoctrines);
      } else {
        return NextResponse.json({error: `Could not get doctrines, try again later`})
      }
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: `Could not connect to the server`})
    }
  } else if (req.method === "POST") {

    const session = getJWT();
    const canManage = session?.user.roles.filter((r: string) =>
      r.includes("ROLE_ADD_FIT")
    );
    if (!canManage) {
      return NextResponse.json({ error: `Not authorized` }, { status: 401 });
    }
    const body = await req.json();
    if (body.name.length <= 2) {
      return NextResponse.json({
        error: `Doctrine's name should be atleast 3 letters long`,
      });
    }
    const cookieStore = cookies();
    const jwt = cookieStore.get("JWT");
  
    try {
      const resp = await fetch(`${process.env.URL}/doctrine`, {
        method: "POST",
        body:JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt?.value}`,
        },
      });
      if (resp.ok) {
        const doctrine = resp.json();
        return NextResponse.json({
          message: "Doctrine added successfully",
          doctrine,
        });
      } else {

        return NextResponse.json({
          error: "Could not create the doctrine, try again later",
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Internal sever error" });
    }


  } else if(req.method === 'DELETE'){
    const body = await req.json()
   if(!body){

    return NextResponse.json({
      error: `Must provide doctrine ID`,
    });
   }
   const cookieStore = cookies();
   const jwt = cookieStore.get("JWT");
    try {
      const resp = await fetch(`${process.env.URL}/doctrine`, {
        method: "DELETE",
        body:JSON.stringify({id:body}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt?.value}`,
        },
      });
      if (resp.ok) {
        const doctrine = resp.json();
        return NextResponse.json({
          message: "Doctrine deleted successfully",

        });
      } else {

        return NextResponse.json({
          error: "Could not delete the doctrine, try again later",
        });
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Internal sever error" });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}

export { handler as GET, handler as POST, handler as DELETE };
