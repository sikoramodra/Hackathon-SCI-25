import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import LastPage from './components/LastPage.jsx';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Level4 from './components/Level4';
import Level5 from './components/Level5.jsx';
import Level7 from './components/Level7.jsx';
import Level8 from './components/Level8.jsx';
import MainPage from './components/MainPage.jsx';

function App() {
  const [level, setLevel] = useState(0);
  const [highestEnabled, setHighestEnabled] = useState(7);
  const [isMainScreenSelected, setIsMainScreenSelected] = useState(true);
  const [isLastScreenSelected, setIsLastScreenSelected] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [level]);

  const complete = (completedLevel) => {
    setHighestEnabled((prev) => Math.max(prev, completedLevel));
    changeLevel(1);
  };

  const levels = [
    <Level2 key={1} complete={() => complete(1)} />,
    <Level3 key={2} complete={() => complete(2)} />,
    <Level4 key={3} complete={() => complete(3)} />,
    <Level5 key={4} complete={() => complete(4)} />,
    <Level7 key={5} complete={() => complete(5)} />,
    <Level8 key={6} complete={() => complete(6)} />,
  ];

  const changeLevel = (change) => {
    setLevel((prev) => {
      const newLevel = prev + change;
      return newLevel >= 0 && newLevel < levels.length ? newLevel : prev;
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {!(isMainScreenSelected || isLastScreenSelected) && (
        <nav className="fixed top-0 z-10 h-20 w-full border-slate-200 bg-white/10 shadow-sm backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (level === 0) {
                    setIsMainScreenSelected(true);
                  } else {
                    changeLevel(-1);
                  }
                }}
                className="group hover:-translate-y-0.5 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-slate-400 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-300 disabled:hover:shadow-none"
              >
                <ChevronLeft className="group-hover:-translate-x-1 h-5 w-5 transition-transform group-disabled:group-hover:translate-x-0" />
                <span>{level === 0 ? 'Strona Główna' : 'Poprzedni'}</span>
              </button>

              <div className="flex gap-1.5">
                {levels.map((item, idx) => (
                  <input
                    type="button"
                    key={item.key}
                    onClick={() => {
                      if (idx <= highestEnabled) {
                        setLevel(idx);
                      }
                    }}
                    disabled={idx > highestEnabled}
                    className={`h-8 w-8 rounded-full font-semibold text-sm transition-all ${
                      level === idx
                        ? 'scale-110 cursor-pointer bg-blue-500 text-white shadow-lg'
                        : 'cursor-pointer bg-slate-200 text-slate-700 hover:scale-105 hover:bg-slate-300'
                    }disabled:bg-slate-100 disabled:scale-100 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-slate-100`}
                    value={idx + 1}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={level + 1 > highestEnabled}
                onClick={() => {
                  if (level === levels.length - 1) {
                    setIsLastScreenSelected(true);
                  } else {
                    changeLevel(+1);
                  }
                }}
                className="group hover:-translate-y-0.5 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-slate-400 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-300 disabled:hover:shadow-none"
              >
                <span>
                  {level === levels.length - 1 ? 'Strona końcowa' : 'Następny'}
                </span>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-disabled:group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        </nav>
      )}

      <main>
        {isMainScreenSelected ? (
          <MainPage complete={() => setIsMainScreenSelected(false)} />
        ) : isLastScreenSelected ? (
          <LastPage complete={() => setIsLastScreenSelected(false)} />
        ) : (
          levels.at(level)
        )}
      </main>
    </div>
  );
}

export default App;
