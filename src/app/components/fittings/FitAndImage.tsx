import Image from 'next/image'
import React from 'react'
import HiddenContent from '../HiddenContent'
interface Props{
    fit:{  id: number;
        name: string;
        doctricne: string;
        description: string;
        eft: string;
        ship: { id: string; name: string; canUser: boolean };
        items: { id: number; name: string; canUser: boolean }[];}
}
const FitAndImage = ({fit}:Props) => {
  return (
    <div className="p-8 flex flex-col h-fit items-center gap-2 w-72 ">
    <Image
      src={`https://${process.env.TECHNETURL}/types/${fit.ship.id}/render`}
      alt="Ship's image"
      width={250}
      height={250}
    />
    <HiddenContent content={fit.eft} />
  </div>
  )
}

export default FitAndImage