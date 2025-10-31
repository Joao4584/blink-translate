import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseDown = (e: MouseEvent) => {
      setStartPos({ x: e.clientX, y: e.clientY });
      setIsDrawing(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(startPos.x, startPos.y, e.clientX - startPos.x, e.clientY - startPos.y);
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDrawing(false);
      const rect = {
        x: Math.min(startPos.x, e.clientX),
        y: Math.min(startPos.y, e.clientY),
        width: Math.abs(e.clientX - startPos.x),
        height: Math.abs(e.clientY - startPos.y),
      };
      
      if (rect.width > 0 && rect.height > 0) {
        window.Main.sendMessage('region-selected', rect);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, startPos]);

  return <canvas ref={canvasRef} style={{ cursor: 'crosshair' }} />;
};

const container = document.getElementById('root');
ReactDOM.render(<App />, container);
