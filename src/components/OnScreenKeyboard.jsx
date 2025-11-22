const BackspaceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="pointer-events-none h-6 w-6"
  >
    <title>Backspace</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
    />
  </svg>
);

const OnScreenKeyboard = () => {
  const keyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  // Wspólne klasy dla wszystkich klawiszy, aby uniknąć powtórzeń
  const keyClasses =
    'keyboard-key flex items-center justify-center h-14 bg-white rounded-md shadow-sm font-semibold text-gray-800 transition-all duration-100 ease-in-out transform';

  return (
    // Główny kontener klawiatury
    <div className="mx-auto w-full max-w-3xl rounded-lg bg-gray-200 p-2 shadow-inner">
      <div className="flex select-none flex-col gap-2">
        {/* Pierwszy rząd (QWERTY...) + Backspace */}
        <div className="flex w-full gap-2">
          {keyRows[0].map((key) => (
            <div key={key} data-key={key} className={`${keyClasses} flex-1`}>
              {key}
            </div>
          ))}
          <div data-key="Backspace" className={`${keyClasses} flex-grow-[1.5]`}>
            <BackspaceIcon />
          </div>
        </div>

        {/* Drugi rząd (ASDF...) + Enter */}
        <div className="flex w-full gap-2">
          <div className="w-[5%]"></div> {/* Pusty div dla wcięcia */}
          {keyRows[1].map((key) => (
            <div key={key} data-key={key} className={`${keyClasses} flex-1`}>
              {key}
            </div>
          ))}
          <div className="w-[5%]"></div> {/* Pusty div dla wcięcia */}
        </div>

        {/* Trzeci rząd (ZXCV...) + Shift */}
        <div className="flex w-full gap-2">
          <div className="w-[10%]"></div> {/* Pusty div dla wcięcia */}
          {keyRows[2].map((key) => (
            <div key={key} data-key={key} className={`${keyClasses} flex-1`}>
              {key}
            </div>
          ))}
          <div className="w-[10%]"></div> {/* Pusty div dla wcięcia */}
        </div>

        {/* Czwarty rząd (Spacja) */}
        <div className="flex w-full gap-2">
          <div data-key=" " className={`${keyClasses} flex-grow-[4]`}>
            Space
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
