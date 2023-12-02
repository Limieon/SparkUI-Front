<script lang="ts">
	import '$src/app.pcss';

	import { Separator } from '$lib/components/ui/separator';

	import { Button } from '$lib/components/ui/button';

	import { ModeWatcher } from 'mode-watcher';

	import {
		Sun as IconSun,
		Moon as IconMoon,
		Type as IconType,
		Image as IconImage,
		Box as IconBox,
		Settings as IconSettings,
		AlignJustify as IconList
	} from 'lucide-svelte';

	import { toggleMode } from 'mode-watcher';
</script>

<ModeWatcher />

<svelte:head>
	<title>SparkUI ✨</title>
</svelte:head>

<div class="h-screen w-screen">
	<div class="p-2 grid grid-rows-[50px_auto] grid-cols-[55px_auto] gap-1 h-full">
		<!-- Header -->
		<div class="row-span-1 col-span-2">
			<h1 class="inline text-4xl font-extrabold tracking-tight">✨ SparkUI ⚡</h1>

			<Button on:click={toggleMode} variant="outline" size="icon" class="float-right">
				<IconSun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<IconMoon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>

		<!-- Sidebar Menu -->

		<div class="row-span-1 col-span-1 block">
			<slot name="nav" />
		</div>

		<!-- Content -->
		<div class="bg-zinc-800 rounded-xl h-full p-2">
			<slot />
		</div>
	</div>
</div>
