<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';

	export let tooltip: string;
	export let size: 'default' | 'sm' | 'lg' | 'icon' | undefined = 'icon';
	export let variant:
		| 'default'
		| 'link'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| undefined = 'default';

	let className = '';
	export { className as class };
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			{variant}
			{size}
			class={className}
			{...$$restProps}
			on:click
			on:keydown><slot /></Button
		>
	</Tooltip.Trigger>
	<Tooltip.Content class="bg-background">
		<p>{tooltip}</p>
	</Tooltip.Content>
</Tooltip.Root>
