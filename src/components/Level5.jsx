import { useRef, useState } from 'react';
import cursorImage from '../assets/cursor.png';
import CaptchaModal from './CaptchaModal.jsx';
import OnScreenKeyboard from './OnScreenKeyboard.jsx';
import useParkinsonMouse from './useParkinsonMouse.jsx';

const Level5 = ({ complete }) => {
  const [isInputHovered, setInputHovered] = useState(false);
  const [isCaptchaVisible, setCaptchaVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleKeyPress = (key) => {
    if (key === 'Backspace') {
      setInputValue((prev) => prev.slice(0, -1));
    } else {
      setInputValue((prev) => prev + key);
    }
  };

  const { customCursorRef, cursorCoords } = useParkinsonMouse({
    targetRef: inputRef,
    onHoverChange: setInputHovered,
    onKeyPress: handleKeyPress,
  });

  const inputClasses = `w-full cursor-none px-4 py-3 border rounded-lg text-lg focus:outline-none transition-all duration-200 ${
    isInputHovered
      ? 'border-transparent ring-2 ring-blue-500 shadow-lg'
      : 'border-gray-300'
  }`;

  const sentenceToType = 'PARKINSON';

  const handleSubmitClick = () => {
    setCaptchaVisible(true);
  };

  return (
    <div className="relative flex min-h-screen w-full cursor-none flex-col items-center overflow-hidden bg-gray-100 p-5 text-gray-800">
      <img
        alt={''}
        src={cursorImage}
        ref={customCursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-5 w-5 bg-transparent"
      />

      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-2 font-bold text-2xl md:text-3xl">
          Choroba Parkinsona
        </h1>

        <div className="mb-8 rounded-xl bg-white p-8 shadow-lg">
          <p className="mb-4 text-gray-600 text-lg">
            Twoim zadaniem jest przepisanie poniższego zdania. Precyzyjne ruchy
            mogą być wyzwaniem.
          </p>
          <p className="mb-6 select-none font-semibold text-xl">
            {sentenceToType}
          </p>
          <div className="flex">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tutaj piszesz"
              disabled={true}
              className={inputClasses}
            />
            <button
              type="button"
              // disabled={inputValue !== 'PARKINSON'}
              onClick={handleSubmitClick}
              className={`transform cursor-none rounded-lg px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 ${inputValue === 'PARKINSON' ? 'bg-blue-400 hover:scale-105' : 'bg-gray-400'}  
            `}
            >
              Wyślij
            </button>
          </div>
        </div>
      </div>
      <div className="h-60 w-xl">
        <OnScreenKeyboard />
      </div>

      {isCaptchaVisible && (
        <CaptchaModal customCursorCoords={cursorCoords} onSuccess={complete} />
      )}
    </div>
  );
};

export default Level5;
