import { useEffect, useState } from 'react';

const LastPage = ({ complete }) => {
  const [diplopiaOffset, setDiplopiaOffset] = useState(5);

  useEffect(() => {
    const effectInterval = setInterval(() => {
      const newDiplopia = (Math.random() - 0.5) * 20; // subtle diplopia effect
      setDiplopiaOffset(newDiplopia);
    }, 2000);

    return () => clearInterval(effectInterval);
  }, []);

  const headerStyle = {
    textShadow: `${diplopiaOffset}px 0px 2px rgba(255,255,255,0.35), ${-diplopiaOffset}px 0px 2px rgba(0,0,0,0.35)`,
    transition: 'text-shadow 1s ease-in-out',
  };

  return (
    <div className="relative flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden bg-neutral-950 p-6 text-neutral-200">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-600 opacity-20 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <h1
          className="mb-8 font-black text-6xl tracking-tight"
          style={headerStyle}
        >
          Gratulacje!
        </h1>

        <div className="mt-2 overflow-x-auto">
          <table className="mx-auto w-full table-auto border-collapse border border-neutral-500 text-left text-neutral-200">
            <thead>
              <tr>
                <th className="border border-neutral-500 bg-neutral-800 px-4 py-2">
                  Bariera
                </th>
                <th className="border border-neutral-500 bg-neutral-800 px-4 py-2">
                  Rozwiązanie
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera językowa
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Tłumaczenia, wersje wielojęzyczne dostosowane do docelowych
                  odbiorców
                </td>
              </tr>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera ekonomiczna, paywall
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Darmowy dostęp, minimalizacja reklam, inne źródła dochodu
                </td>
              </tr>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera motoryczna (np. Choroba Parkinsona)
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Duże przyciski, wsparcie dla klawiatury
                </td>
              </tr>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera percepcyjna (np. Daltonizm)
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Wysoki kontrast, oznaczenia tekstowe
                </td>
              </tr>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera poznawcza (np. Dysleksja)
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Prosty język, czytelne czcionki
                </td>
              </tr>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera poznawcza (np. ADHD)
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Minimalizacja rozpraszaczy, skupienie na treści (np. tryb Nie
                  Przeszkadzać)
                </td>
              </tr>
              <tr>
                <td className="border border-neutral-500 px-4 py-2">
                  Bariera wzrokowa (np. Mroczki Względne)
                </td>
                <td className="border border-neutral-500 px-4 py-2">
                  Powiększalne treści, możliwość zmiany kontrastu
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={complete}
          className="group relative mt-12 overflow-hidden rounded-xl border-8 border-blue-600 px-8 py-4 font-bold text-white text-xl shadow-lg"
        >
          <span className="absolute inset-0 z-0 translate-x-full transform bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10">Powrót</span>
        </button>
      </div>
    </div>
  );
};

export default LastPage;
