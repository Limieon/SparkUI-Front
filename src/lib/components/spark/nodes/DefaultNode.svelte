<script lang="ts">
	import { type NodeConnection, getTypeColor, getTypeName, type NodeField } from './index';

	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import type { Writable } from 'svelte/store';

	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Progress } from '$lib/components/ui/progress';

	type $$Props = NodeProps;

	export let data: $$Props['data'];

	const { label, current, fields, inputs, outputs, useProgress, progressCurrent, progressMax } =
		data;
</script>

<div class="bg-background rounded-xl w-fit border-solid">
	<h2
		class="text-lg font-bold {$current
			? 'bg-green-700'
			: 'bg-primary'} text-center rounded-t-xl pl-4 pr-4 dragHandle"
	>
		{label}
	</h2>

	<div class="pl-2 pr-2 pb-2">
		<div class="grid grid-cols-2">
			<div class="grid grid-cols-1 grid-flow-row">
				{#each inputs as d, i}
					<div class="flex items-center">
						<Tooltip.Root>
							<Tooltip.Trigger
								><Handle
									id={i + 1 + ''}
									type="target"
									position={Position.Left}
									style="top: calc(38px + (1.5rem * {i})); transform: translateX(-4px); background-color: {getTypeColor(
										d.type
									)}; width: 0.5rem; height: 0.5rem"
								/>
								<span class="text-sm">{d.name ? d.name : getTypeName(d.type)}</span>
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-secondary">{d.type}</Tooltip.Content>
						</Tooltip.Root>
					</div>
				{/each}
			</div>
			<div class="grid grid-cols-1 grid-flow-row mt-[4px]">
				{#each outputs as d, i}
					<div class="flex items-center float-right h-min">
						<Tooltip.Root>
							<Tooltip.Trigger class="w-full"
								><Handle
									id={i + 1 + inputs.length + ''}
									type="source"
									position={Position.Right}
									style="top: calc(38px + (1.25rem * {i})); transform: translateX(4px); background-color: {getTypeColor(
										d.type
									)}; width: 0.5rem; height: 0.5rem"
								/>
								<span class="text-sm float-right">{d.name ? d.name : getTypeName(d.type)}</span>
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-secondary">{d.type}</Tooltip.Content>
						</Tooltip.Root>
					</div>
				{/each}
			</div>
		</div>
		<div class="mt-2">
			{#each fields as d, i}
				<div class="flex items-center">
					{#if d.type === 'text_area'}
						{#if d.connection}
							<Textarea
								class="w-96 h-32"
								placeholder={d.connection.name ? d.connection.name : getTypeName(d.connection.type)}
								>{d.default}</Textarea
							>
							<Tooltip.Root>
								<Tooltip.Trigger
									><Handle
										id={i + 1 + inputs.length + outputs.length + ''}
										type="target"
										position={Position.Left}
										style="top: calc(68px + (1.4rem * {i})); transform: translateX(-4px); background-color: {getTypeColor(
											d.connection.type
										)}; width: 0.5rem; height: 0.5rem"
									/>
								</Tooltip.Trigger>
								<Tooltip.Content class="bg-secondary">{d.connection.type}</Tooltip.Content>
							</Tooltip.Root>
						{:else}
							<Textarea class="w-96 h-32 font-mono">{d.default}</Textarea>
						{/if}
					{/if}
					{#if d.type === 'text_box'}{/if}
				</div>
			{/each}
		</div>

		{#if useProgress}
			<div class="pl-1 pr-1">
				<Progress
					value={($progressCurrent / $progressMax) * 100}
					class="w-full mt-1"
					innerClass="bg-primary"
				/>
			</div>
		{/if}
	</div>
</div>
