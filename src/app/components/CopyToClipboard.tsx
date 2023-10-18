'use client'

import Button from "./Button";

interface Props {
    value:string;
}
const CopyToClipboard = ({value}:Props) => {
    

  return (
    <Button text="Copy to clipboard" fn={(e)=>{navigator.clipboard.writeText(value)}}/>
  )
}

export default CopyToClipboard