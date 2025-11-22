import { useEffect, useRef, useState } from 'react';
import cursorImage from '../assets/cursor.png';

const Level1 = ({ complete }) => {
  // Stan dla dynamicznego blura i diplopii
  const [blurValue, setBlurValue] = useState(0);
  const [diplopiaOffset, setDiplopiaOffset] = useState(0);

  // Pytania
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isInputValid1, setIsInputValid1] = useState(false);
  const [isInputValid2, setIsInputValid2] = useState(false);

  // Refy do obsługi opóźnionego kursora
  const customCursorRef = useRef(null);
  const realMousePos = useRef({ x: 0, y: 0 });
  const delayedMousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  // Efekt do aktualizacji blura i diplopii w czasie
  useEffect(() => {
    const effectInterval = setInterval(() => {
      const newBlur = Math.random() * 6;
      const newDiplopia = (Math.random() - 0.5) * 30;

      setBlurValue(newBlur);
      setDiplopiaOffset(newDiplopia);
    }, 1000);

    return () => clearInterval(effectInterval);
  }, []);

  useEffect(() => {
    setIsInputValid1(
      ['watroba', 'wątroba'].includes(inputValue1.toLowerCase()),
    );
    setIsInputValid2(inputValue2.toLowerCase() === 'etanol');
  }, [inputValue1, inputValue2]);

  // Efekt do obsługi animacji i śledzenia kursora
  useEffect(() => {
    const handleMouseMove = (event) => {
      realMousePos.current = { x: event.clientX, y: event.clientY };
    };

    const animateCursor = () => {
      const { x: targetX, y: targetY } = realMousePos.current;
      const { x: currentX, y: currentY } = delayedMousePos.current;

      const easingFactor = 0.1;
      const newX = currentX + (targetX - currentX) * easingFactor;
      const newY = currentY + (targetY - currentY) * easingFactor;

      if (realMousePos.current.y < 78) {
        customCursorRef.current.style.opacity = 0;
      } else {
        customCursorRef.current.style.opacity = 1;
      }

      delayedMousePos.current = { x: newX, y: newY };

      if (customCursorRef.current) {
        customCursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Style dynamiczne, które MUSZĄ pozostać jako inline style,
  // ponieważ ich wartości zmieniają się w czasie rzeczywistym.
  // Tailwind nie jest w stanie obsłużyć takich dynamicznych wartości bez kompilacji JIT.
  const dynamicContentStyle = {
    filter: `blur(${blurValue}px)`,
    textShadow: `${diplopiaOffset}px 0px 1px rgba(0,0,0,0.3), ${-diplopiaOffset}px 0px 1px rgba(255,255,255,0.3)`,
    transition: 'filter 1s ease-in-out, text-shadow 1s ease-in-out',
  };

  return (
    // Główny kontener - ukrywa domyślny kursor
    <div className="flex min-h-screen w-full cursor-none select-none flex-col items-center justify-center overflow-hidden bg-gray-200 p-5 text-gray-800">
      {/* Nasz niestandardowy, opóźniony kursor */}
      <img
        alt={''}
        src={cursorImage}
        ref={customCursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-5 w-5 bg-transparent"
      />

      {/* Kontener na treść z dynamicznymi stylami */}
      <div className="max-w-3xl text-center" style={dynamicContentStyle}>
        <h1 className="mb-4 font-bold text-5xl">Alkohol</h1>
        <p className="mb-10 text-lg">
          Alkohol, a konkretnie zawarty w nim etanol, jest substancją
          psychoaktywną, która wpływa niemal na cały organizm. W mózgu spowalnia
          przekazywanie sygnałów między komórkami nerwowymi, co prowadzi do
          obniżenia zdolności oceny sytuacji, wydłużenia czasu reakcji i
          problemów z koordynacją ruchową. Wątroba, która jest głównym organem
          odpowiedzialnym za metabolizowanie alkoholu, przy regularnym i
          nadmiernym spożyciu jest narażona na stłuszczenie, zapalenie, a w
          konsekwencji nawet na marskość. Pamiętaj, że nawet niewielkie ilości
          mogą wpłynąć na Twoje zdrowie i bezpieczeństwo.
        </p>

        <div className="m-4">
          <h2 className="mt-0 mb-8 font-semibold text-2xl">
            Który organ jest głównie odpowiedzialny za rozkładanie
            (metabolizowanie) alkoholu w organizmie?
          </h2>
          <input
            className={`w-full cursor-none rounded-lg border-2 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
              isInputValid1
                ? 'border-green-400 focus:border-green-400 focus:ring-green-300'
                : 'border-gray-600 focus:border-gray-600 focus:ring-gray-400'
            }
                        `}
            type={'text'}
            value={inputValue1}
            onChange={(e) => {
              setInputValue1(e.target.value);
            }}
          />
        </div>
        <div className="m-4">
          <h2 className="mt-0 mb-8 font-semibold text-2xl">
            Jaka toksyczna substancja w napojach alkoholowych spowalnia pracę
            mózgu?
          </h2>
          <input
            className={`w-full cursor-none rounded-lg border-2 bg-white px-4 py-2 text-gray-800 placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 ${
              isInputValid2
                ? 'border-green-400 focus:border-green-400 focus:ring-green-300'
                : 'border-gray-600 focus:border-gray-600 focus:ring-gray-400'
            }
                        `}
            type={'text'}
            value={inputValue2}
            onChange={(e) => {
              setInputValue2(e.target.value);
            }}
          />
        </div>

        <div className="m-4">
          <button
            type="button"
            // disabled={!(isInputValid1 && isInputValid2)}
            onClick={complete}
            className={`transform animate-[move-sideways_3s_ease-in-out_infinite] cursor-none rounded-lg px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 ${isInputValid1 && isInputValid2 ? 'bg-blue-400' : ''}  
            `}
          >
            Przejdź dalej
          </button>
        </div>
      </div>
    </div>
  );
};

export default Level1;
