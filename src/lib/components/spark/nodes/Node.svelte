<script lang="ts">
	import { type NodeConnection, getTypeColor, getTypeName } from './index';

	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import type { Writable } from 'svelte/store';

	import * as Tooltip from '$lib/components/ui/tooltip';

	type $$Props = NodeProps;

	export let data: {
		label: string;
		connections: { inputs: NodeConnection[]; outputs: NodeConnection[] };
	};

	const label: string = data.label;
	const inputs: NodeConnection[] = data.connections.inputs;
	const outputs: NodeConnection[] = data.connections.outputs;
</script>

<div class="colorpicker bg-background rounded-xl w-fit">
	<h2 class="text-lg font-bold bg-primary text-center rounded-t-xl pl-4 pr-4">{label}</h2>

	<div class="pl-2 pr-2 pb-2">
		<div class="grid grid-cols-2">
			<div>
				{#each inputs as d, i}
					<div class="flex items-center">
						<Tooltip.Root>
							<Tooltip.Trigger
								><Handle
									id={i + 1 + ''}
									type="target"
									position={Position.Left}
									style="top: calc(40px + (1.25rem * {i})); transform: translateX(-4px); background-color: {getTypeColor(
										d.type
									)}; width: 0.5rem; height: 0.5rem"
								/>
								<span class="text-sm">{d.name ? d.name : getTypeName(d.type)}</span>
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-secondary">int</Tooltip.Content>
						</Tooltip.Root>
					</div>
				{/each}
			</div>
			<div>
				{#each outputs as d, i}
					<div class="flex items-center float-right">
						<Tooltip.Root>
							<Tooltip.Trigger
								><Handle
									id={i + 1 + inputs.length + ''}
									type="source"
									position={Position.Right}
									style="top: calc(38px + (1.25rem * {i})); transform: translateX(4px); background-color: {getTypeColor(
										d.type
									)}; width: 0.5rem; height: 0.5rem"
								/>
								<span class="text-sm">{d.name ? d.name : getTypeName(d.type)}</span>
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-secondary">int</Tooltip.Content>
						</Tooltip.Root>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
