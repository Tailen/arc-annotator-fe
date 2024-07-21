"use client";

import Image from "next/image";
import { CircleCheckBig, CircleDashed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import placeholder from "@/components/600x400.jpg";

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
  return (
    <Card className="overflow-hidden">
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
      <CardContent className="p-0">
        <Image
          alt="puzzle image"
          className="aspect-square object-cover"
          width={200}
          height={200}
          src={placeholder}
        />
      </CardContent>
    </Card>
  );
}
