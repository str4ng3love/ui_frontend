import { cookies } from "next/headers";
import { NextResponse } from "next/server"


async function handler(req:Request, {params}: {params:{slug:string}}){
    if(req.method === "GET"){
        const id = params.slug
        if(!id) return NextResponse.json({error: 'Please provide id param'}, {status: 400})
            const cookieStore = cookies();
            const jwt = cookieStore.get("JWT");
            try {
              const resp = await fetch(`${process.env.URL}/fit/${id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt?.value ? jwt.value : ""}`,
                },
              });
            //   todo optimistic revalidation
              if (resp.ok) {
                const fit = await resp.json();
          
                return NextResponse.json({fit}, {status: 200})
              } else {
                return NextResponse.json({error: 'Fit not found'}, {status: 404})
              }
            } catch (error) {
              console.log(error);
              NextResponse.json({error: 'Could not connect to server'}, {status: 500})
            }
      
    } else {
        return NextResponse.json({error: 'Method not allowed'}, {status: 405})
    }
}

export {handler as GET}