<script lang="ts">
	import { Button } from '$ui/button';
	import { X as IconClose } from 'lucide-svelte';

	let className = 'top-32 left-48 bottom-32 right-48 bg-primary';

	export let title: string;
	export let open: boolean = false;
	export { className as class };
</script>

{#if open}
	<!-- Blur the background -->
	<div
		class="absolute bottom-0 left-0 right-0 top-0 z-30 backdrop-blur"
		role="none"
		on:click={() => {
			open = false;
		}}
	></div>
{/if}

<div
	class="absolute z-40 rounded-xl border transition-all duration-200 {className} {open
		? 'scale-100 opacity-100'
		: 'scale-0 opacity-0'}"
>
	<!-- Header -->
	<div role="none" class="inline-block w-full p-2 pl-4">
		<h2 class="float-left text-4xl font-bold">{title}</h2>

		<Button
			size="icon"
			variant="ghost"
			class="float-right h-10 w-10"
			on:click={() => {
				open = false;
			}}><IconClose /></Button
		>
	</div>

	<!-- Main Content -->
	<div class="rounded-b-xl bg-background p-4" style="height: calc(100% - 62px);">
		<slot />
	</div>
</div>
