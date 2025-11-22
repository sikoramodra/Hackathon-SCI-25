import { useEffect, useState } from 'react';

const Level1 = ({ complete }) => {
  const [diplopiaOffset, setDiplopiaOffset] = useState(0);

  useEffect(() => {
    const effectInterval = setInterval(() => {
      const newDiplopia = (Math.random() - 0.5) * 8; // subtle diplopia
      setDiplopiaOffset(newDiplopia);
    }, 2500);

    return () => clearInterval(effectInterval);
  }, []);

  const headerStyle = {
    textShadow: `${diplopiaOffset}px 0px 2px rgba(255,255,255,0.35), ${-diplopiaOffset}px 0px 2px rgba(0,0,0,0.35)`,
    transition: 'text-shadow 1s ease-in-out',
  };

  return (
    <div className="relative flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden bg-neutral-950 p-6 text-neutral-200">
      {/* soft floating gradient orbs for a medical/diagnostic vibe */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-600 opacity-20 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <h1
          className="mb-8 font-black text-6xl tracking-tight"
          style={headerStyle}
        >
          Zaburzenia widzenia a dostępność
          <br />
          stron internetowych
        </h1>

        <p className="text-lg text-neutral-300 leading-relaxed">
          Różnorodne ograniczenia związane z percepcją wzrokową wpływają na to,
          jak użytkownicy postrzegają treści cyfrowe. Osoby z zaburzeniami
          widzenia, takimi jak problemy z ostrością, percepcją kolorów czy
          rozbieżnością obrazu, mogą doświadczać trudności podczas korzystania z
          aplikacji i stron internetowych. Subtelny efekt diplopii — czyli
          widzenia podwójnego — to tylko jeden z przykładów tego, jak nawet
          niewielkie odchylenie percepcyjne może utrudnić odbiór informacji.
          Dlatego tak ważne jest projektowanie interfejsów, które uwzględniają
          różne potrzeby użytkowników i minimalizują bariery sensoryczne.
        </p>

        <button
          type="button"
          onClick={complete}
          className="mt-12 rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white text-xl shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Przejdź dalej
        </button>
      </div>
    </div>
  );
};

export default Level1;
