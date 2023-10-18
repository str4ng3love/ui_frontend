"use client";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Spinerini from "../Spinerini";

const getActivity = async () => {
  try {
    const resp = await fetch(`/api/services/activity`);
    const message = await resp.json();

    return message;
  } catch (error) {
    console.log(error);
  }
};

const ActivityTracker = ({}) => {
  const [filteredActivity, setFilteredActivity] = useState<
    { checkingDate: Date; quota: number }[]
  >([]);
  const [activity, setActivity] =
    useState<{ checkingDate: Date; quota: number }[]>();
  const [day, setDay] = useState("");
  const svgRef = useRef(null);
  const chartMargin = { top: 20, right: 20, bottom: 20, left: 50 };
  const chartWidth = 900 - chartMargin.left - chartMargin.right;
  const chartHeight = 600 - chartMargin.top - chartMargin.bottom;
const drawChart = (arr:{checkingDate: Date;
  quota: number;
}[])=>{
  const svg = d3.select(svgRef.current);
  svg
    .attr("width", chartWidth + chartMargin.left + chartMargin.right)
    .attr("height", chartHeight + chartMargin.top + chartMargin.bottom)
    .append("g")
    .attr(
      "transform",
      `translate(${chartMargin.left}, ${chartMargin.right})`
    );
  const x = d3.scaleTime().range([chartWidth, 0]);
  const y = d3.scaleLinear().range([chartHeight, 0]);

  // @ts-ignore
  x.domain(d3.extent(arr, (d) => d.checkingDate).reverse());
  // @ts-ignore
  y.domain([0, d3.max(arr, (d) => d.quota)]);
  svg
    .append("g")
    .attr("transform", `translate(50,${chartHeight})`)
    .call(d3.axisBottom(x).ticks(d3.timeHour.every(1)));
  svg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(y));
  // @ts-ignore
  const line = d3
    .line()
    // @ts-ignore
    .x((d) => x(d.checkingDate))
    // @ts-ignore
    .y((d) => y(d.quota));

  svg
    .append("path")
    .datum(arr)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("transform", "translate(50,0)")
    // @ts-ignore
    .attr("d", line);
}
const clearChart = ()=>{
  const svg = d3.select(svgRef.current)
  svg.selectAll("svg > *").remove()
}
  useEffect(() => {
    const fetch = async () => {
      const resp: { activity: { checkingDate: string; quota: number }[] } =
        await getActivity();

      const activityWithDate = [
        ...resp.activity.map((data) => {
          return {
            ...data,
            checkingDate: new Date(data.checkingDate.toString().slice(0, -10)),
          };
        }),
      ];

      setActivity(activityWithDate);
    };
    fetch();
  }, []);

  useEffect(() => {
   
    activity
      ? setFilteredActivity(
          activity?.filter(
            (el) => el.checkingDate.getDate() == new Date(day).getDate()
          )
        )
      : null;
  }, [day]);

  useEffect(() => {
    if (typeof activity !== "undefined") {
      setDay(
        `${activity[0].checkingDate.getFullYear()}-${(
          activity[0].checkingDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${activity[0].checkingDate
          .getDate()
          .toString()
          .padStart(2, "0")}`
      );
    }
    if (typeof filteredActivity !== "undefined") {
    // const svg = d3.select(svgRef.current)
  
      drawChart(filteredActivity)

    
    }
  }, [activity]);
  useEffect(()=>{
     clearChart()
     drawChart(filteredActivity)

  }, [filteredActivity])
  if (activity && day) {
    return (
      <>
        <div className="absolute text-sm bg-black/60 transition-all duration-100 flex flex-col gap-2 top-16 md:right-16 md:left-auto left-44 font-semibold">
          <div className="relative p-1 flex items-center  justify-between">
           <span className="group flex items-center justify-center w-4 h-4 rounded-full hover:bg-baseColor hover:text-link transition-all duration-200 text-sm font-semibold mx-2">?
           <span className="absolute translate-y-[2.75rem] translate-x-[3.05rem] h-0 group-hover:h-[2.25rem] top-0 overflow-hidden bg-black/60 flex items-center justify-center transition-all duration-200"><span className="p-2">UTC | GMT | EVE TIME</span></span>
           </span>
            <label className=" capitalize w-[6ch]">Day :</label>
            <input
              pattern=""
              className="bg-baseColor p-2 outline-none"
              type="date"
              onChange={(e) => {
                setDay(e.currentTarget.value);
              }}
              min={`${activity[0].checkingDate.getFullYear()}-${(
                activity[0].checkingDate.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${activity[0].checkingDate
                .getDate()
                .toString()
                .padStart(2, "0")}`}
              max={`${activity[
                activity.length - 1
              ].checkingDate.getFullYear()}-${(
                activity[0].checkingDate.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${activity[activity.length - 1].checkingDate
                .getDate()
                .toString()
                .padStart(2, "0")}`}
              defaultValue={day}
            />
          </div>
          {/* {filteredActivity.length > 0 ?filteredActivity.map(e=> <span>{e.checkingDate.toString()}</span>): <></>} */}
        </div>
        <svg ref={svgRef}></svg>
      </>
    );
  } else {
    return (
      <div className={`flex items-center justify-center flex-col w-96 h-96`}>
        <Spinerini borderSize="border-[1rem]" h="h-32" w="w-32" />
        <span className="text-xl font-bold p-4 mt-20">Loading...</span>
      </div>
    );
  }
};

export default ActivityTracker;
