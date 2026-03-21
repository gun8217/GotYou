"use client";

import { Button } from "@/components/common/LayoutElements";
import "animate.css";
import { useEffect, useRef } from "react";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawOnce();
    };

    const colors = ["#191cdb", "#097697", "#25ad2e", "#e8ec66"];

    type Blob = {
      x: number;
      y: number;
      radius: number;
      color: string;
    };

    const blobs: Blob[] = [];

    const createBlob = (): Blob => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 300 + 250,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    for (let i = 0; i < 4; i++) blobs.push(createBlob());

    const drawOnce = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((b) => {
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.radius,
        );
        gradient.addColorStop(0, b.color + "40");
        gradient.addColorStop(1, b.color + "05");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section className={styles.hero}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          filter: "saturate(5) brightness(2)",
        }}
      />

      {/* Ripple */}
      <div className={styles.ripple}></div>

      <div className={styles.introSection}>
        <p
          className={`${styles.introText} animate__animated animate__fadeInLeft`}
        >
          <strong>승소판결문</strong>이 더 이상 종이조각이 되지 않도록
        </p>

        <p
          className={`${styles.introText} animate__animated animate__fadeInRight`}
        >
          법적 권리를 <strong>실질적 삶의 권리</strong>로 연결합니다.
        </p>

        <div className={`animate__animated animate__fadeInUp`}>
          <Button className={styles.mainBtn}>서비스 둘러보기</Button>
        </div>
      </div>
    </section>
  );
}
