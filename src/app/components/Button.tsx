"use client";

import Link from "next/link";
import { BiSolidCog } from "react-icons/bi";
interface Props {
  text: string;
  fn?: (e: React.MouseEvent) => void;
  link?: string;
  textSize?: string;
  interactive?: boolean;
  bg?:string;
}
const Button = ({
  text,
  fn,
  link,
  textSize = "text-base",
  interactive = true,
  bg="bg-link"
}: Props) => {
  return (
    <>
      {fn ? (
        <div
          className={`${textSize} ${
            interactive
              ? "cursor-pointer hover:shadow-link hover:shadow-text hover:-translate-y-1 hover:text-baseColor hover:bg-text "
              : "bg-transparent text-text_inactive"
          } whitespace-nowrap ${bg} h-fit capitalize p-2 w-fit text-baseColor font-bold transition-all duration-300 flex items-center gap-2`}
          onClick={(e) => {
            fn(e);
          }}
        >
          {text}{interactive ? <></> : <span className="animate-spin"><BiSolidCog /></span>}
         
        </div>
      ) : (
        <></>
      )}
      {link ? (
        <Link
          className={`${textSize} ${
            interactive
              ? "cursor-pointer hover:shadow-link hover:shadow-text hover:-translate-y-1 hover:text-baseColor hover:bg-text "
              : "bg-transparent"
          } whitespace-nowrap ${bg} h-fit capitalize p-2 w-fit  text-baseColor font-bold transition-all duration-300 `}
          href={link}
        >
            {text}{interactive ? <></> : <span className="animate-spin"><BiSolidCog /></span>}
        </Link>
      ) : (
        <></>
      )}
    </>
  );
};

export default Button;
