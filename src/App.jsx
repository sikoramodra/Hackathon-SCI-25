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
import Level6 from './components/Level6.jsx';

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

  const [activeHeaderColor, setActiveHeaderColor] = useState('white');

  const headerColors = {
    'white': {
      levels: [0, 2],
      navBackgroundColor: 'bg-white/80',
      navBorderColor: 'border-slate-200',

      buttonActiveTextColor: 'text-slate-700',
      buttonDisabledTextColor: 'text-slate-400',
      buttonBackgroundColor: 'bg-white',
      buttonBorderColor: 'border-slate-300',
      buttonHoverBorderColor: 'border-slate-400',
      buttonDisabledBorderColor: 'border-slate-300',

      levelActiveBgColor: 'bg-blue-500',
      levelActiveTextColor: 'text-white',
      levelInactiveBgColor: 'bg-slate-200',
      levelInactiveTextColor: 'text-slate-700',
      levelDisabledBgColor: 'bg-slate-100',
      levelDisabledTextColor: 'text-slate-400',
      levelActiveHoverBgColor: 'bg-slate-300',

      levelLabelTextColor: 'text-slate-500',
    },
    'navyblue': {
      levels: [1],
      navBackgroundColor: 'bg-slate-900/90',
      navBorderColor: 'border-slate-800',

      buttonActiveTextColor: 'text-slate-100',
      buttonDisabledTextColor: 'text-slate-600',
      buttonBackgroundColor: 'bg-slate-700',
      buttonBorderColor: 'border-slate-600',
      buttonHoverBorderColor: 'border-slate-200',
      buttonDisabledBorderColor: 'border-slate-800',

      levelActiveBgColor: 'bg-blue-700',
      levelActiveTextColor: 'text-white',
      levelInactiveBgColor: 'bg-slate-600',
      levelInactiveTextColor: 'text-slate-400',
      levelDisabledBgColor: 'bg-slate-700',
      levelDisabledTextColor: 'text-slate-500',
      levelActiveHoverBgColor: 'bg-slate-700',

      levelLabelTextColor: 'text-slate-200',
    }
  };

  const levels = [
    <Level2 key={1} complete={() => complete(1)} />,
    <Level3 key={2} complete={() => complete(2)} />,
    <Level4 key={3} complete={() => complete(3)} />,
    <Level5 key={4} complete={() => complete(4)} />,
    <Level6 key={5} complete={() => complete(5)} />,
    <Level7 key={6} complete={() => complete(6)} />,
    <Level8 key={7} complete={() => complete(7)} />,
  ];

  const changeLevel = (change) => {
    if (headerColors['navyblue'].levels.includes(level + change)) setActiveHeaderColor('navyblue')
    else setActiveHeaderColor('white');

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
                    className={`
                      h-8 w-8 rounded-full font-semibold text-sm transition-all
                      ${(idx > highestEnabled)
                        ? `${headerColors[activeHeaderColor].levelDisabledBgColor}
                        ${headerColors[activeHeaderColor].levelDisabledTextColor}
                        scale-100 cursor-not-allowed`
                        : `${level === idx
                          ? `${headerColors[activeHeaderColor].levelActiveBgColor}
                          ${headerColors[activeHeaderColor].levelActiveTextColor}
                          scale-110 shadow-lg cursor-pointer`
                          : `${headerColors[activeHeaderColor].levelInactiveBgColor}
                          ${headerColors[activeHeaderColor].levelInactiveTextColor}
                          cursor-pointer hover:scale-105`
                        }`
                      }
                    `}

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
