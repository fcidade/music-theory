<script>
</script>

<button
	class="bg-sky-500 text-gray-700 text-sm font-bold rounded-2xl w-full py-3 mt-3 border-b-4 border-b-sky-600"
	on:click|preventDefault
	{...$$props}
>
	<slot />
</button>
