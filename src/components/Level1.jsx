/** biome-ignore-all lint/nursery/useSortedClasses: <explanation> */
import React, {useState, useEffect, useRef} from 'react';
import cursorImage from '../assets/cursor.png';

const Level1 = () => {
    // Stan dla dynamicznego blura i diplopii
    const [blurValue, setBlurValue] = useState(0);
    const [diplopiaOffset, setDiplopiaOffset] = useState(0);

    // Pytania
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [isInputValid1, setIsInputValid1] = useState(false);
    const [isInputValid2, setIsInputValid2] = useState(false);

    // Refy do obsługi opóźnionego kursora
    const customCursorRef = useRef(null);
    const realMousePos = useRef({x: 0, y: 0});
    const delayedMousePos = useRef({x: 0, y: 0});
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
        setIsInputValid1(["watroba", "wątroba"].includes(inputValue1.toLowerCase()));
        setIsInputValid2(inputValue2.toLowerCase() === "etanol");
    }, [inputValue1, inputValue2]);

    // Efekt do obsługi animacji i śledzenia kursora
    useEffect(() => {
        const handleMouseMove = (event) => {
            realMousePos.current = {x: event.clientX, y: event.clientY};
        };

        const animateCursor = () => {
            const {x: targetX, y: targetY} = realMousePos.current;
            const {x: currentX, y: currentY} = delayedMousePos.current;

            const easingFactor = 0.1;
            const newX = currentX + (targetX - currentX) * easingFactor;
            const newY = currentY + (targetY - currentY) * easingFactor;

            delayedMousePos.current = {x: newX, y: newY};

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

    return (// Główny kontener - ukrywa domyślny kursor
        <div
            className="flex flex-col items-center justify-center w-full min-h-screen p-5 overflow-hidden bg-gray-200 text-gray-800 cursor-none select-none">

            {/* Nasz niestandardowy, opóźniony kursor */}
            <img
                alt={""}
                src={cursorImage}
                ref={customCursorRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] h-5 w-5 bg-transparent"
            />

            {/* Kontener na treść z dynamicznymi stylami */}
            <div className="text-center max-w-3xl" style={dynamicContentStyle}>
                <h1 className="text-5xl font-bold mb-4">Alkohol</h1>
                <p className="text-lg mb-10">
                    Alkohol, a konkretnie zawarty w nim etanol, jest substancją psychoaktywną, która wpływa niemal na
                    cały organizm. W mózgu spowalnia przekazywanie sygnałów między komórkami nerwowymi, co prowadzi do
                    obniżenia zdolności oceny sytuacji, wydłużenia czasu reakcji i problemów z koordynacją ruchową.
                    Wątroba, która jest głównym organem odpowiedzialnym za metabolizowanie alkoholu, przy regularnym i
                    nadmiernym spożyciu jest narażona na stłuszczenie, zapalenie, a w konsekwencji nawet na marskość.
                    Pamiętaj, że nawet niewielkie ilości mogą wpłynąć na Twoje zdrowie i bezpieczeństwo.
                </p>

                <div className="m-4">
                    <h2 className="text-2xl font-semibold mt-0 mb-8">
                        Który organ jest głównie odpowiedzialny za rozkładanie (metabolizowanie) alkoholu w organizmie?
                    </h2>
                    <input
                        className={`
                             w-full px-4 py-2 border-2 rounded-lg text-gray-800 bg-white 
                            transition duration-300 ease-in-out placeholder-gray-400 cursor-none
                            focus:outline-none focus:ring-2
                            ${isInputValid1
                            ? 'border-green-400 focus:border-green-400 focus:ring-green-300'
                            : 'border-gray-600 focus:border-gray-600 focus:ring-gray-400'
                        }
                        `}
                        type={"text"}
                        value={inputValue1}
                        onChange={(e) => {
                            setInputValue1(e.target.value);
                        }}
                    />
                </div>
                <div className="m-4">
                    <h2 className="text-2xl font-semibold mt-0 mb-8">
                        Jaka toksyczna substancja w napojach alkoholowych spowalnia pracę mózgu?
                    </h2>
                    <input
                        className={`
                             w-full px-4 py-2 border-2 rounded-lg text-gray-800 bg-white 
                            transition duration-300 ease-in-out placeholder-gray-400 cursor-none
                            focus:outline-none focus:ring-2
                            ${isInputValid2
                            ? 'border-green-400 focus:border-green-400 focus:ring-green-300'
                            : 'border-gray-600 focus:border-gray-600 focus:ring-gray-400'
                        }
                        `}
                        type={"text"}
                        value={inputValue2}
                        onChange={(e) => {
                            setInputValue2(e.target.value);
                        }}
                    />
                </div>

                <div className="m-4">
                    <button
                        type="button"
                        disabled={!(isInputValid1 && isInputValid2)}
                        onClick={() => {
                            console.log("Nastepny")
                        }}
                        className={`
                            text-white
                            font-bold
                            py-3 px-6
                            rounded-lg
                            shadow-lg
                            transform
                            hover:scale-105
                            transition-all
                            duration-300
                            cursor-none
                            animate-[move-sideways_3s_ease-in-out_infinite]
                            ${(isInputValid1 && isInputValid2) ? "bg-blue-400" : ""}  
                        `}
                    >
                        Przejdź dalej
                    </button>
                </div>
            </div>

        </div>);
};

export default Level1;