import Image from "next/image";
import HomeCard from "@/components/homeCard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <HomeCard
          taskID="9a1f48c"
          completed={true}
          example={[
            [0, 0],
            [0, 0],
          ]}
        />
      </div>
    </main>
  );
}
