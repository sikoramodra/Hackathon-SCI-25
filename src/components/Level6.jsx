import { useState, useRef } from "react";

export default function Level6({ complete }) {

    const hideRef = useRef(null);

    const sightIssuesRef = useRef(null);

    const endCreditsRef = useRef(null);

    const gradients = [
        "radial-gradient(circle 100px at 40% 20%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 300px at 20% 60%, rgb(20,20,20) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 10% 70%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 75px at 80% 50%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 80% 50%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 300px at 60% 73%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 50% 50%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 50% 50%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 500px at 20% 30%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 30% 80%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 30% 80%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 65% 45%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 90% 30%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 300px at 85% 70%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 85% 70%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 10% 10%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 85% 70%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 500px at 70% 20%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 70% 20%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 150px at 55% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 55% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 400px at 35% 50%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 300px at 70% 80%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 40% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 40% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 200px at 40% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 300px at 95% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 300px at 5% 90%, rgb(0,0,0) 0px, transparent 100%)",
        "radial-gradient(circle 400px at 15% 90%, rgb(0,0,0) 0px, transparent 100%)",
    ];

    const buttonsAmount = 14;

    const [checkedButtonsAmount, setCheckedButtonsAmount] = useState(0);

    const checkButton = (button) => {
        button.style.pointerEvents = 'none';
        button.style.backgroundColor = 'green';
        setCheckedButtonsAmount((prev) => {
            const newCount = prev + 1;
            if (newCount === buttonsAmount) {
                setTimeout(() => {
                    sightIssuesRef.current.style.opacity = '0';
                }, 1000);
            }
            return newCount;
        });
    }

    const ShowEndCredits = () => {
        endCreditsRef.current.style.opacity = '1';
    };

    const ref = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const offset = useRef({ x: 0, y: 0 });

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const onMouseDown = e => {
        setIsDragging(true);

        const rect = ref.current.getBoundingClientRect();

        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        hideRef.current.parentNode.style.opacity = '0';
        hideRef.current.style.pointerEvents = 'none'
    };

    const onMouseMove = e => {
        if (!isDragging) return;

        const container = ref.current.parentNode.getBoundingClientRect();

        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y - 78;

        const maxX = container.width;   // ile może pojechać w prawo
        const minX = -container.width;  // ile może w lewo
        const maxY = container.height;
        const minY = -container.height;

        setPos({
            x: clamp(newX, minX, maxX),
            y: clamp(newY, minY, maxY)
        });
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="w-screen h-screen bg-slate-100 overflow-hidden relative pt-20"
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
        >

            <div ref={endCreditsRef} onTransitionEnd={() => { setTimeout(() => { complete() }, 5000); }} className="z-1 absolute top-0 left-0 w-screen h-screen pt-20 bg-[rgba(0,0,0,0.6)] pointer-events-none flex flex-col justify-center items-center opacity-0 transition-opacity duration-1000">
                <p className="text-3xl font-bold text-white"
                    style={{
                        textShadow: '2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 2px 2px black, -2px -2px black, 2px -2px black, -2px 2px black'
                    }}
                >Bez mroczków o wiele łatwiejsze, prawda?</p>
                <p className="text-3xl font-bold text-white"
                    style={{
                        textShadow: '2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 2px 2px black, -2px -2px black, 2px -2px black, -2px 2px black'
                    }}
                >Niektórzy mierzą się z tym na codzień.</p>
            </div>

            <div
                onTransitionEnd={() => { setTimeout(() => { ShowEndCredits() }, 1000); }}
                ref={sightIssuesRef}
                className="z-1 absolute top-0 left-0 w-screen h-screen pt-20 bg-transparent pointer-events-none flex flex-col justify-start gap-5 items-center transition-opacity duration-1000"
                style={{
                    backgroundImage: gradients.join(", "),
                }}
            >
                {/* counter */}
                <div>
                    <p className="text-white text-xl"
                        style={{
                            textShadow: '1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
                        }}
                    >Znalezione przyciski: {checkedButtonsAmount}/{buttonsAmount}</p>
                </div>

                {/* header */}
                <div className="z-10 flex flex-col items-center justify-start w-200 min-h-[calc(100vh-200px)] opacity-100">
                    <h1 className="text-3xl border-b-2 border-slate-800 pb-3 font-semibold text-white"
                        style={{
                            textShadow: '1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
                        }}
                    >Bariera: <span className="text-red-700">Wzrokowa</span></h1>
                    <p className="w-full text-justify mt-3 font-semibold text-white"
                        style={{
                            textShadow: '1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
                        }}
                    >Ludzie z zaburzeniem wzroku mają trudności z widzeniem lub są całkowicie niewidomi.</p>
                    <p className="w-full text-justify mt-2 font-semibold text-white"
                        style={{
                            textShadow: '1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
                        }}
                    >W tym przykładzie przedstawione są mroczki względne - Celem użytkownika jest znalezienie wszystkich przycisków do kliknięcia. Użytkownik musi przesuwać stronę przeciągając ją myszką, dzięki czemu będzie mógł znależć wszystkie przyciski do kliknięcia.</p>
                    <p ref={hideRef} onClick={(e) => { e.target.parentNode.style.opacity = '0'; e.target.style.pointerEvents = 'none' }} className="text-blue-400 pointer-events-auto hover:underline cursor-pointer mt-2 text-justify w-fit select-none"
                        style={{
                            textShadow: '1px 0 black, -1px 0 black, 0 1px black, 0 -1px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black'
                        }}
                    >Kliknij tutaj, aby ukryć ten tekst.</p>
                    <div className="w-full flex justify-end">
                    </div>
                </div>
            </div>

            {/* content */}
            <div
                ref={ref}
                className="w-full h-full select-none flex justify-center items-center relative"
                style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`
                }}
            >

                {/* buttons */}
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-27/100 left-5/11 appearance-none px-2 py-1 bg-slate-300 text-white rounded">Kliknij mnie!</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-23/100 left-27/40 appearance-none px-2 py-1 bg-slate-200 text-slate-400 rounded">Ukryty</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-50 left-50 appearance-none px-2 py-1 bg-slate-200 text-slate-300 rounded">!</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-200 left-80 appearance-none px-2 py-1 bg-slate-300 text-slate-100 rounded">?</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-90/100 left-30/40 appearance-none px-2 py-1 bg-slate-200 text-slate-300 rounded">(Niewidoczny)</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-70/100 left-20/40 appearance-none px-2 py-1 bg-slate-300 text-slate-100 rounded">Bu!</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-30/100 left-35/40 appearance-none px-2 py-1 bg-slate-100 text-slate-300 rounded">Aha</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-80/100 left-15/40 appearance-none px-2 py-1 bg-slate-200 text-slate-300 rounded">Nie klikaj</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-1/100 left-10/40 appearance-none px-2 py-1 bg-slate-200 text-slate-100 rounded">No cześć!</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-120/100 left-10/40 appearance-none px-2 py-1 bg-slate-200 text-slate-100 rounded">Nie widzisz mnie</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-110/100 left-30/40 appearance-none px-2 py-1 bg-slate-300 text-slate-200 rounded">Nie!</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-70/100 left-42/40 appearance-none px-2 py-1 bg-slate-200 text-slate-300 rounded">Ukryłem się.</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-3/10 -left-2/40 appearance-none px-2 py-1 bg-slate-200 text-slate-300 rounded">...</button>
                <button onClick={(e) => { checkButton(e.target) }} className="absolute top-8/10 -left-6/40 appearance-none px-2 py-1 bg-slate-200 text-slate-100 rounded">Co?</button>
            </div>
        </div >
    );
}
