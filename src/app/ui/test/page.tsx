import Spinerini from "@/app/components/Spinerini" 

const loading = () => {
  return (
    <div className="min-h-[calc(100dvh_-_10rem)] -translate-x-[6.5%] flex items-center justify-center w-full flex-col"><Spinerini borderSize="border-[1rem]" h="h-32" w="w-32"/><h1 className="p-8 mt-20 font-bold text-5xl">Loading...</h1></div>
  )
}

export default loading