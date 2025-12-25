import { useEffect, useRef } from 'react';

export const CyberGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Grid configuration
    const gridSize = 60;
    
    // Data streams
    const streams: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];
    for (let i = 0; i < 15; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        length: 100 + Math.random() * 200,
        opacity: 0.1 + Math.random() * 0.2
      });
    }

    // Horizontal scan lines
    const scanLines: { y: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 3; i++) {
      scanLines.push({
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.05 + Math.random() * 0.1
      });
    }

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'hsla(0, 0%, 100%, 0.03)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw grid intersections with pulse
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const pulse = Math.sin(time * 0.02 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
          const distance = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + 
            Math.pow(y - canvas.height / 2, 2)
          );
          const centerFade = Math.max(0, 1 - distance / (canvas.width * 0.6));
          
          ctx.fillStyle = `hsla(0, 0%, 100%, ${0.02 + pulse * 0.08 * centerFade})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw vertical data streams
      streams.forEach(stream => {
        const gradient = ctx.createLinearGradient(stream.x, stream.y - stream.length, stream.x, stream.y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, `hsla(0, 0%, 100%, ${stream.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(stream.x, stream.y - stream.length);
        ctx.lineTo(stream.x, stream.y);
        ctx.stroke();

        stream.y += stream.speed;
        if (stream.y - stream.length > canvas.height) {
          stream.y = -stream.length;
          stream.x = Math.random() * canvas.width;
        }
      });

      // Draw horizontal scan lines
      scanLines.forEach(line => {
        const gradient = ctx.createLinearGradient(0, line.y, canvas.width, line.y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.2, `hsla(0, 0%, 100%, ${line.opacity})`);
        gradient.addColorStop(0.8, `hsla(0, 0%, 100%, ${line.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, line.y, canvas.width, 1);

        line.y += line.speed;
        if (line.y > canvas.height) {
          line.y = 0;
        }
      });

      // Center glow
      const centerGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.5
      );
      centerGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0.03)');
      centerGradient.addColorStop(0.5, 'hsla(0, 0%, 100%, 0.01)');
      centerGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};
