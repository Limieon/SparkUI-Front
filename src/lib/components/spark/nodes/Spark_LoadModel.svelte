<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import Spark_NodeTemplate from './Spark_NodeTemplate.svelte';
	import type { NodeOutput } from '.';

	import { Button } from '$lib/components/ui/button';

	import { ModelSelector, node_data } from '$lib/stores';

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

	const { nodeID } = data;

	const outputs: NodeOutput[] = [
		{
			name: 'checkpoint',
			type: 'checkpoint'
		},
		{
			name: 'clip',
			type: 'clip'
		},
		{
			name: 'vae',
			type: 'vae'
		}
	];
</script>

<Spark_NodeTemplate
	{id}
	{data}
	{dragHandle}
	{type}
	{selected}
	{isConnectable}
	{zIndex}
	{width}
	{height}
	{dragging}
	{targetPosition}
	{sourcePosition}
	{positionAbsoluteX}
	{positionAbsoluteY}
	{outputs}
>
	<!--Button needs a fixed size, so the node won't resize when changing models-->
	<Button
		variant="outline"
		id="model_selector"
		class="w-64"
		on:click={() => {
			$ModelSelector.open({
				selected: $node_data[nodeID]['1'] ? $node_data[nodeID]['1'] : '',
				onSelect: (model) => {
					$node_data[nodeID]['1'] = model;
					$node_data = $node_data;
				}
			});
		}}>{$node_data[nodeID]['1']}</Button
	>
</Spark_NodeTemplate>
