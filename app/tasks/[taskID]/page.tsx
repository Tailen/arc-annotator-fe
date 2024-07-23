"use client";

import type { LarcData } from "@/components/larcCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Puzzle from "@/components/puzzle";
import LarcCard from "@/components/larcCard";

interface GridPair {
  input: number[][];
  output: number[][];
}

interface TaskData {
  taskID: string;
  arcData: {
    arcGrids: GridPair[];
    reArcGrids: GridPair[];
    larcData: LarcData[];
  };
  isTrain: boolean;
  annotation: string | null;
}

async function submitAnnotation(taskID: string, description: string) {
  fetch("http://127.0.0.1:8000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task_name: taskID,
      annotation: description,
    }),
  });
}

export default function Task({ params }: { params: { taskID: string } }) {
  const [taskData, setTaskData] = useState<TaskData>();
  const router = useRouter();
  var annoInput = "";
  var annoOutput = "";
  var annoBuild = "";

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/data/${params.taskID}`)
      .then((res) => res.json())
      .then((data) => {
        // Sort LarcData to put verified data first
        const sortedLarcData = data.task_json.larc_json.sort(
          (a: LarcData, b: LarcData) => {
            if (a.succeeded_verification === b.succeeded_verification) {
              return 0;
            }
            return a.succeeded_verification ? -1 : 1;
          }
        );
        const jsonTaskData = {
          taskID: data.name,
          arcData: {
            arcGrids: data.task_json.arc_json,
            reArcGrids: data.task_json.re_arc_json.slice(0, 5),
            larcData: sortedLarcData,
          },
          isTrain: data.is_train,
          annotation: data.annotation,
        };
        setTaskData(jsonTaskData);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-xl font-bold">{`Task ${params.taskID}`}</h1>
      <h2 className="text-lg mt-4">ARC</h2>
      <div className="flex items-center justify-between gap-4 m-4">
        {taskData?.arcData.arcGrids.map((gridPair) => (
          <div className="flex flex-col gap-4">
            <Puzzle grid={gridPair.input} size={192} />
            <Puzzle grid={gridPair.output} size={192} />
          </div>
        ))}
      </div>
      <h2 className="text-lg mt-4">Re-ARC</h2>
      <div className="flex items-center justify-between gap-4 m-4">
        {taskData?.arcData.reArcGrids.map((gridPair) => (
          <div className="flex flex-col gap-4">
            <Puzzle grid={gridPair.input} size={192} />
            <Puzzle grid={gridPair.output} size={192} />
          </div>
        ))}
      </div>
      <h2 className="text-lg mt-4">LARC Description</h2>
      <div className="grid grid-cols-2 gap-8 justify-center max-w-7xl m-4">
        <div className="flex flex-col gap-4 items-end w-full">
          {taskData?.arcData.larcData.map((larcData) => (
            <LarcCard {...larcData} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          {taskData?.annotation && (
            <h1 className="text-lg mx-3">{taskData!.annotation}</h1>
          )}
          <Textarea
            className="min-h-24"
            placeholder="The input..."
            onChange={(event) => {
              annoInput = event.target.value;
            }}
          />
          <Textarea
            className="min-h-12"
            placeholder="The output..."
            onChange={(event) => {
              annoOutput = event.target.value;
            }}
          />
          <Textarea
            className="min-h-36"
            placeholder="To make the output..."
            onChange={(event) => {
              annoBuild = event.target.value;
            }}
          />
          <Button
            className="my-4"
            onClick={() => {
              const annotation = `The input ${annoInput}\nThe output ${annoOutput}\nTo make the output, ${annoBuild}`;
              submitAnnotation(taskData!.taskID, annotation);
              router.back();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
