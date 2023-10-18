import ActivityTracker from "@/app/components/activity/ActivityTracker";

const page = () => {

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-3xl font-bold my-8 md:pl-10 md:text-start text-center p-0">
        Corp Members Activity
      </h1>
      <div className="flex justify-center w-full">
        <div className="p-8 bg-black/60">
        <ActivityTracker />
        </div>
      </div>
    </div>
  );
};

export default page;
