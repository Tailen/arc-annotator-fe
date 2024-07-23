"use client";

import { CircleCheckBig, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface LarcData {
  see_description: string;
  grid_description: string;
  do_description: string;
  succeeded_verification: boolean | null;
  confidence: number | null;
}

export default function HomeCard({
  see_description,
  grid_description,
  do_description,
  succeeded_verification,
  confidence,
}: LarcData) {
  return (
    <Card className="overflow-visible w-full hover:shadow-lg">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{confidence ? confidence : "None"}</CardTitle>
          {succeeded_verification ? (
            <CircleCheckBig color="green" />
          ) : (
            <Ban color="red" />
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 flex flex-col gap-2 justify-center">
        <p>{see_description}</p>
        <Separator />
        <p>{grid_description}</p>
        <Separator />
        <p>{do_description}</p>
      </CardContent>
    </Card>
  );
}
