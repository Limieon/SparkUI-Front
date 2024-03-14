<script lang="ts">
	import '$src/app.pcss';

	import { Button } from '$ui/button';
	import { ModeWatcher } from 'mode-watcher';

	let version = 'v1.0';
</script>

<ModeWatcher />

<svelte:head>
	<title>SparkUI ✨</title>
</svelte:head>

<div class="h-screen w-screen cursor-default select-none overflow-y-hidden">
	<div class="grid h-full grid-cols-[55px_auto] grid-rows-[50px_auto] gap-1 p-2">
		<!-- Header -->
		<div class="col-span-2 row-span-1">
			<div class="block h-full w-full">
				<div class="group w-fit">
					<h1 class="float-left text-4xl font-extrabold tracking-tight">✨ SparkUI⚡</h1>
					<h1
						class="float-left text-4xl font-extrabold tracking-tight opacity-0 transition-opacity group-hover:opacity-100"
					>
						- {version}
					</h1>
				</div>
			</div>
		</div>

		<!-- Sidebar Menu -->

		<div class="col-span-1 row-span-1 block">
			<slot name="nav" />
		</div>

		<!-- Content -->
		<div class="h-full rounded-xl bg-background2 p-2">
			<slot />
		</div>
	</div>
</div>
