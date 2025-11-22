import { X } from 'lucide-react';
import { useState } from 'react';
import colorblind1 from '../assets/colorblind1.jpg';
import colorblind2 from '../assets/colorblind2.jpg';
import colorblind3 from '../assets/colorblind3.jpg';
import colorblind4 from '../assets/colorblind4.jpg';
import ref1 from '../assets/ref1.png';
import ref2 from '../assets/ref2.png';
import ref3 from '../assets/ref3.png';
import ref4 from '../assets/ref4.png';

function Level4({ complete }) {
  const [selections, setSelections] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  const [visionMode, setVisionMode] = useState({
    name: 'Normal',
    img: ref1,
  });

  const [feedback, setFeedback] = useState({
    message: '',
    type: '',
  });

  const correct = {
    1: 'Tritanopia',
    2: 'Normal',
    3: 'Deuteranopia',
    4: 'Protanopia',
  };

  const images = [
    { id: 1, src: colorblind4 },
    { id: 2, src: colorblind1 },
    { id: 3, src: colorblind3 },
    { id: 4, src: colorblind2 },
  ];

  const availableModes = [
    { name: 'Normal', img: ref1 },
    { name: 'Protanopia', img: ref2 },
    { name: 'Deuteranopia', img: ref3 },
    { name: 'Tritanopia', img: ref4 },
  ];

  const dismissFeedback = () => {
    setFeedback({ message: '', type: '' });
  };

  const validateSelects = (nr, val) => {
    const newSelections = { ...selections, [nr]: val };
    setSelections(newSelections);

    setFeedback({ message: '', type: '' });

    const allFilled = Object.values(newSelections).every((v) => v !== '');

    if (allFilled) {
      const allCorrect = Object.keys(correct).every(
        (key) => newSelections[key] === correct[key],
      );

      if (allCorrect) {
        complete();
        setFeedback({
          message: 'Correct! Proceeding to the next level.',
          type: 'success',
        });
      } else {
        setSelections({ 1: '', 2: '', 3: '', 4: '' });
        setFeedback({ message: 'Incorrect. Please try again.', type: 'error' });
      }
    }
  };

  const getFeedbackStyles = () => {
    if (feedback.type === 'success') {
      return 'bg-green-100 border-green-400 text-green-700';
    }
    if (feedback.type === 'error') {
      return 'bg-red-100 border-red-400 text-red-700';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-8">
      {feedback.message && (
        <div
          className={`-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 w-full max-w-sm cursor-pointer rounded border px-4 py-3 shadow-lg ${getFeedbackStyles()}`}
          role="alert"
          onKeyUp={dismissFeedback}
        >
          <div className="flex items-center justify-between">
            <p className="font-bold">
              {feedback.type === 'success' ? 'Success!' : 'Attention!'}
            </p>
            <button
              type="button"
              className={`-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 ${feedback.type === 'success' ? 'text-green-900 hover:bg-green-200' : 'text-red-900 hover:bg-red-200'} focus:ring-2 focus:ring-opacity-50`}
              aria-label="Dismiss"
              onClick={(e) => {
                e.stopPropagation();
                dismissFeedback();
              }}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-sm">{feedback.message}</p>
        </div>
      )}
      <div className="mb-8">
        <h2 className="mb-3 font-semibold text-2xl text-gray-900 transition-colors">
          Sposoby widzenia:
        </h2>
        <div className="flex gap-3">
          {availableModes.map((mode) => (
            <button
              type="button"
              key={mode.name}
              onClick={() => setVisionMode(mode)}
              className="cursor-pointer rounded-lg border-2 border-slate-400 px-6 py-3 font-medium transition-all"
            >
              {mode.name}
            </button>
          ))}
          <img src={visionMode.img} height="40" width="450" alt="ref" />
        </div>
      </div>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {images.map(({ id, src }) => (
          <div
            key={id}
            className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4"
          >
            <img
              src={src}
              alt="Color blindness test"
              className="mb-4 h-auto w-full rounded shadow-md"
            />
            <select
              value={selections[id]}
              onChange={(e) => validateSelects(id, e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 p-3 font-medium text-gray-700 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select vision type...</option>
              <option value="Normal">Normal Vision</option>
              <option value="Protanopia">Protanopia</option>
              <option value="Deuteranopia">Deuteranopia</option>
              <option value="Tritanopia">Tritanopia</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Level4;
