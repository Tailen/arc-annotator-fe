"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Puzzle from "@/components/puzzle";

export default function Task({ params }: { params: { taskID: string } }) {
  const [taskData, setTaskData] = useState<any>();
  const router = useRouter();

  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/data?page=${params.taskID}&limit=20`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const jsonPageData = data.map((cardData: any) => ({
  //         taskID: cardData.name,
  //         completed: cardData.annotation,
  //         example: cardData.task_json.input,
  //       }));
  //       setTaskData(jsonPageData);
  //     });
  // }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>{`Task: ${params.taskID}`}</h1>
    </main>
  );
}
