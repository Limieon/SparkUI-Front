<script lang="ts">
	import type { NodeProps } from '@xyflow/svelte';
	import Spark_NodeTemplate from './Spark_NodeTemplate.svelte';
	import type { NodeOutput } from '.';

	import { Button } from '$lib/components/ui/button';
	import { TooltipButton } from '$spark/button';

	import { ModelSelector, node_data } from '$lib/stores';
	import Separator from '$lib/components/ui/separator/separator.svelte';

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

	const { fields, nodeID } = data;
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
>
	<Separator class="mb-2" />
	<div class="w-64 h-64 flex items-center">
		<img
			alt="Leck mir die Eier"
			class="max-w-64 max-h-64 rounded-sm m-[0_auto]"
			src={$fields.image}
		/>
	</div>
	<Separator class="mt-2 mb-2" />
	<TooltipButton
		class="w-fit pl-2 pr-2"
		tooltip="Save image to gallery"
		on:click={() => {
			console.log('Saving...');
		}}>Save Image</TooltipButton
	>
</Spark_NodeTemplate>
