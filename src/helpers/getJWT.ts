import { cookies } from "next/headers";

export const getJWT = () => {
  const cookieStore = cookies();
  const jwt = cookieStore.get("JWT");
  
  if(jwt?.value){
      const data = Buffer.from(jwt.value.split('.')[1], "base64").toString()
        const parsedData = JSON.parse(data)

        const session = {user:{name:parsedData.charName, id: parsedData.charId, corpId: parsedData.corpId, roles: parsedData.roles}, expires:parsedData.exp }
        return session
  } else {
    return null
  }
};
