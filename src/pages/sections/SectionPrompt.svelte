<script lang="ts">
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	export let stylePrompts: boolean = false;

	export let prompt = '',
		negativePrompt = '';

	export let stylePrompt = '',
		negativeStylePrompt = '';
</script>

<div>
	{#if stylePrompts}
		<Textarea placeholder="Prompt" bind:value={prompt} class="mb-2 font-mono" />
		<Textarea placeholder="Style Prompt" bind:value={stylePrompt} class="mb-2 font-mono" />
		<Textarea placeholder="Negative Prompt" bind:value={negativePrompt} class="mb-2 font-mono" />
		<Textarea
			placeholder="Negative Style Prompt"
			bind:value={negativeStylePrompt}
			class="font-mono"
		/>
	{:else}
		<Textarea placeholder="Prompt" bind:value={prompt} class="mb-2 font-mono" />
		<Textarea placeholder="Negative Prompt" bind:value={negativePrompt} class="mb-2 font-mono" />
	{/if}
</div>
