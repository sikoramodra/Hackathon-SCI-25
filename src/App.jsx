import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Level1 from './components/Level1_dummy';

function App() {
  const [level, setLevel] = useState(0);
  const [highestEnabled, setHighestEnabled] = useState(0);

  const complete = (completedLevel) => {
    setHighestEnabled((prev) => Math.max(prev, completedLevel));
  };

  const levels = [
    <Level1 key={1} test={true} complete={() => complete(1)} />,
    <Level1 />,
  ];

  const changeLevel = (change) => {
    setLevel((prev) => {
      const newLevel = prev + change;
      return newLevel >= 0 && newLevel < levels.length ? newLevel : prev;
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <nav className="sticky top-0 z-10 border-slate-200 border-b bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={level === 0}
              onClick={() => changeLevel(-1)}
              className="group hover:-translate-y-0.5 flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-slate-400 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-300 disabled:hover:shadow-none"
            >
              <ChevronLeft className="group-hover:-translate-x-1 h-5 w-5 transition-transform group-disabled:group-hover:translate-x-0" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-500 text-sm">Level</span>
              <div className="flex gap-1.5">
                {levels.map((item, idx) => (
                  <input
                    type="button"
                    key={item.key}
                    onClick={() => idx <= highestEnabled && setLevel(idx)}
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
            </div>

            <button
              type="button"
              disabled={
                level + 1 > highestEnabled || level === levels.length - 1
              }
              onClick={() => changeLevel(+1)}
              className="group hover:-translate-y-0.5 flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-all hover:border-slate-400 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:border-slate-300 disabled:hover:shadow-none"
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-disabled:group-hover:translate-x-0" />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-xl bg-white p-8 shadow-lg">
          {levels.at(level)}
        </div>
      </main>
    </div>
  );
}

export default App;
