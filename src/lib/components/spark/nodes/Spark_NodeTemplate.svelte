<script lang="ts">
	import {
		type NodeConnection,
		getTypeColor,
		getTypeName,
		type NodeInput,
		type NodeOutput
	} from './index';

	import { workflow, node_data } from '$lib/stores';

	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Progress } from '$lib/components/ui/progress';
	import { Input } from '$lib/components/ui/input';

	type $$Props = NodeProps;

	export let id: $$Props['id'];
	id;
	export let data: $$Props['data'];
	data;
	export let dragHandle: $$Props['dragHandle'] = undefined;
	dragHandle;
	export let type: $$Props['type'] = undefined;
	type;
	export let selected: $$Props['selected'] = undefined;
	selected;
	export let isConnectable: $$Props['isConnectable'] = undefined;
	isConnectable;
	export let zIndex: $$Props['zIndex'] = undefined;
	zIndex;
	export let width: $$Props['width'] = undefined;
	width;
	export let height: $$Props['height'] = undefined;
	height;
	export let dragging: $$Props['dragging'];
	dragging;
	export let targetPosition: $$Props['targetPosition'] = undefined;
	targetPosition;
	export let sourcePosition: $$Props['sourcePosition'] = undefined;
	sourcePosition;
	export let positionAbsoluteX: $$Props['positionAbsoluteX'];
	positionAbsoluteX;
	export let positionAbsoluteY: $$Props['positionAbsoluteY'];
	positionAbsoluteY;

	export let inputs: NodeInput[] = [];
	export let outputs: NodeOutput[] = [];

	const { nodeID, label, current, useProgress, progressCurrent, progressMax } = data;

	let boundValues: { [key: string]: any } = {};

	if ($node_data[nodeID] == undefined) $node_data[nodeID] = {};
	for (let i = 0; i < inputs.length; ++i) {
		let value: any = undefined;
		if (
			$workflow[nodeID] != undefined &&
			$workflow[nodeID].inputParameters[`${i + 1}`] != undefined &&
			$workflow[nodeID].inputParameters[`${i + 1}`].type == 'value'
		) {
			value = $workflow[nodeID].inputParameters[`${i + 1}`].value;
		}
		boundValues[`${i + 1}`] = value ? value : inputs[i].default;
	}

	let selectedModel = '';
</script>

<div class="bg-background rounded-xl w-fit">
	<h2
		class="text-lg font-bold {$current
			? 'bg-green-700'
			: selected
			  ? 'bg-secondary'
			  : 'bg-primary'} text-center rounded-t-xl pl-4 pr-4 dragHandle"
	>
		{label}
	</h2>

	<div class="">
		{#if useProgress}
			<div class="p-1">
				<Progress
					value={($progressCurrent / $progressMax) * 100}
					class="w-full"
					innerClass="bg-primary"
				/>
			</div>
		{/if}
		<div class="pl-2 pr-2 pb-2 grid grid-cols-[auto_auto] gap-4 grid-flow-row">
			<div class="grid w-full">
				{#each inputs as d, i}
					<div class="flex items-center">
						<Tooltip.Root>
							<Tooltip.Trigger class="w-full relative">
								<Handle
									id={i + 1 + ''}
									type="target"
									position={Position.Left}
									style="top: -10px; left: -12px; position: absolute; width: 0.5rem; height: 0.5rem; transform: translateY(18px); background-color: {getTypeColor(
										d.type
									)};"
								/>

								{#if d.type === 'string'}
									{#if d.input_properties['text_area']}
										<Textarea
											bind:value={boundValues[`${i + 1}`]}
											on:change={() => {
												$node_data[data.nodeID][`${i + 1}`] = boundValues[`${i + 1}`];
												console.log($node_data);
												$node_data = $node_data;
											}}
											placeholder={d.name}
											class="font-mono h-4 text-xs pt-1 pb-1 mt-1 pl-1 pr-1 w-64"
										/>
									{:else}
										<Input
											bind:value={boundValues[`${i + 1}`]}
											on:change={() => {
												$node_data[data.nodeID][`${i + 1}`] = boundValues[`${i + 1}`];
												console.log($node_data);
												$node_data = $node_data;
											}}
											placeholder={d.name}
											class="h-4 text-xs mt-1 pl-1 pr-1 "
										/>
									{/if}
								{:else if d.type === 'int'}
									<Input
										bind:value={boundValues[`${i + 1}`]}
										on:change={() => {
											$node_data[data.nodeID][`${i + 1}`] = boundValues[`${i + 1}`];
											console.log($node_data);
											$node_data = $node_data;
										}}
										placeholder={d.name}
										class="h-4 text-xs mt-1 pl-1 pr-1"
										num
									/>
								{:else}
									<span class="float-left text-sm">{d.name ? d.name : getTypeName(d.type)}</span>
								{/if}
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-secondary">{d.type}</Tooltip.Content>
						</Tooltip.Root>
					</div>
				{/each}
			</div>

			<div class="grid w-full">
				{#each outputs as d, i}
					<div class="flex items-center float-right h-min">
						<Tooltip.Root>
							<Tooltip.Trigger class="w-full relative">
								<Handle
									id={i + 1 + inputs.length + ''}
									type="source"
									position={Position.Right}
									style="top: -10px; right: -10px; position: absolute; width: 0.5rem; height: 0.5rem; transform: translateY(18px); background-color: {getTypeColor(
										d.type
									)};"
								/>
								<span class="mr-1 text-sm float-right">{d.name ? d.name : getTypeName(d.type)}</span
								>
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-secondary">{d.type}</Tooltip.Content>
						</Tooltip.Root>
					</div>
				{/each}
			</div>
		</div>

		<div class="p-2 -mt-2">
			<slot />
		</div>
	</div>
</div>
