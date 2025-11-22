import { useEffect, useState } from 'react';

const MainPage = ({ complete }) => {
  const [diplopiaOffset, setDiplopiaOffset] = useState(5);

  useEffect(() => {
    const effectInterval = setInterval(() => {
      const newDiplopia = (Math.random() - 0.5) * 20; // subtle diplopia
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-600 opacity-20 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500 opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <h1
          className="mb-8 font-black text-6xl tracking-tight"
          style={headerStyle}
        >
          Przełamać bariery w dostępie do technologii
        </h1>

        <p className="text-justify text-lg text-neutral-300 leading-relaxed">
          Technologia powinna łączyć ludzi, a nie tworzyć kolejne przeszkody.
          Jednak wiele osób wciąż mierzy się z barierami — sensorycznymi,
          poznawczymi, językowymi czy finansowymi — które utrudniają pełne
          uczestnictwo w cyfrowym świecie.{' '}
        </p>
        <p className="pt-4 text-justify text-lg text-neutral-300 leading-relaxed">
          Celem naszych działań jest zrozumienie tych trudności i tworzenie
          rozwiązań, które realnie je przełamują. Dostępność nie jest dodatkiem,
          lecz fundamentem równego dostępu do informacji, usług i możliwości,
          jakie daje nowoczesna technologia.
        </p>

        <button
          type="button"
          onClick={complete}
          className="group relative mt-12 overflow-hidden rounded-xl border-8 border-blue-600 px-8 py-4 font-bold text-white text-xl shadow-lg"
        >
          <span className="-translate-x-full absolute inset-0 z-0 transform bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10">Rozpocznij</span>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
