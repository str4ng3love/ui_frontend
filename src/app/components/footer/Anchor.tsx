'use client'
import React from 'react'
import Link from "next/link"
interface Props {
    text:string,
    dest:string
}
const Anchor = ({dest,text}:Props) => {
  return (
    <Link target='_blank' className="p-1 hover:bg-text hover:text-baseColor hover:shadow-link hover:shadow-text uppercase font-semibold transition-all duration-300"  href={dest}>{text}</Link>
  )
}

export default Anchor