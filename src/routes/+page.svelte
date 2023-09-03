<script lang="ts">
	import { anyOf, except } from '$lib/random';
	import { intervalDictionary, notes } from '../lib/music';
	import { page } from '$app/stores';
	import { getWrapped } from '../lib/array';
	import Button from '$lib/components/Button.svelte';

	const debug = $page.url.searchParams.get('debug') === '1';

	let note = anyOf(notes);
	let intervalDistanceInSemitones: number = 1;

	let state: 'guessing' | 'right_answer' | 'wrong_answer' = 'guessing';
	let direction: 'up' | 'down' = 'up';

	$: directionAsNumber = direction === 'up' ? 1 : -1;
	$: correctNote = getWrapped(
		notes,
		notes.indexOf(note) + intervalDistanceInSemitones * directionAsNumber
	);
	// TODO! Embaralhar!!!!
	$: possibleAnswers = [anyOf(except(notes, note, correctNote)), correctNote];

	const check = (guess: string) => {
		if (guess === correctNote) {
			state = 'right_answer';
		} else {
			state = 'wrong_answer';
		}
	};

	const nextQuestion = () => {
		note = anyOf(notes);
		state = 'guessing';
	};
</script>

<div class="bg-white h-screen flex items-center justify-center p-4">
	<div class="border-2 border-gray-300 rounded-2xl p-5 h-full flex flex-col justify-between">
		<h1 class="text-4xl font-bold text-gray-700">Calculando intervalos</h1>
		<div class="flex justify-between flex-col h-full">
			<div>
				<p class="text-2xl font-bold text-gray-700">Qual intervalo praticar?</p>
				<select
					class="border-2 border-gray-300 rounded p-1 my-2"
					bind:value={intervalDistanceInSemitones}
				>
					{#each Object.entries(intervalDictionary) as [interval, name]}
						<option value={Number(interval)}>{name} ({interval} semitons)</option>
					{/each}
				</select>

				<select class="border-2 border-gray-300 rounded p-1" bind:value={direction}>
					<option value="up">Crescente</option>
					<option value="down">Decrescente</option>
				</select>
			</div>

			<div class="text-7xl font-bold text-gray-700 text-center">{note}</div>
			<div class="h-40">
				<div>
					{#if state === 'guessing'}
						{#each possibleAnswers as answer}
							<Button on:click={() => check(answer)} disabled={state !== 'guessing'}
								>{answer}</Button
							>
						{/each}
					{/if}
				</div>

				{#if state !== 'guessing'}
					<!-- TODO: Better colors -->
					{#if state === 'right_answer'}
						<h1 class="text-2xl font-bold text-emerald-500">
							Correto! A resposta certa é: {correctNote}
						</h1>
					{/if}

					{#if state === 'wrong_answer'}
						<h1 class="text-2xl font-bold text-rose-500">
							Errado! A resposta certa é: {correctNote}
						</h1>
					{/if}
					<Button on:click={nextQuestion}>Próximo</Button>
				{/if}
			</div>
		</div>

		{#if debug}
			<p>(Debug) {intervalDistanceInSemitones}</p>
			<p>(Debug) Nota correta: {correctNote}</p>
		{/if}
	</div>
</div>
