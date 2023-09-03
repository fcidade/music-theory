<script lang="ts">
	import { anyOf, shuffle } from '$lib/random';
	import {
		intervalDictionary,
		notes,
		type Note,
		type AccidentDisplay,
		formatNote
	} from '../lib/music';
	import { page } from '$app/stores';
	import { except, getWrapped } from '../lib/array';
	import Button from '$lib/components/Button.svelte';

	const debug = $page.url.searchParams.get('debug') === '1';

	let note: Note = anyOf(notes);
	let intervalDistanceInSemitones: number = 1;

	let state: 'guessing' | 'right_answer' | 'wrong_answer' = 'guessing';
	let direction: 'up' | 'down' = 'up';
	let accidentDisplay: AccidentDisplay = 'both';

	let timesGuessedRight = 0;
	let timesGuessedWrong = 0;

	$: directionAsNumber = direction === 'up' ? 1 : -1;
	$: correctNote = getWrapped(
		notes,
		notes.indexOf(note) + intervalDistanceInSemitones * directionAsNumber
	);
	$: possibleAnswers = shuffle([anyOf(except(notes, note, correctNote)), correctNote]);
	$: displayNote = formatNote(note, { accidentDisplay });

	const check = (guess: string) => {
		if (guess === correctNote) {
			state = 'right_answer';
			timesGuessedRight++;
		} else {
			state = 'wrong_answer';
			timesGuessedWrong++;
		}
	};

	const nextQuestion = () => {
		note = anyOf(except(notes, correctNote));
		state = 'guessing';
	};
</script>

<div class="bg-white h-screen flex items-center justify-center p-4">
	<div class="border-2 border-gray-300 rounded-2xl p-5 h-full flex flex-col justify-between">
		<h1 class="text-4xl font-bold text-gray-700">Calculando intervalos</h1>
		<div class="flex justify-between flex-col h-full">
			<div>
				<p class="text-2xl font-bold text-gray-700">Qual intervalo praticar?</p>
				<!-- // TODO: Make component -->
				<select
					class="border-2 border-gray-300 rounded p-1 my-2"
					bind:value={intervalDistanceInSemitones}
				>
					{#each Object.entries(intervalDictionary) as [interval, name]}
						<option value={Number(interval)}>{name} ({interval} semitons)</option>
					{/each}
				</select>

				<select class="border-2 border-gray-300 rounded p-1 mb-2" bind:value={direction}>
					<option value="up">Crescente</option>
					<option value="down">Decrescente</option>
				</select>

				<select class="border-2 border-gray-300 rounded p-1" bind:value={accidentDisplay}>
					<option value="both">Ambos (♭/♯)</option>
					<option value="flat_only">Apenas Bemol (♭)</option>
					<option value="sharp_only">Apenas Sustenido (♯)</option>
					<option value="random">Aleatórios (♭/♯)</option>
				</select>
			</div>

			<div class="text-7xl font-bold text-gray-700 text-center">{displayNote}</div>
			<div class="h-40">
				{#if state === 'guessing'}
					<div>
						<!-- TODO: Botão gordo, pra ficar mais facil de clicar! -->
						{#each possibleAnswers as answer}
							<Button on:click={() => check(answer)} disabled={state !== 'guessing'}
								>{formatNote(answer, { accidentDisplay })}</Button
							>
						{/each}
					</div>
				{/if}

				{#if state !== 'guessing'}
					{#if state === 'right_answer'}
						<h1 class="text-2xl font-bold text-emerald-500">
							Correto! A resposta certa é: {formatNote(correctNote, { accidentDisplay })}
						</h1>
					{/if}

					{#if state === 'wrong_answer'}
						<h1 class="text-2xl font-bold text-rose-500">
							Errado! A resposta certa é: {formatNote(correctNote, { accidentDisplay })}
						</h1>
					{/if}
					<Button on:click={nextQuestion}>Próximo</Button>
				{/if}
			</div>
		</div>
		<div class="flex justify-between">
			<div class="text-1xl font-bold text-emerald-500">Acertos: {timesGuessedRight}</div>
			<div class="text-1xl font-bold text-rose-500 text-right">Erros: {timesGuessedWrong}</div>
		</div>

		{#if debug}
			<p>(Debug) Intervalo: {intervalDistanceInSemitones}</p>
			<p>(Debug) Nota correta: {correctNote}</p>
		{/if}
	</div>
</div>
