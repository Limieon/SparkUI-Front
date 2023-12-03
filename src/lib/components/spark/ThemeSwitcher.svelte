<script lang="ts">
	import { TooltipButton } from '$spark/button';
	import { toggleMode } from 'mode-watcher';

	import { Sun as IconSun, Moon as IconMoon } from 'lucide-svelte';

	let className: string = '';
	export { className as class };
</script>

<TooltipButton
	tooltip="Switch theme"
	on:click={toggleMode}
	variant="outline"
	size="icon"
	class={className}
>
	<IconSun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<IconMoon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</TooltipButton>
