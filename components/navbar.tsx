"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function NavBar() {
  const { setTheme } = useTheme();
  const [trainDone, setTrainDone] = React.useState(0);
  const [valDone, setValDone] = React.useState(0);

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/completed")
      .then((res) => res.json())
      .then((data) => {
        setTrainDone(data.train);
        setValDone(data.eval);
      });
  }, []);

  return (
    <nav className="fixed w-full z-50 border flex items-center justify-between p-4 px-8 backdrop-blur bg-transparent">
      <Link href="/" className="text-2xl font-bold">
        ARC Annotator
      </Link>
      <div className="flex space-x-8">
        <div>
          <Progress
            className="w-72"
            value={trainDone / 4}
            max={100}
            color="bg-green-500"
          />
          <h1 className="ml-2">Train: {trainDone} / 400</h1>
        </div>
        <div>
          <Progress
            className="w-72"
            value={valDone / 4}
            max={100}
            color="bg-blue-500"
          />
          <h1 className="ml-2">Eval: {valDone} / 400</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
