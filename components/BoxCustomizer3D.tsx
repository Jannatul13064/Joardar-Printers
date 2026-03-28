"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

/* -----------------------------
   TEXTURE WITH TEXT COLOR
----------------------------- */
function useTextTexture(text: string, boxColor: string, textColor: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Background (box color)
      ctx.fillStyle = boxColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Main Text
      ctx.fillStyle = textColor;
      ctx.font = "bold 120px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      // Subtitle
      ctx.font = "40px Arial";
      ctx.fillText(
        "Premium Packaging",
        canvas.width / 2,
        canvas.height / 2 + 120,
      );
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  }, [text, boxColor, textColor]);
}

/* -----------------------------
   BOX
----------------------------- */
function Box({
  width,
  height,
  depth,
  boxColor,
  text,
  textColor,
}: {
  width: number;
  height: number;
  depth: number;
  boxColor: string;
  text: string;
  textColor: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const texture = useTextTexture(text, boxColor, textColor);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[width, height, depth]} />

      <meshStandardMaterial map={texture} roughness={0.35} metalness={0.2} />
    </mesh>
  );
}

/* -----------------------------
   MAIN
----------------------------- */
export default function BoxCustomizer3D() {
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(2);
  const [depth, setDepth] = useState(2);

  const [boxColor, setBoxColor] = useState("#6366f1");
  const [text, setText] = useState("Custom Box");
  const [textColor, setTextColor] = useState("#ffffff");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-5xl font-semibold mb-6 text-center">
        Box Customization
      </h1>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* CONTROLS */}
        <div className="space-y-6">
          {/* TEXT INPUT */}
          <div>
            <label className="text-sm text-white/50">Box Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-white/10 rounded-lg outline-none"
            />
          </div>

          {/* TEXT COLOR */}
          <div>
            <p className="text-sm text-white/50 mb-3">Text Color</p>

            <div className="flex gap-3 flex-wrap">
              {["#ffffff", "#000000", "#ff0000", "#00ffcc", "#facc15"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setTextColor(c)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      textColor === c ? "border-white" : "border-transparent"
                    }`}
                    style={{ background: c }}
                  />
                ),
              )}
            </div>
          </div>

          {/* BOX COLOR */}
          <div>
            <p className="text-sm text-white/50 mb-3">Box Color</p>

            <div className="flex gap-3 flex-wrap">
              {["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#111111"].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setBoxColor(c)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      boxColor === c ? "border-white" : "border-transparent"
                    }`}
                    style={{ background: c }}
                  />
                ),
              )}
            </div>
          </div>

          {/* SIZE CONTROLS */}
          <div>
            <label>Width: {width.toFixed(1)}</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>Height: {height.toFixed(1)}</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label>Depth: {depth.toFixed(1)}</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={depth}
              onChange={(e) => setDepth(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* 3D VIEW */}
        <div className="h-[400px] md:h-[550px] rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
          <Canvas>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 3, 3]} intensity={1.2} />
            <directionalLight position={[-3, -3, -3]} intensity={0.5} />

            <Box
              width={width}
              height={height}
              depth={depth}
              boxColor={boxColor}
              text={text}
              textColor={textColor}
            />

            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
