<script lang="ts">
	import { MainNav } from '$spark/layouts';
	import { Button } from '$ui/button';

	import { fly, fade, slide, blur } from 'svelte/transition';

	import {
		Txt2Img,
		Img2Img,
		InstalledModels,
		ModelBrowser,
		OutputImages,
		Downloads,
		Queue,
		NodeEditor,
		Settings,
		type Pages,
		pages
	} from '$pages';

	import IconSettings from 'lucide-svelte/icons/settings';

	let page: Pages = 'txt2img';
	let settingsOpen = false;
</script>

<MainNav>
	<div slot="nav" class="h-full">
		{#each pages as p}
			<div class="tooltip tooltip-right" data-tip={p.title}>
				<Button
					class="mb-2 h-[48px] w-[48px] p-2"
					variant={page === p.page ? 'default' : 'outline'}
					on:click={() => {
						page = p.page;
					}}
				>
					<svelte:component this={p.icon} />
				</Button>
			</div>
		{/each}

		<div class="tooltip tooltip-right absolute bottom-0 left-2" data-tip="Settings...">
			<Button
				variant={settingsOpen ? 'default' : 'outline'}
				class="mb-2 h-[48px] w-[48px] p-2"
				on:click={() => {
					settingsOpen = true;
				}}
			>
				<IconSettings />
			</Button>
		</div>
	</div>

	{#if page === 'txt2img'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<Txt2Img />
		</div>
	{:else if page === 'img2img'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<Img2Img />
		</div>
	{:else if page === 'nodeEditor'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<NodeEditor />
		</div>
	{:else if page === 'modelBrowser'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<ModelBrowser />
		</div>
	{:else if page === 'installedModels'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<InstalledModels />
		</div>
	{:else if page === 'outputImages'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<OutputImages />
		</div>
	{:else if page === 'queue'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<Queue />
		</div>
	{:else if page === 'downloads'}
		<div in:fade={{ duration: 300 }} class="h-full w-full">
			<Downloads />
		</div>
	{/if}

	<Settings bind:open={settingsOpen} />
</MainNav>
