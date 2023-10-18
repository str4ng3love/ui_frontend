import { cookies } from "next/headers";
import { NextResponse } from "next/server";


async function handler (req:Request){
    const cookieStore = cookies()
    const jwt = cookieStore.get('JWT')

    return NextResponse.json({message: jwt})
}

export {handler as GET}