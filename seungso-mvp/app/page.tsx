"use client";

import Button from "@/components/ui/Button";
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  const [rippleKey, setRippleKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // -----------------------
  // Ripple 업데이트
  // -----------------------
  useEffect(() => {
    const interval = setInterval(() => setRippleKey((prev) => prev + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  // -----------------------
  // 랜덤 물감 캔버스
  // -----------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = [
      "#1E3A8A",
      "#3B82F6",
      "#60A5FA",
      "#fffb00",
      "#93C5FD",
      "#E0F2FE",
    ];

    type Particle = {
      x: number;
      y: number;
      radius: number;
      color: string;
      life: number;
      maxLife: number;
      scale: number;
      alpha: number;
      blur: number;
    };

    const particles: Particle[] = [];

    const createParticle = (initialVisible = false): Particle => {
      const scale = 0.5 + Math.random() * 0.3;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 150 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 10 + Math.random() * 10,
        scale: initialVisible ? 1 : scale,
        alpha: initialVisible ? 1 : 0,
        blur: 0,
      };
    };

    for (let i = 0; i < 15; i++) particles.push(createParticle(true));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.life += 0.016;
        const lifeRatio = p.life / p.maxLife;

        // 생존 종료 후 랜덤 재생성
        if (lifeRatio >= 1) {
          if (Math.random() < 0.3) particles[index] = createParticle();
          return;
        }

        // --------------------
        // 부드러운 scale, alpha, blur
        // --------------------
        const targetScale = lifeRatio < 0.2 ? 1 : lifeRatio > 0.8 ? 1.2 : 1;
        p.scale += (targetScale - p.scale) * 0.05;

        const targetAlpha = lifeRatio < 0.8 ? 1 : 0;
        p.alpha += (targetAlpha - p.alpha) * 0.05;

        const targetBlur = lifeRatio > 0.8 ? (lifeRatio - 0.8) * 2 : 0;
        p.blur += (targetBlur - p.blur) * 0.05;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * p.scale,
        );
        gradient.addColorStop(0, p.color + "50");
        gradient.addColorStop(1, p.color + "07");

        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.alpha;
        ctx.filter = `blur(${p.blur}px)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.filter = "none";
      });
    };

    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // -----------------------
  // Wave text & Ripple
  // -----------------------
  const WAVE_DURATION = 1.2;
  const TOTAL_CYCLE_TIME = 10;
  const START_AFTER_ALL = 6.5;
  const HIGHLIGHT_COLOR = "#0284c7";

  const containerVariants: Variants = {
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const itemLeft: Variants = {
    hidden: { opacity: 0, x: -50 }, // 시작 위치: 왼쪽 밖
    visible: {
      opacity: 1,
      x: 0, // 최종 위치
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  const itemRight: Variants = {
    hidden: { opacity: 0, x: 100 }, // 시작 위치: 오른쪽 밖
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const itemUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 1.5 } },
  };

  const renderWaveText = (
    text: string,
    highlight: string,
    waveSequenceDelay: number,
  ) => {
    const startIndex = text.indexOf(highlight);
    const endIndex = startIndex + highlight.length;

    return text.split("").map((char, index) => {
      const isHighlightedZone = index >= startIndex && index < endIndex;
      const waveAnim: TargetAndTransition = {
        y: [0, -10, 0],
        transition: {
          duration: WAVE_DURATION,
          repeat: Infinity,
          repeatDelay: TOTAL_CYCLE_TIME - WAVE_DURATION,
          delay: START_AFTER_ALL + waveSequenceDelay + index * 0.1,
          ease: "easeInOut",
        },
      };
      return (
        <motion.span
          key={index}
          animate={isHighlightedZone ? waveAnim : {}}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            color: isHighlightedZone ? HIGHLIGHT_COLOR : "inherit",
            fontWeight: isHighlightedZone ? "700" : "inherit",
            fontSize: isHighlightedZone ? "2.5rem" : "inherit",
            textShadow: isHighlightedZone
              ? "0px 0px 4px rgba(255,255,255,0.7)"
              : "none",
          }}
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <section className={styles.hero}>
      {/* 랜덤 물감 캔버스 */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          filter: "saturate(1.5) brightness(0.8)",
        }}
      />

      {/* Ripple */}
      <div className={styles.canvasContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={rippleKey}
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 4, opacity: [0, 0.5, 0] }}
            transition={{ duration: 4, ease: "easeOut" }}
            className={styles.ripple}
            style={{
              left: "50%",
              top: "70vh",
              position: "absolute",
              zIndex: 1,
            }}
          />
        </AnimatePresence>
      </div>

      {/* 텍스트 */}
      <motion.div
        className={styles.introSection}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ position: "relative", zIndex: 2 }}
      >
        <motion.p className={styles.introText} variants={itemLeft}>
          {renderWaveText(
            "승소판결문이 더 이상 종이조각이 되지 않도록",
            "승소판결문",
            0,
          )}
        </motion.p>

        <motion.p className={styles.introText} variants={itemRight}>
          {renderWaveText(
            "법적 권리를 실질적 삶의 권리로 연결합니다.",
            "실질적 삶의 권리",
            2.2,
          )}
        </motion.p>

        <motion.div variants={itemUp}>
          <Button className={styles.mainBtn}>서비스 둘러보기</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
