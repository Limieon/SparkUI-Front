<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	type $$Props = ProgressPrimitive.Props & { innerClass?: string };

	let className: $$Props['class'] = undefined;
	export let max: $$Props['max'] = 100;
	export let value: $$Props['value'] = undefined;
	export { className as class };

	export let innerClass: string = '';
</script>

<ProgressPrimitive.Root
	class={cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', className)}
	{...$$restProps}
>
	<div
		class={cn('h-full w-full flex-1 bg-primary transition-all', innerClass)}
		style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	/>
</ProgressPrimitive.Root>
