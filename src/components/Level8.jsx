import { useEffect, useRef, useState } from 'react';
import Person from '../assets/person.svg';

export default function Level8({ complete }) {
	const TARGET =
		'Jestem na hackathonie w SCI. Masz może jakiś pomysł, bo u mnie całkowita pustka?';
	const SPAWN_MIN = 3000;
	const SPAWN_MAX = 5000;

	const startRef = useRef(true);
	const [text, setText] = useState('');
	const [distractions, setDistractions] = useState([]);
	const [recent, setRecent] = useState([]);
	const [snoozeActive, setSnoozeActive] = useState(false);

	const spawnTimer = useRef(null);
	const inputRef = useRef(null);
	const nextId = useRef(1);
	const completeCalled = useRef(false);
	const mounted = useRef(true);

	useEffect(() => {
		mounted.current = true;
		scheduleSpawn();
		return () => {
			mounted.current = false;
			clearTimeout(spawnTimer.current);
		};
	}, [snoozeActive]);

	function pushRecent(txt) {
		setRecent((r) => [txt, ...r].slice(0, 12));
	}

	const msgs = [
		{ sender: 2, text: 'Cześć! Jak się masz?' },
		{ sender: 1, text: 'Hej! Wszystko dobrze, a u Ciebie?' },
		{ sender: 2, text: 'Też dobrze, dzięki!' },
		{ sender: 2, text: 'Słuchaj mam pytanko, masz chwilę?' },
		{ sender: 1, text: 'Jasne!' },
		{ sender: 2, text: 'Super, a więc tak:' },
	];

	function scheduleSpawn() {
		clearTimeout(spawnTimer.current);
		if (snoozeActive) return;

		let t;

		if (startRef.current) {
			t = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN) + 50000;
			startRef.current = false;
		} else {
			t = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
		}

		spawnTimer.current = setTimeout(() => {
			spawn();
			scheduleSpawn();
		}, t);
	}

	function spawn() {
		if (!mounted.current || snoozeActive) return;

		const id = nextId.current++;
		const d = {
			id,
			label: [
				'Discord: Masz minutkę?',
				'Messenger: Odpowiesz?',
				'Teams: Spotkanie za 5 min',
				'Instagram: Nowa wiadomość',
				'System: Aktualizacja dostępna',
				'SMS: Ważne info',
			][Math.floor(Math.random() * 6)],
			duration: 3000 + Math.random() * 2000,
		};

		setDistractions([d]);
		pushRecent(`Powiadomienie: ${d.label}`);
		stealFocus();

		setTimeout(() => {
			setDistractions((a) => a.filter((x) => x.id !== id));
		}, d.duration);
	}

	function stealFocus() {
		if (snoozeActive) return;
		const tmp = document.createElement('button');
		tmp.setAttribute('aria-hidden', 'true');
		tmp.style.position = 'fixed';
		tmp.style.left = '-9999px';
		document.body.appendChild(tmp);
		try {
			if (inputRef.current) inputRef.current.blur();
			tmp.focus();
		} catch {}
		setTimeout(() => {
			try {
				tmp.remove();
			} catch {}
		}, 200);
	}

	function dismissDistraction(id) {
		setDistractions((a) => a.filter((x) => x.id !== id));
		pushRecent('Powiadomienie usunięte');
	}

	function enablePermanentSnooze() {
		if (snoozeActive) return;
		setSnoozeActive(true);
		pushRecent('Powiadomienia wyciszone na stałe');
	}

	function handleSubmit(e) {
		e && e.preventDefault();
		if (text.trim() === TARGET) {
			pushRecent('Tekst poprawny — zadanie ukończone');
			if (typeof complete === 'function' && !completeCalled.current) {
				completeCalled.current = true;
				try {
					complete();
				} catch {}
			}
			return;
		}
		pushRecent('Niepoprawne — spróbuj ponownie');
		spawn();
	}

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	const progress = Math.round(
		(text.split('').filter((c, i) => i < TARGET.length && c === TARGET[i]).length /
			TARGET.length) *
			100
	);

	return (
		<div className='flex w-full py-20 text-center'>
			{/* Task panel */}
			<div className=' m-auto mt-4 w-[50%] rounded-xl border border-blue-100 bg-gradient-to-b from-white to-[#fcfeff] p-4'>
				<div className='mb-1 font-bold text-base text-gray-800'>
					Zadanie: Napisz wiadomość o dokładnej treści:
				</div>

				<div className='inline-block rounded-lg bg-gradient-to-r from-blue-50 to-white px-3 py-2 font-extrabold text-blue-600 text-lg shadow'>
					{TARGET}
				</div>
				<br />
				<br />
				<div className='mb-1 text-base text-gray-800'>
					{' '}
					Każde powiadomienie oznacza unfocus pola do pisania. Ma to sugerować
					rozpraszanie się. 
          <br />Gdy powiadomienia będą zbyt uporczywe możesz je wyciszyć, jednak
					postaraj się najpierw napisać z włączonymi, żeby zrozumieć z
					czym mierzą się osoby z zaburzeniami uwagi (np. ADHD).
				</div>

				{/* Snooze permanent */}
				<div className='mt-3'>
					<button
						type='button'
						onClick={enablePermanentSnooze}
						disabled={snoozeActive}
						className={`rounded-lg px-3 py-2 font-bold ${
							snoozeActive
								? 'cursor-not-allowed bg-gray-300 text-gray-600'
								: 'bg-yellow-300 text-yellow-900'
						}`}>
						{snoozeActive ? 'Wyciszone' : 'Wycisz powiadomienia'}
					</button>
				</div>

				{/* Progress */}
				<div className='mt-4'>
					<div className='text-gray-600 text-xs'>Postęp</div>
					<div className='mt-1 h-2 overflow-hidden rounded-full bg-blue-50'>
						<div
							style={{ width: `${progress}%` }}
							className='h-full bg-gradient-to-r from-green-300 to-blue-400'
						/>
					</div>
					<div className='mt-1 text-gray-700 text-xs'>{progress}% zgodności</div>
				</div>
			</div>
			<div className='relative m-auto my-4 flex max-w-fit gap-4 overflow-hidden rounded-xl bg-gradient-to-b from-white to-[#f6fbff] p-4 font-sans shadow-xl'>
				<style>{`
    				@keyframes slideDown {
    				  0% { opacity: 0; transform: translateY(-20px); }
    				  100% { opacity: 1; transform: translateY(0); }
    				}
    				.animate-slideDown { animation: slideDown 0.25s ease forwards; }
    			`}</style>

				{/* PHONE UI */}
				<div className='flex flex-1 flex-col w-[50%]'>
					<div className='flex h-[500px] w-[320px] flex-col rounded-xl border border-gray-300 bg-white shadow-sm'>
						{/* Header */}
						<div className='flex items-center border-gray-200 border-b p-2'>
							<img
								alt=''
								src={Person}
								className='mr-3 h-10 w-10 rounded-full'
							/>
							<strong>Anna</strong>
						</div>

						{/* Messages */}
						<div className='flex-1 overflow-y-auto p-3'>
							{msgs.map((m, i) => (
								<div
									key={i}
									className={`mb-2 ${
										m.sender === 1 ? 'text-left' : 'text-right'
									}`}>
									<div
										className={`inline-block rounded-2xl px-3 py-2 text-sm ${
											m.sender === 1
												? 'bg-gray-200 text-black'
												: 'bg-blue-600 text-white'
										}`}>
										{m.text}
									</div>
								</div>
							))}
						</div>

						{/* INPUT (TASK INPUT) */}
						<form
							onSubmit={handleSubmit}
							className='border-gray-200 border-t p-2'>
							<textarea
								ref={inputRef}
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder='Napisz wiadomość...'
								className='h-16 w-full resize-none rounded-lg border border-gray-300 p-2 text-sm'
							/>
							<button
								type='submit'
								className='mt-2 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white'>
								Wyślij
							</button>
						</form>
					</div>
				</div>

				{/* PHONE NOTIFICATIONS */}
				<div className='pointer-events-none absolute top-0 right-0 left-0 z-[80] flex flex-col gap-2 px-4 pt-4'>
					{distractions.map((d) => (
						<button
							type='button'
							key={d.id}
							className='pointer-events-auto flex animate-slideDown items-start gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-lg'
							onClick={() => dismissDistraction(d.id)}>
							<div className='text-xl'>🔔</div>
							<div className='text-sm'>{d.label}</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
