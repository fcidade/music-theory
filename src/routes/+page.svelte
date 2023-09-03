<script lang="ts">
	import { anyOf, except } from '$lib/random';
	import { intervalDictionary, notes } from '../lib/music';
	import { page } from '$app/stores';
	import { getWrapped } from '../lib/array';

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

<h1>Calculando intervalos</h1>

<p>Qual intervalo praticar?</p>
<select bind:value={intervalDistanceInSemitones}>
	{#each Object.entries(intervalDictionary) as [interval, name]}
		<option value={Number(interval)}>{name} ({interval} semitons)</option>
	{/each}
</select>
{#if debug}
	<p>(Debug) {intervalDistanceInSemitones}</p>
	<p>(Debug) Nota correta: {correctNote}</p>
{/if}

{intervalDistanceInSemitones} semitom(s)

<h1>{note}</h1>

{#each possibleAnswers as answer}
	<button on:click|preventDefault={() => check(answer)} disabled={state !== 'guessing'}
		>{answer}</button
	>
{/each}

<select bind:value={direction}>
	<option value="up">Crescente</option>
	<option value="down">Decrescente</option>
</select>

{#if state !== 'guessing'}
	<button on:click|preventDefault={nextQuestion}>Próximo</button>
{/if}

{#if state === 'right_answer'}
	<h1>Acertou! :)</h1>
{/if}

{#if state === 'wrong_answer'}
	<h1>Errou! :(</h1>
{/if}
