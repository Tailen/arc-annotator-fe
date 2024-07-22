import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Puzzle({
  grid,
  size,
}: {
  grid: number[][];
  size: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState("");
  const aspectRatio = grid[0].length / grid.length;
  const colorMap: { [key: number]: any } = {
    0: "#000000",
    1: "#0074D9",
    2: "#FF4136",
    3: "#2ECC40",
    4: "#FFDC00",
    5: "#AAAAAA",
    6: "#F012BE",
    7: "#FF851B",
    8: "#7FDBFF",
    9: "#870C25",
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const cellSize = 50;
    const rows = grid.length;
    const cols = grid[0].length;
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    // Draw the grid on the canvas
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        context.fillStyle = colorMap[grid[row][col]];
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        context.strokeStyle = "#555555";
        context.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
    // Convert canvas to image
    const imageDataUrl = canvas.toDataURL("image/png");
    setImageSrc(imageDataUrl);
  }, [grid]);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {imageSrc && (
        <Image
          alt="Picture of puzzle grid"
          src={imageSrc}
          width={aspectRatio >= 1 ? size : size * aspectRatio}
          height={aspectRatio >= 1 ? size / aspectRatio : size}
        />
      )}
    </div>
  );
}
