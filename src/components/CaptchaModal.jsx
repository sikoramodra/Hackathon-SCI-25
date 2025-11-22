/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useRef, useState } from 'react';

const CaptchaModal = ({
  width = 500,
  height = 300,
  onSuccess = () => {},
  onFail = () => {},
  customCursorCoords,
}) => {
  const canvasRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [failMsg, setFailMsg] = useState('');

  // ------------------------------
  // DRAWING (DPI SAFE)
  // ------------------------------
  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d', { willReadFrequently: true });

    const dpr = window.devicePixelRatio || 1;

    // Increase resolution but keep visual size identical
    cv.width = width * dpr;
    cv.height = height * dpr;

    cv.style.width = width + 'px';
    cv.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // ---- Maze Drawing ----
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Walls
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, 20);
    ctx.fillRect(0, height - 20, width, 20);
    ctx.fillRect(0, 0, 20, height);
    ctx.fillRect(width - 20, 0, 20, height);

    ctx.fillRect(80, 0, 20, 200);
    ctx.fillRect(150, 100, 20, 200);
    ctx.fillRect(230, 0, 20, 200);
    ctx.fillRect(310, 100, 20, 200);

    // Start (green)
    ctx.fillStyle = '#00cc33';
    ctx.fillRect(25, 25, 50, 50);

    // Goal (red)
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(width - 75, height - 75, 50, 50);
  }, [width, height]);

  // ------------------------------
  // SAFE PIXEL READ WITH TOLERANCE
  // ------------------------------

  const COLOR = {
    WALL: { r: 0, g: 0, b: 0 },
    START: { r: 0, g: 170, b: 0 },
    GOAL: { r: 255, g: 30, b: 30 },
  };

  const TOL = 80; // tolerance for imperfect displays

  function nearColor(pixel, target) {
    const [r, g, b] = pixel;
    return (
      Math.abs(r - target.r) < TOL &&
      Math.abs(g - target.g) < TOL &&
      Math.abs(b - target.b) < TOL
    );
  }

  function getPixel(x, y) {
    const ctx = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    });
    const dpr = window.devicePixelRatio || 1;

    // Convert mouse coords -> internal canvas coords
    const rx = Math.round(x * dpr);
    const ry = Math.round(y * dpr);

    return ctx.getImageData(rx, ry, 1, 1).data;
  }

  // ------------------------------
  // MOUSE / CURSOR DETECTION
  // ------------------------------
  function handleMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x >= width || y >= height) return;

    const pixel = getPixel(x, y);

    if (!started) {
      if (nearColor(pixel, COLOR.START)) {
        setStarted(true);
        setFailMsg('');
      }
      return;
    }

    if (nearColor(pixel, COLOR.WALL)) {
      setStarted(false);
      setFailMsg('Dotknąłeś ściany — restart!');
      onFail();
    }

    if (nearColor(pixel, COLOR.GOAL)) {
      setStarted(false);
      setFailMsg('Gratulacje! Przeszedłeś labirynt.');
      onSuccess();
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: useEffect
  useEffect(() => {
    if (!customCursorCoords) return;
    const id = setInterval(() => {
      handleMove({
        clientX: customCursorCoords.x,
        clientY: customCursorCoords.y,
      });
    }, 8);
    return () => clearInterval(id);
  }, [customCursorCoords]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative h-3/4 w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-4 font-bold text-2xl text-gray-800">
          Udowodnij, że nie jesteś robotem
        </h2>

        <div className="flex flex-col items-center justify-around gap-7 p-3">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="block cursor-none rounded-md border shadow-md"
          />

          {failMsg && <div className="text-lg text-red-600">{failMsg}</div>}

          {!(started || failMsg) && (
            <div className="text-gray-700 text-sm">
              Najedź na zielony START, aby rozpocząć.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptchaModal;
