"use client";

import { useRouter } from "next/navigation";
import { CircleCheckBig, CircleDashed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Puzzle from "@/components/puzzle";

export interface HomeCardProps {
  taskID: string;
  completed: boolean;
  example: number[][];
}

export default function HomeCard({
  taskID,
  completed,
  example,
}: HomeCardProps) {
  const router = useRouter();
  return (
    <Card
      className="cursor-pointer overflow-hidden w-48 hover:shadow-lg"
      onClick={() => router.push(`/tasks/${taskID}`)}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{taskID}</CardTitle>
          <Separator orientation="vertical" />
          {completed ? (
            <CircleCheckBig color="green" />
          ) : (
            <CircleDashed color="red" />
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 flex justify-center">
        <Puzzle grid={example} size={192} />
      </CardContent>
    </Card>
  );
}
