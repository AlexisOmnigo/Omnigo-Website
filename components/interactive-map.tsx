"use client"

import { useEffect, useRef, useState } from "react"

// Zones de texte pour la détection d'intersection
const textZones = [
  { x: 0, y: 0, width: 0, height: 0, text: "Votre itinéraire digital vers la réussite" },
  { x: 0, y: 0, width: 0, height: 0, text: "Omnigo : Votre copilote stratégique" },
]

export default function InteractiveMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isRecalculating, setIsRecalculating] = useState(false)
  const [recalculationText, setRecalculationText] = useState("")
  const animationFrameRef = useRef<number>(0)
  const codeParticlesRef = useRef<
    Array<{ x: number; y: number; speed: number; char: string; opacity: number; size: number; color: string }>
  >([])
  const pathRef = useRef<{ points: Array<{ x: number; y: number }>; progress: number }>({ points: [], progress: 0 })
  const startPointRef = useRef({ x: 0, y: 0 })
  const textMeasureRef = useRef<HTMLDivElement>(null)

  // Initialize everything after component mounts (client-side only)
  useEffect(() => {
    if (isInitialized) return;
    
    // Initialize particles
    initializeCodeParticles();
    
    // Initialize path
    initializePath();
    
    // Measure text zones
    measureTextZones();
    
    // Set up resize handler
    window.addEventListener("resize", measureTextZones);
    
    // Set up mouse move handler
    window.addEventListener("mousemove", handleMouseMove);
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    setIsInitialized(true);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", measureTextZones);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInitialized]);

  // Initialize code particles
  const initializeCodeParticles = () => {
    if (typeof window === 'undefined') return;
    
    const codeChars = "01010101 function recalculateRoute() { optimize(data); } 10101010";
    const particles = [];
    const colors = ["#0078D4", "#2BB673", "#FF6B00", "#17a2b8"]; // blue, green, orange, teal

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.2 + Math.random() * 0.5,
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        opacity: 0.1 + Math.random() * 0.3,
        size: 8 + Math.floor(Math.random() * 6),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    codeParticlesRef.current = particles;
    startPointRef.current = { x: window.innerWidth * 0.2, y: window.innerHeight * 0.5 };
  };

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    // Trigger recalculation occasionally
    if (Math.random() > 0.97) {
      triggerRecalculation();
    }
  };

  // Measure text zones for intersection detection
  const measureTextZones = () => {
    if (typeof window === 'undefined') return;
    
    // Approximate text zones based on screen size
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Main title
    textZones[0] = {
      x: centerX - 300,
      y: centerY - 50,
      width: 600,
      height: 60,
      text: "Votre itinéraire digital vers la réussite",
    };

    // Subtitle
    textZones[1] = {
      x: centerX - 250,
      y: centerY + 30,
      width: 500,
      height: 40,
      text: "Omnigo : Votre copilote stratégique",
    };
  };

  // Initialize path
  const initializePath = () => {
    if (typeof window === 'undefined') return;
    
    const points = [];
    const startPoint = { ...startPointRef.current };
    points.push({ ...startPoint });

    // Add intermediate points with an elegant curve
    for (let i = 0; i < 8; i++) {
      points.push({
        x: startPoint.x + (window.innerWidth * 0.6 * (i + 1)) / 9 + Math.sin(i * 0.8) * 100,
        y: startPoint.y + Math.cos(i * 0.8) * 150,
      });
    }

    pathRef.current = {
      points,
      progress: 0,
    };
  };

  // Function to trigger recalculation
  const triggerRecalculation = () => {
    if (!isRecalculating) {
      setIsRecalculating(true);

      const recalculationTexts = [
        "Recalcul en cours...",
        "Optimisation du trajet...",
        "Analyse des données...",
        "Adaptation de la stratégie...",
      ];

      setRecalculationText(recalculationTexts[Math.floor(Math.random() * recalculationTexts.length)]);

      // Modify the path
      const path = pathRef.current;
      // Keep first and last point, but modify intermediate points
      const firstPoint = path.points[0];
      const lastPoint = path.points[path.points.length - 1];

      const newPoints = [firstPoint];

      const now = Date.now();
      for (let i = 1; i < path.points.length - 1; i++) {
        newPoints.push({
          x:
            firstPoint.x +
            (lastPoint.x - firstPoint.x) * (i / (path.points.length - 1)) +
            Math.sin(i * 0.8 + now * 0.001) * 120,
          y: firstPoint.y + Math.cos(i * 0.8 + now * 0.001) * 170,
        });
      }

      newPoints.push(lastPoint);
      path.points = newPoints;
      path.progress = 0;

      // Reset after a delay
      setTimeout(() => {
        setIsRecalculating(false);
      }, 2000);
    }
  };

  // Check if a point is in a text zone
  const isPointInTextZone = (x: number, y: number) => {
    for (const zone of textZones) {
      if (x >= zone.x && x <= zone.x + zone.width && y >= zone.y && y <= zone.y + zone.height) {
        return true;
      }
    }
    return false;
  };

  // Main animation function
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    // Adjust canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear canvas with transparent background (to show white page background)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw subtle grid effect
    ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
    ctx.lineWidth = 0.5;

    // Horizontal grid
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Vertical grid
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Draw code particles in background
    codeParticlesRef.current.forEach((particle) => {
      ctx.font = `${particle.size}px monospace`;
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fillText(particle.char, particle.x, particle.y);

      // Move particle
      particle.y += particle.speed;

      // Reset if it goes off screen
      if (particle.y > canvas.height) {
        particle.y = 0;
        particle.x = Math.random() * canvas.width;
      }
    });

    // Update end point based on mouse position
    const endPoint = {
      x: mousePosition.x || window.innerWidth * 0.8,
      y: mousePosition.y || window.innerHeight * 0.5,
    };

    // Update the last point of the path to follow the mouse
    const path = pathRef.current;
    if (path.points.length > 0) {
      path.points[path.points.length - 1] = { ...endPoint };
    }

    // Draw the path
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Calculate total path length
    let totalLength = 0;
    for (let i = 1; i < path.points.length; i++) {
      const dx = path.points[i].x - path.points[i - 1].x;
      const dy = path.points[i].y - path.points[i - 1].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }

    // Draw the path up to current progress point
    let currentLength = 0;
    const progressLength = totalLength * path.progress;

    if (path.progress > 0) {
      ctx.beginPath();
      ctx.moveTo(path.points[0].x, path.points[0].y);

      for (let i = 1; i < path.points.length; i++) {
        const prevPoint = path.points[i - 1];
        const currentPoint = path.points[i];

        const dx = currentPoint.x - prevPoint.x;
        const dy = currentPoint.y - prevPoint.y;
        const segmentLength = Math.sqrt(dx * dx + dy * dy);

        if (currentLength + segmentLength <= progressLength) {
          // Draw complete segment
          // Check if point is in text zone to invert color
          const steps = Math.max(10, Math.floor(segmentLength / 5));
          for (let j = 1; j <= steps; j++) {
            const ratio = j / steps;
            const x = prevPoint.x + dx * ratio;
            const y = prevPoint.y + dy * ratio;

            // Check if this point is in a text zone
            const inTextZone = isPointInTextZone(x, y);

            // Set color based on intersection
            if (inTextZone) {
              ctx.strokeStyle = "#0078D4"; // Blue in text zones
            } else {
              ctx.strokeStyle = isRecalculating ? "#FF6B00" : "#0078D4"; // Orange when recalculating, blue otherwise
            }

            if (j === 1) {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
            }

            ctx.lineTo(x, y);
            ctx.stroke();

            if (j < steps) {
              ctx.beginPath();
              ctx.moveTo(x, y);
            }
          }

          currentLength += segmentLength;
        } else {
          // Draw partial segment
          const remainingLength = progressLength - currentLength;
          const ratio = remainingLength / segmentLength;

          const partialX = prevPoint.x + dx * ratio;
          const partialY = prevPoint.y + dy * ratio;

          // Check if segment crosses a text zone
          const steps = Math.max(10, Math.floor(remainingLength / 5));
          for (let j = 1; j <= steps; j++) {
            const stepRatio = j / steps;
            const x = prevPoint.x + dx * ratio * stepRatio;
            const y = prevPoint.y + dy * ratio * stepRatio;

            // Check if this point is in a text zone
            const inTextZone = isPointInTextZone(x, y);

            // Set color based on intersection
            if (inTextZone) {
              ctx.strokeStyle = "#0078D4"; // Blue in text zones
            } else {
              ctx.strokeStyle = isRecalculating ? "#FF6B00" : "#0078D4"; // Orange when recalculating, blue otherwise
            }

            if (j === 1) {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
            }

            ctx.lineTo(x, y);
            ctx.stroke();

            if (j < steps) {
              ctx.beginPath();
              ctx.moveTo(x, y);
            }
          }

          break;
        }
      }
    }

    // Increase progress
    path.progress += 0.005;
    if (path.progress > 1) path.progress = 1;

    // Add glow effect around points
    const drawGlowingPoint = (x: number, y: number, color: string, radius: number) => {
      // Outer glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.beginPath();
      ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Center point
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    // Draw starting point (A) with glow effect
    drawGlowingPoint(startPointRef.current.x, startPointRef.current.y, "#0078D4", 8);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("A", startPointRef.current.x - 5, startPointRef.current.y + 5);

    // Draw end point (B) with glow effect
    drawGlowingPoint(endPoint.x, endPoint.y, "#FF6B00", 8);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("B", endPoint.x - 5, endPoint.y + 5);

    // Show recalculation text with elegant effect
    if (isRecalculating) {
      // Create semi-transparent background
      ctx.fillStyle = "#0078D4";
      const textWidth = ctx.measureText(recalculationText).width;
      const rectX = canvas.width / 2 - textWidth / 2 - 20;
      const rectY = canvas.height / 2 - 15;
      const rectWidth = textWidth + 40;
      const rectHeight = 40;

      // Rounded rectangle
      ctx.beginPath();
      ctx.roundRect(rectX, rectY, rectWidth, rectHeight, 10);
      ctx.fill();

      // Glowing border
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(recalculationText, canvas.width / 2, canvas.height / 2);
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div ref={textMeasureRef} className="hidden"></div>
    </>
  );
}

