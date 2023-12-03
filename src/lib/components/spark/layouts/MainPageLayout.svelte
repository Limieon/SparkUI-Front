<script lang="ts">
	import '$src/app.pcss';

	import { Button } from '$lib/components/ui/button';
	import { ModeWatcher } from 'mode-watcher';

	let status: 'green' | 'orange' | 'red' = 'red';
	let statusText = 'Disconnected';
</script>

<ModeWatcher />

<svelte:head>
	<title>SparkUI ✨</title>
</svelte:head>

<div class="h-screen w-screen overflow-y-hidden">
	<div class="p-2 grid grid-rows-[50px_auto] grid-cols-[55px_auto] gap-1 h-full">
		<!-- Header -->
		<div class="row-span-1 col-span-2">
			<div class="block w-full h-full">
				<h1 class="text-4xl font-extrabold tracking-tight float-left">✨ SparkUI⚡</h1>

				<div class="block w-full h-full group">
					{#if status === 'green'}
						<div class="bg-success rounded-full w-5 h-5 float-right mt-3 mr-6"></div>
						<p
							class="text-success text-2xl mt-1 float-right mr-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150 cursor-default"
						>
							{statusText}
						</p>
					{:else if status === 'orange'}
						<div class="bg-amber-600 rounded-full w-5 h-5 float-right mt-3 mr-6"></div>
						<p
							class="text-amber-600 text-2xl mt-1 float-right mr-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150 cursor-default"
						>
							{statusText}
						</p>
					{:else}
						<div class="bg-red-700 rounded-full w-5 h-5 float-right mt-3 mr-6"></div>
						<p
							class="text-red-700 text-2xl mt-1 float-right mr-4 opacity-0 group-hover:opacity-100 transition-opacity delay-150 cursor-default"
						>
							{statusText}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- Sidebar Menu -->

		<div class="row-span-1 col-span-1 block">
			<slot name="nav" />
		</div>

		<!-- Content -->
		<div class="bg-background2 rounded-xl h-full p-2">
			<slot />
		</div>
	</div>
</div>
