"use client";

import { useState, useEffect } from "react";
import type { HomeCardProps } from "@/components/homeCard";
import HomeCard from "@/components/homeCard";
import PageBar from "@/components/pagebar";

export default function Gallery({ params }: { params: { pageID: string } }) {
  const [pageData, setPageData] = useState<HomeCardProps[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/data?page=${params.pageID}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        const jsonPageData = data.map((cardData: any) => ({
          taskID: cardData.name,
          completed: cardData.annotation,
          example: cardData.task_json.input,
        }));
        setPageData(jsonPageData);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 gap-x-auto gap-y-4 z-10 w-full max-w-7xl">
        {pageData.map((cardData) => (
          <HomeCard
            key={cardData.taskID}
            taskID={cardData.taskID}
            completed={cardData.completed}
            example={cardData.example}
          />
        ))}
      </div>
      <PageBar />
    </main>
  );
}
