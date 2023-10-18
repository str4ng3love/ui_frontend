'use client'

import Link from "next/link"
import Image from "next/image";
interface Props {
    dest:string;
    text: string
    img?:boolean
    imgUrl?:string
}

const HeaderNav = ({dest,text, img, imgUrl}:Props) => {
  return (
    <>
        {img ?  <Link className="hover:bg-text hover:text-baseColor hover:shadow-text hover:shadow-link transition-all duration-300" href={dest}><Image width={64} height={64} src={imgUrl? imgUrl:""} alt=""/></Link>: <Link className="uppercase text-lg font-bold text-center p-2 w-[10ch] hover:bg-text hover:text-baseColor hover:shadow-text hover:shadow-link transition-all duration-300" href={dest}>{text}</Link>}
    </>
   
  )
}

export default HeaderNav