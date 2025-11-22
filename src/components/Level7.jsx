import { useMemo, useState } from 'react';

const scrambleMap = {
  a: 'k',
  b: 'z',
  c: 'f',
  d: 'n',
  e: 'w',
  f: 'v',
  g: 'w',
  h: 'y',
  i: 'j',
  j: 'b',
  k: 'x',
  l: 'h',
  m: 'p',
  n: 's',
  o: 'a',
  p: 'c',
  q: 'm',
  r: 't',
  s: 'u',
  t: 'g',
  u: 'l',
  v: 'r',
  w: 'o',
  x: 'i',
  y: 'd',
  z: 'e',
};

const decodeMap = Object.fromEntries(
  Object.entries(scrambleMap).map(([k, v]) => [v, k]),
);

const dyslexiaTransform = (text) => {
  return text
    .split(' ')
    .map((word) => {
      if (word.length > 3 && Math.random() < 0.5) {
        const i = Math.floor(Math.random() * (word.length - 1));
        const letters = word.split('');
        [letters[i], letters[i + 1]] = [letters[i + 1], letters[i]];
        word = letters.join('');
      }
      if (word.length > 3 && Math.random() < 0.2) {
        const i = Math.floor(Math.random() * word.length);
        word = word.slice(0, i) + word.slice(i + 1);
      }
      const replacements = {
        b: 'd',
        d: 'b',
        p: 'q',
        q: 'p',
        m: 'n',
        n: 'm',
        w: 'v',
        v: 'w',
      };
      word = word
        .split('')
        .map((l) =>
          replacements[l.toLowerCase()] && Math.random() < 0.3
            ? replacements[l.toLowerCase()]
            : l,
        )
        .join('');
      return word;
    })
    .join(' ');
};

const infoText =
  'Dysleksja nie oznacza braku inteligencji. To odmienny sposób przetwarzania informacji, który sprawia, że czytanie i pisanie wymagają dużo większego wysiłku. Litery mogą się mieszać, przeskakiwać lub znikać, a mózg musi wkładać ogrom energii, by je uporządkować.';

export default function DyslexiaLevel({ complete }) {
  const [displayValue, setDisplayValue] = useState('');
  const [decodedValue, setDecodedValue] = useState('');
  const transformedText = useMemo(() => dyslexiaTransform(infoText), []);
  const [wrong, setWrong] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length < displayValue.length) {
      setDisplayValue(value);
      setDecodedValue(decodedValue.slice(0, -1));
    } else {
      const newChar = value[value.length - 1];
      const lower = newChar.toLowerCase();
      const scrambled = scrambleMap[lower] || newChar;
      const decoded = decodeMap[scrambled] || lower;

      setDisplayValue(displayValue + scrambled);
      setDecodedValue(decodedValue + decoded);
    }
  };

  const handleSubmit = () => {
    if (displayValue.toLowerCase() === 'dysleksja') {
      complete();
    } else {
      setWrong(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50">
      <style>
        {`.wrong {
                    background-color: red;
                }`}
      </style>
      <div
        className="relative w-full max-w-xl rounded-xl p-8 shadow-lg"
        style={{
          backgroundImage: `
						repeating-linear-gradient(to bottom, #cfcfcf 0 1px, transparent 1px 30px)
					`,
        }}
      >
        <h2
          className="mb-8 text-2xl text-blue-900"
          style={{ fontFamily: 'Patrick Hand, cursive' }}
        >
          Temat: Przełamywanie Bariery Dysleksji
        </h2>

        <p
          className="mb-8 text-gray-800 text-lg leading-relaxed"
          style={{ fontFamily: 'Patrick Hand, cursive' }}
        >
          {transformedText}
        </p>

        <p
          className="mb-4 text-gray-900 leading-8"
          style={{ fontFamily: 'Patrick Hand, cursive' }}
        >
          Spróbuj wpisać hasło "dysleksja", mimo że każda litera klawiatury daje
          inną literę.
        </p>

        <input
          className={`mb-4 w-full rounded-lg border border-gray-400 px-4 py-3 text-center text-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400`}
          value={displayValue}
          onChange={handleInputChange}
          placeholder="Wpisz hasło..."
          style={{ fontFamily: 'Patrick Hand, cursive' }}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className={`w-full rounded-lg py-3 text-lg text-white transition ${wrong ? 'bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          style={{ fontFamily: 'Patrick Hand, cursive' }}
        >
          Zatwierdź
        </button>

        <p
          className="mt-4 text-gray-500 text-sm leading-6"
          style={{ fontFamily: 'Patrick Hand, cursive' }}
        >
          *Tak osoby z dysleksją mogą odbierać tekst: litery przeskakują,
          zlewają się, czasem znikają.
        </p>
      </div>
    </div>
  );
}
