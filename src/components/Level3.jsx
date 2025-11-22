/** biome-ignore-all lint/correctness/useExhaustiveDependencies: use effect, use memo */
import { useEffect, useMemo, useState } from 'react';
import bk1Gif from '../assets/bk1.gif';
import bocianImg from '../assets/bocian.jpg';
import cc0Gif from '../assets/cc0.gif';
import cc1Gif from '../assets/cc1.gif';
import amznGif from '../assets/download.gif';
import icecreamGif from '../assets/icecream.gif';
import isanaImg from '../assets/isana.png';
import jet2Img from '../assets/jet2holidays.png';
import legoImg from '../assets/lego.jpg';
import newsletterImg from '../assets/newsletter.png';
import premiumImg from '../assets/premium.png';
import sbGif from '../assets/sb.gif';
import suImg from '../assets/su_sci.png';
import tnfGif from '../assets/tnf.gif';
import tymbarkImg from '../assets/tymbark.png';

export default function Level3({ complete }) {
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [fakeMoney] = useState(0);
  const [forcedInterstitial, setForcedInterstitial] = useState(false);
  const BLOCK_TIME = 5;
  const APPEAR_INTERVAL = 100_00;
  const [timedBlockingPopup, setTimedBlockingPopup] = useState(false);
  const [countdown, setCountdown] = useState(BLOCK_TIME);
  const [disableAdvertisement, setDisableAdvertisement] = useState(false);

  const articleParagraphs = [
    'W ostatniej dekadzie internet stał się dominującym źródłem wiedzy, rozrywki, edukacji, a nawet wsparcia psychologicznego. Jednocześnie narasta zjawisko cyfrowego wykluczenia finansowego, które dotyka użytkowników niezdolnych do opłacenia płatnych subskrypcji, pakietów premium czy dostępu do treści pozbawionych reklam. Dla wielu osób nie jest to tylko niewygoda - to systematyczne ograniczanie ich zdolności do pełnego uczestnictwa w kulturze cyfrowej.',
    'Jednym z najbardziej widocznych przejawów tej bariery są natarczywe reklamy, pop-upy i blokady, które pojawiają się w trakcie korzystania z produktów w wersji darmowej. W przeciwieństwie do modelu premium, gdzie treść jest płynna i nieprzerwana, użytkownicy bez płatnego dostępu muszą radzić sobie z serią eskalujących przerw, okienek i komunikatów. Reklamy te nie są jedynie dodatkowymi elementami wizualnymi - stają się integralną częścią doświadczenia, często odbieraną jako przeszkoda projektowana celowo w taki sposób, aby skłonić użytkownika do zakupu.',
    'Badania nad ekonomią uwagi potwierdzają, że częste przerwy w przetwarzaniu informacji mają bezpośredni wpływ na obniżenie zdolności zapamiętywania i rozumienia tekstu. Użytkownik, którego proces poznawczy jest przerywany co kilkanaście sekund, częściej doświadcza frustracji, zmęczenia i rezygnacji z dalszego czytania. Wersje darmowe stron bywają więc nie tylko mniej wygodne - mogą realnie obniżać efektywność czytania i dostęp do wiedzy.',
    'Bariera finansowa ma także wymiar psychologiczny. Dla wielu osób komunikaty typu „wykup premium, aby uniknąć reklam” nie są neutralne - przypominają o braku środków i wywołują poczucie wstydu lub gorszej pozycji społecznej. Użytkownik, który wie, że inni mogą pozwolić sobie na wygodniejszą wersję tej samej usługi, doświadcza subtelnego, ale realnego poczucia wykluczenia.',
    'Zjawisko to ma swoje konsekwencje również na poziomie społecznym. Coraz częściej wartościowa, rzetelna informacja znajduje się za paywallem, podczas gdy treści niskiej jakości są darmowe, choć pełne reklam i manipulacji. W efekcie osoby o niższym statusie materialnym mają trudniejszy dostęp do wysokopoziomowej wiedzy, co pogłębia istniejące nierówności edukacyjne i informacyjne.',
    'Problem barier finansowych nie dotyczy wyłącznie edukacji czy rozrywki - obejmuje także aplikacje zdrowotne, narzędzia wspierające naukę oraz usługi komunikacyjne. Brak subskrypcji może oznaczać nie tylko uciążliwości, ale również brak dostępu do pełnej funkcjonalności, co w skrajnych przypadkach może wpływać na jakość życia.',
    'W obliczu tych wyzwań kluczowe staje się projektowanie alternatywnych modeli dostępu, programów wsparcia oraz mechanizmów zapewniających minimalny poziom użyteczności nawet w wersjach darmowych. Internet powinien pozostać przestrzenią równych szans, a nie platformą, która dodatkowo pogłębia istniejące podziały społeczne.',
  ];

  const ads = [
    {
      title: 'Najlepszy produkt do skóry!',
      description:
        'NOWOŚĆ!!! Najnowsze badania potwierdzają, że nasz produkt ISANA jest najlepszym kosmetykiem na rynku. Kup i przekonaj się na własnej skórze. Tylko dla czytelników tej strony - zniżka -15% z kodem: "UŻYWAJmniejREKLAM".',
      image: isanaImg,
    },
    {
      title: 'SCI złotą szkoła kolejny rok z rzędu',
      description:
        'Po raz kolejny pierwsze miejsce w rankingach krajowych. Dla nauczycieli i uczniów nie jest to żadne zaskoczenie - ta szkoła z tego słynie od lat. Dzięki wielkiej pracy nauczycieli oraz dyrekcji, pierwsze miejsca we wszystkich konkursach są w zasięgu ręki. Szukasz szkoły do której masz pójść? Wybór jest prosty! SCI to nie tylko wybór szkoły po ktorej masz zawód, ale też szkoła podnosząca twoje umiejętności w każdym aspekcie.',
      image: suImg,
    },
    {
      title: 'Tymbark - polski producent napojów smakowych',
      description:
        'Wielka promocja! Nigdzie indziej nie znajdziesz tak korzystnej oferty! Kup 3 Tymbarki 2L, a zapłać tylko za 1! 3 w cenie 1 to promocja nie do znalezienia w innych sklepach.',
      image: tymbarkImg,
    },
    {
      title: 'Lego czyli klocki znane od pokoleń',
      description:
        'Szukasz prezentu dla chłopaka? A może dla Ojca? Kolegi? A może dla siebie? Lego to idealna oferta. Kup już dziś i przekonaj się o atrakcyjności tych znanych od lat klocków.',
      image: legoImg,
    },
    {
      title: 'JET2HOLIDAYS',
      description:
        'Nothing beats odrzutowiec2wakacje! And right now you can save up to 50 pounds!!! Its 200 pounds of for a family of four!',
      image: jet2Img,
    },
  ];

  const gifs = [tnfGif, bk1Gif, cc0Gif, cc1Gif, icecreamGif, sbGif, amznGif];

  const adSlots = useMemo(() => {
    const n = 10;
    return Array.from({ length: n }, () =>
      Math.floor(Math.random() * ads.length),
    );
  }, []);

  const getAdForSlot = (slotIndex) => ads[adSlots[slotIndex] % ads.length];

  useEffect(() => {
    if (disableAdvertisement) return;
    if (!timedBlockingPopup) return;
    setCountdown(BLOCK_TIME);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timedBlockingPopup, disableAdvertisement]);

  useEffect(() => {
    if (disableAdvertisement) return;
    if (timedBlockingPopup) return;
    const timer = setTimeout(() => {
      setTimedBlockingPopup(true);
    }, APPEAR_INTERVAL);
    return () => clearTimeout(timer);
  }, [timedBlockingPopup, disableAdvertisement]);

  useEffect(() => {
    const blocked =
      timedBlockingPopup ||
      forcedInterstitial ||
      showPremiumPopup ||
      cutsceneIndex > 0;
    document.body.style.overflow = blocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [timedBlockingPopup, forcedInterstitial, showPremiumPopup]);

  const closeAd = () => setForcedInterstitial(true);
  const handlePremiumClick = () => setShowPremiumPopup(true);
  const [randomGif, setRandomGif] = useState(null);

  useEffect(() => {
    if (!timedBlockingPopup) return;
    const index = Math.floor(Math.random() * gifs.length);
    setRandomGif(gifs[index]);
  }, [timedBlockingPopup]);

  const [cutsceneIndex, setCutsceneIndex] = useState(0);

  useEffect(() => {
    if (cutsceneIndex > 0 && cutsceneIndex <= 5) {
      const timer = setTimeout(() => setCutsceneIndex(cutsceneIndex + 1), 4000);
      return () => clearTimeout(timer);
    }
    if (cutsceneIndex === 6) {
      complete();
    }
  }, [cutsceneIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableAdvertisement(true);
    setCutsceneIndex(1);
  };

  const cutsceneText = {
    1: 'Zapisałeś się na darmowy okres próbny aby usunąć reklamy...',
    2: 'Niestety zapomniałeś anulować subskrybcji i co miesiąc z konta pobiera Ci kwotę 39,99 zł...',
    3: 'Kiedy się zorientowałeś, straciłeś już bardzo duże pieniądze...',
    4: 'Czy naprawdę do DARMOWEGO okresu próbnego potrzebna jest informacja o karcie kredytowej?',
    5: 'Gratululacje - przechodzisz do następnego poziomu.',
  };

  return (
    <div className="relative bg-white p-6 pt-20 font-sans text-gray-900">
      <div className="fixed top-20 right-0 left-0 z-50">
        <div className="w-full animate-pulse select-none bg-yellow-400 px-4 py-2 text-center font-bold text-black">
          TOP PROMO: Kup premium, żeby uniknąć natrętnych reklam! ✨
        </div>
      </div>

      <aside className="fixed top-20 right-4 z-40 hidden w-48 flex-col gap-4 lg:flex">
        <div className="animate-bounce rounded border bg-white p-2 shadow-lg">
          <img
            src={premiumImg}
            alt="kup premium"
            className="h-28 w-full rounded object-cover"
          />
          <div className="mt-2 text-xs">
            <p>Kup premium i usuń reklamy na miesiąc!</p>
            <p>Jedynie 39,99 zł</p>
          </div>
        </div>
        <div className="rounded border bg-white p-2 shadow-lg">
          <img
            src={bocianImg}
            alt="pozyczki bociana"
            className="h-28 w-full rounded object-cover"
          />
          <div className="mt-2 text-xs">
            <p>Nie masz pieniędzy na zakup wersji premium?</p>
            <p>Weź chwilówkę i ciesz się stroną bez reklam</p>
          </div>
        </div>
        <div className="animate-pulse rounded border bg-white p-2 shadow-lg">
          <img
            src={newsletterImg}
            alt="newsletter"
            className="h-28 w-full rounded object-cover"
          />
          <div className="mt-2 text-xs">
            Zapisz się i nie przegap nowych artykułów
          </div>
        </div>
      </aside>

      <div className="-translate-x-1/2 fixed bottom-4 left-1/2 z-50 transform">
        <div className="flex items-center gap-4 rounded-lg bg-black px-4 py-2 text-white shadow-lg">
          <div className="text-sm">Darmowa treść wspierana przez reklamy</div>
          <button
            type="button"
            className="rounded bg-white px-3 py-1 text-black"
            onClick={() => setShowPremiumPopup(true)}
          >
            Kliknij żeby zobaczyć ofertę
          </button>
        </div>
      </div>

      <header className="mx-auto max-w-4xl pt-12">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-2xl">
            Bariera finansowa w dostępie do treści
          </h1>
          <button
            type="button"
            onClick={handlePremiumClick}
            className="ml-4 rounded bg-gray-900 px-3 py-1 text-white hover:opacity-90"
          >
            Wykup premium żeby usunąć reklamy
          </button>
        </div>
      </header>

      <style>{`
          @keyframes neonChange {
            0% { color: #ff00ff; }
            20% { color: #00eaff; }
            40% { color: #00ff6a; }
            60% { color: #ffea00; }
            80% { color: #ff0080; }
            100% { color: #00ffcc; }
          }
          .flash {
            animation: neonChange 0.25s infinite;
          }
          .d1 { animation-delay: 0s; }
          .d2 { animation-delay: 0.05s; }
          .d3 { animation-delay: 0.1s; }
          .d4 { animation-delay: 0.15s; }
          .d5 { animation-delay: 0.2s; }
          .d6 { animation-delay: 0.25s; }
          .d7 { animation-delay: 0.3s; }
        `}</style>

      <div className="fixed flex flex-col font-bold text-7xl leading-tight">
        <span className="flash d1">R</span>
        <span className="flash d2">E</span>
        <span className="flash d3">K</span>
        <span className="flash d4">L</span>
        <span className="flash d5">A</span>
        <span className="flash d6">M</span>
        <span className="flash d7">A</span>
      </div>

      <main className="mx-auto mt-6 max-w-3xl">
        {showPremiumPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[350px] rounded-lg bg-white p-6 text-center">
              <h2 className="mb-2 font-semibold text-xl">Zakup premium</h2>
              <b>Cena miesięcznej subskrybcji: 39,99 zł</b>
              <p>Saldo konta: {fakeMoney} zł</p>
              <p className="text-red-500">Brak środków na koncie</p>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPremiumPopup(false)}
                  className="rounded border px-3 py-1"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        )}

        {forcedInterstitial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-6">
            <div className="max-w-xl text-center">
              <h2 className="mb-2 font-bold text-2xl">
                Dzięki reklamom oglądasz za darmo
              </h2>
              <p className="mb-4">
                Ta treść jest dostępna za darmo dzięki reklamom. Wersja premium
                usuwa takie blokady. Kup już teraz i pozbąć się denerwujących
                reklam!
              </p>
              <img
                src={premiumImg}
                alt="big ad"
                className="mx-auto mb-4 h-96 rounded shadow"
              />
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setForcedInterstitial(false)}
                  className="rounded bg-black px-4 py-2 text-white"
                >
                  Zamknij reklamę
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForcedInterstitial(false);
                    setShowPremiumPopup(true);
                  }}
                  className="rounded border px-4 py-2"
                >
                  Zobacz ofertę premium
                </button>
              </div>
            </div>
          </div>
        )}

        {timedBlockingPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-6 text-white">
            <div className="max-w-lg text-center">
              <h2 className="mb-2 font-bold text-xl">
                Ta wersja strony wymusza przerwy na reklamy
              </h2>
              {randomGif && (
                <img className="m-auto" src={randomGif} alt="reklama" />
              )}
              <p className="mb-4">
                Możesz zamknąć to okno za <strong>{countdown}</strong> s
              </p>
              {countdown === 0 ? (
                <button
                  type="button"
                  onClick={() => setTimedBlockingPopup(false)}
                  className="rounded bg-white px-4 py-2 font-bold text-black"
                >
                  Zamknij
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        )}

        <article className="mt-6 space-y-10">
          {articleParagraphs.map((p, i) => {
            const ad = getAdForSlot(i);
            return (
              <section key={p} className="prose max-w-none">
                <p className="text-lg leading-7">{p}</p>

                <div className="relative my-4 rounded border border-gray-200 bg-gray-50 p-3">
                  <strong>Reklama</strong>
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="m-auto h-64 rounded object-cover"
                  />
                  <div className="m-auto mt-2 flex w-96 items-center gap-4 rounded border bg-white p-3">
                    <div>
                      <strong>{ad.title}</strong>
                      <div className="text-sm">{ad.description}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeAd}
                    aria-label="close ad"
                    className="absolute top-2 right-2 text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              </section>
            );
          })}
        </article>

        <div className="relative mb-16">
          <form className="space-y-4 border-t pt-4" onSubmit={handleSubmit}>
            <h3 className="font-semibold text-gray-800 text-lg">
              Wpisz (przykładowe) dane karty kredytowej aby otrzymać darmowy
              okres próbny wersji premium (i przejść dalej).
            </h3>

            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Name on Card
                <input
                  type="text"
                  placeholder="John Doe"
                  required={true}
                  className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
                  }}
                />
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Card Number
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  required={true}
                  className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  onInput={(e) => {
                    const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                    e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
                  }}
                />
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm">
                Expiration (MM/YY)
                <input
                  type="text"
                  placeholder="08/27"
                  inputMode="numeric"
                  required={true}
                  className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  onInput={(e) => {
                    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                    if (v.length >= 3) v = v.replace(/(\d{2})(\d+)/, '$1/$2');
                    e.target.value = v;
                  }}
                />
              </label>
            </div>

            <div>
              <label className="block font-medium text-gray-700 text-sm">
                CVV
                <input
                  type="text"
                  placeholder="123"
                  inputMode="numeric"
                  required={true}
                  className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 3);
                  }}
                />
              </label>
            </div>

            <input
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              disabled={cutsceneIndex > 0}
              type="submit"
              value={'Wykup darmową wersję premium'}
            />
          </form>

          {cutsceneIndex > 0 && cutsceneIndex <= 5 && (
            <div className="fixed inset-0 z-100 flex items-center justify-center bg-black p-10 text-center">
              <div
                className="animate-fadeUp text-4xl text-white opacity-0"
                style={{
                  animationFillMode: 'forwards',
                  animationDuration: '1s',
                }}
              >
                {cutsceneText[cutsceneIndex]}
              </div>
            </div>
          )}

          <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation-name: fadeUp; }
      `}</style>
        </div>
      </main>
    </div>
  );
}
