import { getJWT } from "@/helpers/getJWT"
import Image from "next/image"


const User = () => {
    const session = getJWT()
  return (
    <Image className="p-1"  alt="user's image" width={64} height={64} src={`https://images.evetech.net/characters/${session?.user.id}/portrait?size=64`}/>
  )
}

export default User