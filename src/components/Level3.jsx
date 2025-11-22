import React, { useEffect, useMemo, useState } from 'react';
import jet2Img from '../assets/jet2holidays.png';
import isanaImg from '../assets/isana.png';
import legoImg from '../assets/lego.jpg';
import suImg from '../assets/su_sci.png';
import tymbarkImg from '../assets/tymbark.png';
import premiumImg from '../assets/premium.png';
import tnfGif from '../assets/tnf.gif';
import bk1Gif from '../assets/bk1.gif';
import cc0Gif from '../assets/cc0.gif';
import cc1Gif from '../assets/cc1.gif';
import icecreamGif from '../assets/icecream.gif';
import sbGif from '../assets/sb.gif';
import amznGif from '../assets/download.gif';
import bocianImg from '../assets/bocian.jpg';
import newsletterImg from '../assets/newsletter.png';

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
		return Array.from({ length: n }, () => Math.floor(Math.random() * ads.length));
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
			timedBlockingPopup || forcedInterstitial || showPremiumPopup || cutsceneIndex > 0;
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
		if (cutsceneIndex == 6) {
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
		5: 'Gratululacje - przechodzisz do następnego poziomu.'
	};

	return (
		<div className='relative font-sans p-6 bg-white text-gray-900'>
			<div className='fixed top-0 left-0 right-0 z-50'>
				<div className='w-full py-2 px-4 bg-yellow-400 text-black text-center font-bold animate-pulse'>
					TOP PROMO: Kup premium, żeby uniknąć natrętnych reklam! ✨
				</div>
			</div>

			<aside className='hidden lg:flex flex-col gap-4 fixed right-4 top-20 z-40 w-48'>
				<div className='border p-2 rounded shadow-lg bg-white animate-bounce'>
					<img
						src={premiumImg}
						alt='kup premium'
						className='w-full h-28 object-cover rounded'
					/>
					<div className='text-xs mt-2'>
						<p>Kup premium i usuń reklamy na miesiąc!</p>
						<p>Jedynie 39,99 zł</p>
					</div>
				</div>
				<div className='border p-2 rounded shadow-lg bg-white'>
					<img
						src={bocianImg}
						alt='pozyczki bociana'
						className='w-full h-28 object-cover rounded'
					/>
					<div className='text-xs mt-2'>
						<p>Nie masz pieniędzy na zakup wersji premium?</p>
						<p>Weź chwilówkę i ciesz się stroną bez reklam</p>
					</div>
				</div>
				<div className='border p-2 rounded shadow-lg bg-white animate-pulse'>
					<img
						src={newsletterImg}
						alt='newsletter'
						className='w-full h-28 object-cover rounded'
					/>
					<div className='text-xs mt-2'>Zapisz się i nie przegap nowych artykułów</div>
				</div>
			</aside>

			<div className='fixed left-1/2 transform -translate-x-1/2 bottom-4 z-50'>
				<div className='flex items-center gap-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg'>
					<div className='text-sm'>Darmowa treść wspierana przez reklamy</div>
					<button
						className='px-3 py-1 bg-white text-black rounded'
						onClick={() => setShowPremiumPopup(true)}>
						Kliknij żeby zobaczyć ofertę
					</button>
				</div>
			</div>

			<header className='max-w-4xl mx-auto pt-12'>
				<div className='flex items-center gap-4'>
					<h1 className='text-2xl font-bold'>Bariera finansowa w dostępie do treści</h1>
					<button
						onClick={handlePremiumClick}
						className='ml-4 px-3 py-1 text-white bg-gray-900 rounded hover:opacity-90'>
						Wykup premium żeby usunąć reklamy
					</button>
				</div>
			</header>

			<>
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

				<div className='text-7xl font-bold leading-tight flex flex-col fixed'>
					<span className='flash d1'>R</span>
					<span className='flash d2'>E</span>
					<span className='flash d3'>K</span>
					<span className='flash d4'>L</span>
					<span className='flash d5'>A</span>
					<span className='flash d6'>M</span>
					<span className='flash d7'>A</span>
				</div>
			</>

			<main className='max-w-3xl mx-auto mt-6'>
				{showPremiumPopup && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
						<div className='bg-white rounded-lg p-6 w-[350px] text-center'>
							<h2 className='text-xl font-semibold mb-2'>Zakup premium</h2>
							<b>Cena miesięcznej subskrybcji: 39,99 zł</b>
							<p>Saldo konta: {fakeMoney} zł</p>
							<p className='text-red-500'>Brak środków na koncie</p>
							<div className='mt-4 flex justify-center gap-2'>
								<button
									onClick={() => setShowPremiumPopup(false)}
									className='px-3 py-1 border rounded'>
									Zamknij
								</button>
							</div>
						</div>
					</div>
				)}

				{forcedInterstitial && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-6'>
						<div className='max-w-xl text-center'>
							<h2 className='text-2xl font-bold mb-2'>
								Dzięki reklamom oglądasz za darmo
							</h2>
							<p className='mb-4'>
								Ta treść jest dostępna za darmo dzięki reklamom. Wersja premium
								usuwa takie blokady. Kup już teraz i pozbąć się denerwujących
								reklam!
							</p>
							<img
								src={premiumImg}
								alt='big ad'
								className='mx-auto rounded shadow mb-4 h-96'
							/>
							<div className='flex justify-center gap-3'>
								<button
									onClick={() => setForcedInterstitial(false)}
									className='px-4 py-2 bg-black text-white rounded'>
									Zamknij reklamę
								</button>
								<button
									onClick={() => {
										setForcedInterstitial(false);
										setShowPremiumPopup(true);
									}}
									className='px-4 py-2 border rounded'>
									Zobacz ofertę premium
								</button>
							</div>
						</div>
					</div>
				)}

				{timedBlockingPopup && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 text-white p-6'>
						<div className='max-w-lg text-center'>
							<h2 className='text-xl font-bold mb-2'>
								Ta wersja strony wymusza przerwy na reklamy
							</h2>
							{randomGif && (
								<img
									className='m-auto'
									src={randomGif}
									alt='reklama'
								/>
							)}
							<p className='mb-4'>
								Możesz zamknąć to okno za <strong>{countdown}</strong> s
							</p>
							{countdown === 0 ? (
								<button
									onClick={() => setTimedBlockingPopup(false)}
									className='px-4 py-2 bg-white text-black rounded font-bold'>
									Zamknij
								</button>
							) : (
								<></>
							)}
						</div>
					</div>
				)}

				<article className='mt-6 space-y-10'>
					{articleParagraphs.map((p, i) => {
						const ad = getAdForSlot(i);
						return (
							<section
								key={i}
								className='prose max-w-none'>
								<p className='text-lg leading-7'>{p}</p>

								<div className='bg-gray-50 border border-gray-200 p-3 my-4 relative rounded'>
									<strong>Reklama</strong>
									<img
										src={ad.image}
										alt={ad.title}
										className='h-64 object-cover rounded m-auto'
									/>
									<div className='flex items-center w-96 gap-4 p-3 m-auto mt-2 bg-white border rounded '>
										<div>
											<strong>{ad.title}</strong>
											<div className='text-sm'>{ad.description}</div>
										</div>
									</div>

									<button
										onClick={closeAd}
										aria-label='close ad'
										className='absolute top-2 right-2 text-gray-400 hover:text-black'>
										✕
									</button>
								</div>
							</section>
						);
					})}
				</article>

				<div className='relative mb-16'>
					<form
						className='space-y-4 border-t pt-4'
						onSubmit={handleSubmit}>
						<h3 className='text-lg font-semibold text-gray-800'>Wpisz (przykładowe) dane karty kredytowej aby otrzymać darmowy okres próbny wersji premium (i przejść dalej).</h3>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Name on Card
							</label>
							<input
								type='text'
								placeholder='John Doe'
								required
								className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300'
								onInput={(e) => {
									e.target.value = e.target.value.replace(/[^a-zA-Z ]/g, '');
								}}
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Card Number
							</label>
							<input
								type='text'
								placeholder='1234 5678 9012 3456'
								inputMode='numeric'
								required
								className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300'
								onInput={(e) => {
									let v = e.target.value.replace(/\D/g, '').slice(0, 16);
									e.target.value = v.replace(/(.{4})/g, '$1 ').trim();
								}}
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Expiration (MM/YY)
							</label>
							<input
								type='text'
								placeholder='08/27'
								inputMode='numeric'
								required
								className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300'
								onInput={(e) => {
									let v = e.target.value.replace(/\D/g, '').slice(0, 4);
									if (v.length >= 3) v = v.replace(/(\d{2})(\d+)/, '$1/$2');
									e.target.value = v;
								}}
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>CVV</label>
							<input
								type='text'
								placeholder='123'
								inputMode='numeric'
								required
								className='w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300'
								onInput={(e) => {
									e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
								}}
							/>
						</div>

						<input
							className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition'
							disabled={cutsceneIndex > 0}
							type='submit'
							value={'submit'}
						/>
					</form>

					{cutsceneIndex > 0 && cutsceneIndex <= 5 && (
						<div className='fixed inset-0 bg-black flex items-center justify-center z-100 p-10 text-center'>
							<div
								className='text-white text-4xl opacity-0 animate-fadeUp'
								style={{ animationFillMode: 'forwards', animationDuration: '1s' }}>
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
