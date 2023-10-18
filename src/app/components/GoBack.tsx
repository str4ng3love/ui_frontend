'use client'

import { useRouter } from "next/navigation"
import Button from "./Button"


const GoBack = () => {
    const router = useRouter()
  return (
    <Button text="Go Back" fn={()=>router.back()}/>
  )
}

export default GoBack