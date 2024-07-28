<script lang="ts">
	import { Badge } from '$ui/badge';
	import { createEventDispatcher } from 'svelte';
	import type { ItemBadge } from '.';

	const dispatch = createEventDispatcher();

	export let id: string;
	export let name: string;
	export let image: string;
	export let leftBadges: ItemBadge[] = [];
	export let rightBadges: ItemBadge[] = [];
</script>

<div class="relative rounded-lg border-2 transition-[border] hover:border-primary">
	<div
		class="group relative aspect-[5/6] cursor-pointer rounded-lg bg-cover bg-center"
		style="background-image: url('{image}')"
		on:click={() => {
			dispatch('select', id);
		}}
	>
		<div
			class="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<div
				class="-translate-y-full transform text-lg text-white transition-transform duration-300 group-hover:translate-y-0"
			>
				{name}
			</div>
		</div>
	</div>

	<div class="absolute right-2 top-2 z-20">
		{#each rightBadges as b}
			<Badge style="background-color: {b.color};">{b.text}</Badge>
		{/each}
	</div>

	<div class="absolute left-2 top-2 z-20">
		{#each leftBadges as b}
			<Badge style="background-color: {b.color};">{b.text}</Badge>
		{/each}
	</div>
	<h2 class="text-center">DreamShaper V8</h2>
</div>
