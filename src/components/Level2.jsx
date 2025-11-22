import { useState } from 'react';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity
const Level2 = ({ complete }) => {
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
  const [finished, setFinished] = useState(false);

  const checkAnswers = () => {
    console.log(q1ActiveIndex, q2ActiveIndex);
    if (q1ActiveIndex === 2 && q2ActiveIndex === 1) {
      setAnswersCorrect(1);
      setFinished(true);
    } else {
      setAnswersCorrect(2);
    }
  };

  const background = [
    'radial-gradient(at 40% 20%, hsla(28, 100%, 74%, 1) 0px, transparent 50%)',
    'radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%)',
    'radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%)',
    'radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%)',
    'radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%)',
    'radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%)',
    'radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%)',
  ].join(', ');

  const submitBackgrounds = ['#1d293d', '#32ab0a', '#ba1509'];

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 pt-20"
      style={{
        backgroundColor: 'hsla(0, 100%, 50%, 1)',
        backgroundImage: background,
      }}
    >
      {/* form div */}
      <div className="my-4 w-150 rounded-3xl bg-[rgba(255,255,255,0.1)] [box-shadow:0_0_50px_50px_rgba(255,255,255,0.1)]">
        {/* header */}
        <h1 className="mb-2 font-semibold text-3xl">Bariera Językowa</h1>
        <p className="mb-2 text-justify">
          Bariera ta powoli zanika dzięki istnieniu nowoczesnych translatorów,
          jednak jest ona wciąż powszechnie obecna, chociażby w rozmowach na
          żywo.
        </p>
        <p className="mb-3 text-justify">
          Twoim celem jest odczytanie artykułu i pytań oraz odpowiedzieć na nie.
          Najeżdzając na tekst, zobaczysz jego tłumaczenie - może się to
          przydać.
        </p>

        <div className="mt-2 flex w-fit items-center gap-2 rounded-full bg-slate-700 text-white">
          <div className="select-none rounded-full bg-slate-800 px-2 py-1">
            Podpowiedzi
          </div>
          <button
            type="button"
            onClick={() => {
              setShowLanguages(!showLanguages);
            }}
            className="cursor-pointer select-none pr-2 hover:underline active:text-slate-300"
          >
            {showLanguages ? 'Ukryj użyte języki' : 'Pokaż użyte języki'}
          </button>
        </div>

        <div className="mt-2 mb-5 h-[2%] min-h-0.5 bg-slate-800"></div>

        {/* form inputs */}
        <div className="flex flex-col gap-4 px-10">
          <div className="relative">
            <p
              className="-translate-y-1/14 absolute select-none overflow-hidden rounded-lg bg-slate-800 py-2 text-justify text-lg"
              onMouseEnter={() => setHovered(1)}
              onMouseLeave={() => setHovered(0)}
              onMouseMove={handleMouseMove}
              style={{
                color: hovered !== 0 && hovered === 1 ? 'white' : 'transparent',
                background:
                  hovered !== 0 && hovered === 1 ? '#001f4d' : 'transparent',
                WebkitMaskImage:
                  hovered !== 0 && hovered === 1
                    ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                    : 'none',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: '0 0',
              }}
            >
              Zapraszamy do udziału w quizie e-sportowym dla wszystkich fanów
              gier i zdrowej rywalizacji. Sprawdź swoją wiedzę o drużynach,
              turniejach i najważniejszych momentach sceny e-sportowej.
            </p>
            <p className="select-none text-justify text-lg italic">
              Waxaan ku martiqaadeynaa dhammaan taageerayaasha ciyaaraha iyo
              tartanka caafimaadka qaba inay ka qaybqaataan kedisyada esports.
              Tijaabi aqoontaada kooxaha, tartamada, iyo waqtiyada ugu muhiimsan
              ee goobta dhoofinta.{' '}
              <span
                style={{ display: showLanguages ? 'inline' : 'none' }}
                className="hint"
              >
                (somalijski)
              </span>
            </p>
          </div>

          <div className="relative">
            <p
              className="-translate-y-1/8 absolute select-none overflow-hidden rounded-lg bg-slate-800 py-2 text-justify text-lg"
              onMouseEnter={() => setHovered(2)}
              onMouseLeave={() => setHovered(0)}
              onMouseMove={handleMouseMove}
              style={{
                color: hovered !== 0 && hovered === 2 ? 'white' : 'transparent',
                background:
                  hovered !== 0 && hovered === 2 ? '#001f4d' : 'transparent',
                WebkitMaskImage:
                  hovered !== 0 && hovered === 2
                    ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                    : 'none',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: '0 0',
              }}
            >
              Aby dołączyć, prosimy wypełnić poniższy quiz kwalifikacyjny.
              Liczba miejsc ograniczona.
            </p>
            <p className="select-none text-justify text-lg italic">
              Za pridruživanje, molimo vas da ispunite kviz u nastavku. Broj
              mjesta je ograničen.{' '}
              <span
                style={{ display: showLanguages ? 'inline' : 'none' }}
                className="hint"
              >
                (chorwacki)
              </span>
            </p>
          </div>

          <div className="flex flex-col rounded-lg border-2 border-slate-800 p-2">
            <div className="relative">
              <p
                className="-translate-y-1/5 absolute select-none overflow-hidden rounded-lg bg-slate-800 p-2 text-justify text-lg"
                onMouseEnter={() => setHovered(3)}
                onMouseLeave={() => setHovered(0)}
                onMouseMove={handleMouseMove}
                style={{
                  color:
                    hovered !== 0 && hovered === 3 ? 'white' : 'transparent',
                  background:
                    hovered !== 0 && hovered === 3 ? '#001f4d' : 'transparent',
                  WebkitMaskImage:
                    hovered !== 0 && hovered === 3
                      ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                      : 'none',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: '0 0',
                }}
              >
                W jakiej serii gier głównym bohaterem jest Mario?
              </p>
              <p className="mb-3 select-none pl-1 font-medium text-lg">
                マリオが主人公のゲームシリーズはどれですか？{' '}
                <span
                  style={{ display: showLanguages ? 'inline' : 'none' }}
                  className="hint font-normal"
                >
                  (japoński)
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setQ1ActiveIndex(0);
                }}
                style={{
                  backgroundColor: q1ActiveIndex === 0 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Terraria
              </button>
              <button
                type="button"
                onClick={() => {
                  setQ1ActiveIndex(1);
                }}
                style={{
                  backgroundColor: q1ActiveIndex === 1 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Minecraft
              </button>
              <button
                type="button"
                onClick={() => {
                  setQ1ActiveIndex(2);
                }}
                style={{
                  backgroundColor: q1ActiveIndex === 2 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Super Mario: Bros
              </button>
              <button
                type="button"
                onClick={() => {
                  setQ1ActiveIndex(3);
                }}
                style={{
                  backgroundColor: q1ActiveIndex === 3 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Call of Duty
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border-2 border-slate-800 p-2">
            <div className="relative">
              <p
                className="-translate-y-1/8 absolute select-none overflow-hidden rounded-lg bg-slate-800 p-2 text-justify text-lg"
                onMouseEnter={() => setHovered(4)}
                onMouseLeave={() => setHovered(0)}
                onMouseMove={handleMouseMove}
                style={{
                  color:
                    hovered !== 0 && hovered === 4 ? 'white' : 'transparent',
                  background:
                    hovered !== 0 && hovered === 4 ? '#001f4d' : 'transparent',
                  WebkitMaskImage:
                    hovered !== 0 && hovered === 4
                      ? `radial-gradient(circle 50px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%)`
                      : 'none',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: '0 0',
                }}
              >
                Jak nazywa się klasyczna gra, w której sterujesz wężem, który
                zbiera jedzenie i sprawia, że ​​staje się coraz dłuższy?
              </p>
              <p className="mb-3 select-none pl-1 text-lg">
                Yemək toplayan ilanı idarə etdiyiniz klassik oyunun adı nədir və
                onu daha uzun və daha uzun edir?{' '}
                <span
                  style={{ display: showLanguages ? 'inline' : 'none' }}
                  className="hint"
                >
                  (azerbejdżański)
                </span>
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => {
                  setQ2ActiveIndex(0);
                }}
                style={{
                  backgroundColor: q2ActiveIndex === 0 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Tetris
              </button>
              <button
                type="button"
                onClick={() => {
                  setQ2ActiveIndex(1);
                }}
                style={{
                  backgroundColor: q2ActiveIndex === 1 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Snake
              </button>
              <button
                type="button"
                onClick={() => {
                  setQ2ActiveIndex(2);
                }}
                style={{
                  backgroundColor: q2ActiveIndex === 2 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Warhammer
              </button>
              <button
                type="button"
                onClick={() => {
                  setQ2ActiveIndex(3);
                }}
                style={{
                  backgroundColor: q2ActiveIndex === 3 ? '#314158' : '#1d293d',
                }}
                className="flex h-[50px] w-[24%] cursor-pointer select-none items-center justify-center rounded-xl bg-slate-800 text-center text-white leading-5 transition-colors"
              >
                Clash of Clans
              </button>
            </div>
          </div>

          <input
            onTransitionEnd={() => {
              if (answersCorrect !== 0) {
                setAnswersCorrect(0);
              } else if (finished) {
                complete();
              }
            }}
            onClick={() => {
              checkAnswers();
            }}
            type="button"
            value="Submit"
            className="mt-4 cursor-pointer rounded-md p-2 text-white outline-none transition-colors duration-500"
            style={{
              backgroundColor: submitBackgrounds[answersCorrect],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Level2;
