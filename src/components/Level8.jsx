import React, { useEffect, useRef, useState } from 'react';
import Person from '../assets/person.svg';

export default function Level8({ complete }) {
	const TARGET =
		'Jestem na hackathonie w SCI. Masz może jakiś pomysł, bo u mnie całkowita pustka?';
	const SPAWN_MIN = 1500;
	const SPAWN_MAX = 3000;

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
		<div className='w-full text-center'>
			{/* Task panel */}
			<div className='mt-4 p-4 w-[50%] m-auto rounded-xl bg-gradient-to-b from-white to-[#fcfeff] border border-blue-100'>
				<div className='text-base font-bold text-gray-800 mb-1'>
					Zadanie: Napisz wiadomość o dokładnej treści:
				</div>

				<div className='text-blue-600 font-extrabold text-lg bg-gradient-to-r from-blue-50 to-white inline-block px-3 py-2 rounded-lg shadow'>
					{TARGET}
				</div>
				<br />
				<br />
				<div className='text-base text-gray-800 mb-1'>
					Gdy powiadomienia będą zbyt ciężkie możesz je wyciszyć, jednak postaraj się
					najpierw napisać z włączonymi powiadomieniami, żeby zrozumieć z czym mierzą się
					osoby z zaburzeniami uwagi (np. ADHD).
				</div>

				{/* Snooze permanent */}
				<div className='mt-3'>
					<button
						onClick={enablePermanentSnooze}
						disabled={snoozeActive}
						className={`px-3 py-2 rounded-lg font-bold ${
							snoozeActive
								? 'bg-gray-300 text-gray-600 cursor-not-allowed'
								: 'bg-yellow-300 text-yellow-900'
						}`}>
						{snoozeActive ? 'Wyciszone' : 'Wycisz powiadomienia'}
					</button>
				</div>

				{/* Progress */}
				<div className='mt-4'>
					<div className='text-xs text-gray-600'>Postęp</div>
					<div className='h-2 bg-blue-50 rounded-full overflow-hidden mt-1'>
						<div
							style={{ width: `${progress}%` }}
							className='h-full bg-gradient-to-r from-green-300 to-blue-400'
						/>
					</div>
					<div className='text-xs text-gray-700 mt-1'>{progress}% zgodności</div>
				</div>
			</div>
			<div className='font-sans max-w-fit m-auto my-4 p-4 rounded-xl bg-gradient-to-b from-white to-[#f6fbff] shadow-xl relative overflow-hidden flex gap-4'>
				<style>{`
    				@keyframes slideDown {
    				  0% { opacity: 0; transform: translateY(-20px); }
    				  100% { opacity: 1; transform: translateY(0); }
    				}
    				.animate-slideDown { animation: slideDown 0.25s ease forwards; }
    			`}</style>

				{/* PHONE UI */}
				<div className='flex-1 flex flex-col'>
					<div className='w-[320px] border border-gray-300 rounded-xl flex flex-col h-[500px] bg-white shadow-sm'>
						{/* Header */}
						<div className='flex items-center p-2 border-b border-gray-200'>
							<img
								src={Person}
								className='w-10 h-10 rounded-full mr-3'
							/>
							<strong>Anna</strong>
						</div>

						{/* Messages */}
						<div className='flex-1 p-3 overflow-y-auto'>
							{msgs.map((m, i) => (
								<div
									key={i}
									className={`mb-2 ${
										m.sender === 1 ? 'text-left' : 'text-right'
									}`}>
									<div
										className={`inline-block px-3 py-2 rounded-2xl text-sm ${
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
							className='p-2 border-t border-gray-200'>
							<textarea
								ref={inputRef}
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder='Napisz wiadomość...'
								className='w-full h-16 p-2 rounded-lg border border-gray-300 text-sm resize-none'
							/>
							<button
								type='submit'
								className='mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold'>
								Wyślij
							</button>
						</form>
					</div>
				</div>

				{/* PHONE NOTIFICATIONS */}
				<div className='absolute top-0 left-0 right-0 flex flex-col gap-2 z-[80] px-4 pt-4 pointer-events-none'>
					{distractions.map((d) => (
						<div
							key={d.id}
							className='pointer-events-auto bg-white shadow-lg rounded-xl border border-gray-200 px-3 py-2 flex items-start gap-3 animate-slideDown'
							onClick={() => dismissDistraction(d.id)}>
							<div className='text-xl'>🔔</div>
							<div className='text-sm'>{d.label}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
