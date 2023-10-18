import { getJWT } from "@/helpers/getJWT"
import SidebarNav from "./SidebarNav"
import {GiMoebiusTriangle} from 'react-icons/gi'

const Sidebar = () => {
  const session = getJWT()
  const canManage = session?.user.roles.filter((r: string) =>  r.includes("ROLE_ADD_FIT"))

  return (
    <aside className="flex flex-col items-start p-4 w-[15rem] h-full self-start top-[4rem] sticky bg-black/60 ring-2 ring-primary">
      {/* todo: animate the logo */}
      <span className="flex items-center font-bold text-xl justify-center w-full p-4">UI ZONE&nbsp;<GiMoebiusTriangle /></span>
    <SidebarNav navigation={[{dest:'/ui', text:'UI'}, {dest:"/ui/fittings", text:"fittings"}, {dest:"/ui/activity", text:"activity"}, {dest:"/ui/settings", text:"Settings"}]} canManage={canManage} />
    </aside>
  )
}

export default Sidebar