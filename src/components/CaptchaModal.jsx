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

  // Rysowanie labiryntu — tutaj przykład prosty.
  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');

    // Tło białe (dozwolone pole)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Ściany (kolor czarny)
    ctx.fillStyle = 'black';

    // Przykładowy układ ścian
    ctx.fillRect(0, 0, width, 20); // górna
    ctx.fillRect(0, height - 20, width, 20); // dolna
    ctx.fillRect(0, 0, 20, height); // lewa
    ctx.fillRect(width - 20, 0, 20, height); // prawa

    // wewnętrzne przeszkody
    ctx.fillRect(80, 0, 20, 200);
    ctx.fillRect(150, 100, 20, 200);
    ctx.fillRect(230, 0, 20, 200);
    ctx.fillRect(310, 100, 20, 200);

    // START/ZIELONY
    ctx.fillStyle = '#00b300';
    ctx.fillRect(25, 25, 50, 50);

    // META/CZERWONY
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(width - 75, height - 75, 50, 50);
  }, [width, height]);

  function getPixel(x, y) {
    const ctx = canvasRef.current.getContext('2d');
    return ctx.getImageData(x, y, 1, 1).data; // [r,g,b,a]
  }

  function isWall([r, g, b]) {
    // w tym przykładzie ściany = czarny
    return r < 50 && g < 50 && b < 50;
  }

  function isGoal([r, g, b]) {
    // meta = czerwona
    return r > 200 && g < 80 && b < 80;
  }

  function isStart([r, g, b]) {
    // start = zielony
    return r < 80 && g > 150 && b < 80;
  }

  function handleMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    const pixel = getPixel(x, y);

    if (!started) {
      if (isStart(pixel)) {
        setStarted(true);
        setFailMsg('');
      }
      return;
    }

    if (isWall(pixel)) {
      setStarted(false);
      setFailMsg('Dotknąłeś ściany — restart!');
      onFail();
      return;
    }

    if (isGoal(pixel)) {
      setStarted(false);
      setFailMsg('Gratulacje! Przeszedłeś labirynt.');
      onSuccess();
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!customCursorCoords) return;
    const id = setInterval(() => {
      handleMove({
        clientX: customCursorCoords.x,
        clientY: customCursorCoords.y,
      });
    }, 16); // ~60fps
    return () => clearInterval(id);
  }, [customCursorCoords]);

  return (
    // Tło nakładki
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Okno modala */}
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-4 font-bold text-2xl text-gray-800">
          Udowodnij, że nie jesteś robotem
        </h2>
        <div className="flex flex-col items-center gap-3 p-3">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="cursor-none touch-none rounded-md border shadow-md"
          />
          {failMsg && <div className="text-red-600 text-sm">{failMsg}</div>}
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
