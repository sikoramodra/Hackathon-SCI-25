import { useState } from "react";

const Level2 = ({complete}) => {

    const [q1ActiveIndex, setQ1ActiveIndex] = useState(null);

    const [q2ActiveIndex, setQ2ActiveIndex] = useState(null);

    const [showLanguages, setShowLanguages] = useState(false);

    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const [answersCorrect, setAnswersCorrect] = useState(0);

    const checkAnswers = () => {
        console.log(q1ActiveIndex, q2ActiveIndex);
        if (q1ActiveIndex === 2 && q2ActiveIndex === 1) {
            console.log("Correct answers!");
            setAnswersCorrect(1);
            complete();
        } else {
            console.log("Some answers are incorrect. Please try again.");
            setAnswersCorrect(2);
        }
    };

    const background = [
        "radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%)",
        "radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%)",
        "radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%)",
        "radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%)",
        "radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%)",
        "radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%)",
        "radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%)"
    ].join(", ");

    const submitBackgrounds = [
        "#1d293d",
        "#32ab0a",
        "#ba1509",
    ]
    

    return <>
        <div className="bg-slate-50 w-full min-h-screen flex items-center justify-center flex-col relative"
            style={{
                backgroundColor: "hsla(0, 100%, 50%, 1)",
                backgroundImage: background,
            }}
        >


            {/* form div */}
            <div className="w-150 bg-[rgba(255,255,255,0.1)] [box-shadow:0_0_50px_50px_rgba(255,255,255,0.1)] rounded-3xl">

                {/* header */}
                <h1 className="text-3xl mb-2 font-semibold">Bariera Językowa</h1>
                <p className="mb-2 text-justify">Bariera ta powoli zanika dzięki istnieniu nowoczesnych translatorów, jednak jest ona wciąż powszechnie obecna, chociażby w rozmowach na żywo.</p>
                <p className="mb-3 text-justify">Twoim celem jest odczytanie artykułu i pytań oraz odpowiedzieć na nie. Najeżdzając na tekst, zobaczysz jego tłumaczenie - może się to przydać.</p>

                <div className="flex rounded-full bg-slate-700 w-fit text-white mt-2 gap-2 items-center">
                    <div className="bg-slate-800 px-2 py-1 rounded-full select-none">Podpowiedzi</div>
                    <div onClick={() => { setShowLanguages(!showLanguages) }} className="hover:underline select-none cursor-pointer active:text-slate-300 pr-2">{showLanguages ? "Ukryj użyte języki" : "Pokaż użyte języki"}</div>
                </div>

                <div className="min-h-0.5 h-[2%] bg-slate-800 mt-2 mb-5"></div>


                {/* form inputs */}
                <div className="flex flex-col gap-4 px-10">

                    <div className="relative">
                        <p className="absolute bg-slate-800 py-2 text-lg -translate-y-1/14 rounded-lg overflow-hidden select-none text-justify"
                            onMouseEnter={() => setHovered(1)}
                            onMouseLeave={() => setHovered(0)}
                            onMouseMove={handleMouseMove}
                            style={{
                                color: (hovered != 0 && hovered == 1) ? "white" : "transparent",
                                background: (hovered != 0 && hovered == 1)
                                    ? "#001f4d"
                                    : "transparent",
                                WebkitMaskImage: (hovered != 0 && hovered == 1)
                                    ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                                    : "none",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "0 0",
                            }}
                        >
                            Zapraszamy do udziału w quizie e-sportowym dla wszystkich fanów gier i zdrowej rywalizacji. Sprawdź swoją wiedzę o drużynach, turniejach i najważniejszych momentach sceny e-sportowej.
                        </p>
                        <p className="italic text-justify select-none text-lg">Waxaan ku martiqaadeynaa dhammaan taageerayaasha ciyaaraha iyo tartanka caafimaadka qaba inay ka qaybqaataan kedisyada esports. Tijaabi aqoontaada kooxaha, tartamada, iyo waqtiyada ugu muhiimsan ee goobta dhoofinta. <span style={{ display: showLanguages ? 'inline' : 'none' }} className="hint">(somalijski)</span></p>
                    </div>

                    <div className="relative">
                        <p className="absolute bg-slate-800 py-2 text-lg -translate-y-1/8 rounded-lg overflow-hidden select-none text-justify"
                            onMouseEnter={() => setHovered(2)}
                            onMouseLeave={() => setHovered(0)}
                            onMouseMove={handleMouseMove}
                            style={{
                                color: (hovered != 0 && hovered == 2) ? "white" : "transparent",
                                background: (hovered != 0 && hovered == 2)
                                    ? "#001f4d"
                                    : "transparent",
                                WebkitMaskImage: (hovered != 0 && hovered == 2)
                                    ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                                    : "none",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "0 0",
                            }}
                        >
                            Aby dołączyć, prosimy wypełnić poniższy quiz kwalifikacyjny. Liczba miejsc ograniczona.
                        </p>
                        <p className="italic text-justify select-none text-lg">Za pridruživanje, molimo vas da ispunite kviz u nastavku. Broj mjesta je ograničen. <span style={{ display: showLanguages ? 'inline' : 'none' }} className="hint">(chorwacki)</span></p>
                    </div>

                    <div className="flex flex-col border-2 p-2 rounded-lg border-slate-800">
                        <div className="relative">
                            <p className="absolute bg-slate-800 p-2 text-lg -translate-y-1/5 rounded-lg overflow-hidden select-none text-justify"
                                onMouseEnter={() => setHovered(3)}
                                onMouseLeave={() => setHovered(0)}
                                onMouseMove={handleMouseMove}
                                style={{
                                    color: (hovered != 0 && hovered == 3) ? "white" : "transparent",
                                    background: (hovered != 0 && hovered == 3)
                                        ? "#001f4d"
                                        : "transparent",
                                    WebkitMaskImage: (hovered != 0 && hovered == 3)
                                        ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                                        : "none",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "0 0",
                                }}
                            >
                                W jakiej serii gier głównym bohaterem jest Mario?
                            </p>
                            <p className="pl-1 mb-3 font-medium select-none text-lg">マリオが主人公のゲームシリーズはどれですか？ <span style={{ display: showLanguages ? 'inline' : 'none' }} className="hint font-normal">(japoński)</span></p>
                        </div>
                        <div className="flex justify-between">
                            <div onClick={() => { setQ1ActiveIndex(0) }} style={{ backgroundColor: q1ActiveIndex === 0 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Terraria</div>
                            <div onClick={() => { setQ1ActiveIndex(1) }} style={{ backgroundColor: q1ActiveIndex === 1 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Minecraft</div>
                            <div onClick={() => { setQ1ActiveIndex(2) }} style={{ backgroundColor: q1ActiveIndex === 2 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Super Mario: Bros</div>
                            <div onClick={() => { setQ1ActiveIndex(3) }} style={{ backgroundColor: q1ActiveIndex === 3 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Call of Duty</div>
                        </div>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg border-slate-800 p-2">
                        <div className="relative">
                            <p className="absolute bg-slate-800 p-2 text-lg -translate-y-1/8 rounded-lg overflow-hidden select-none text-justify"
                                onMouseEnter={() => setHovered(4)}
                                onMouseLeave={() => setHovered(0)}
                                onMouseMove={handleMouseMove}
                                style={{
                                    color: (hovered != 0 && hovered == 4) ? "white" : "transparent",
                                    background: (hovered != 0 && hovered == 4)
                                        ? "#001f4d"
                                        : "transparent",
                                    WebkitMaskImage: (hovered != 0 && hovered == 4)
                                        ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                                        : "none",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "0 0",
                                }}
                            >
                                Jak nazywa się klasyczna gra, w której sterujesz wężem, który zbiera jedzenie i sprawia, że ​​staje się coraz dłuższy?
                            </p>
                            <p className="pl-1 mb-3 select-none text-lg">Yemək toplayan ilanı idarə etdiyiniz klassik oyunun adı nədir və onu daha uzun və daha uzun edir? <span style={{ display: showLanguages ? 'inline' : 'none' }} className="hint">(azerbejdżański)</span></p>
                        </div>
                        <div className="flex justify-between">
                            <div onClick={() => { setQ2ActiveIndex(0) }} style={{ backgroundColor: q2ActiveIndex === 0 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Tetris</div>
                            <div onClick={() => { setQ2ActiveIndex(1) }} style={{ backgroundColor: q2ActiveIndex === 1 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Snake</div>
                            <div onClick={() => { setQ2ActiveIndex(2) }} style={{ backgroundColor: q2ActiveIndex === 2 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Warhammer</div>
                            <div onClick={() => { setQ2ActiveIndex(3) }} style={{ backgroundColor: q2ActiveIndex === 3 ? '#314158' : '#1d293d' }} className="transition-colors bg-slate-800 text-white w-[24%] h-[50px] rounded-xl text-center leading-5 flex justify-center items-center cursor-pointer select-none">Clash of Clans</div>
                        </div>
                    </div>

                    <input onTransitionEnd={() => {if(answersCorrect !== 0) setAnswersCorrect(0)}} onClick={() => {checkAnswers()}} type="button" value="Submit" className="mt-4 text-white p-2 rounded-md cursor-pointer transition-colors duration-500 outline-none"
                    style={{
                        backgroundColor: submitBackgrounds[answersCorrect]
                    }}
                    />

                </div>

            </div>
        </div>
    </>;
}

export default Level2;