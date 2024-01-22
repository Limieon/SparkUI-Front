<script lang="ts">
	import { onMount } from 'svelte';
	import { nodes, edges, nodePos } from '$lib/stores';

	import { Node } from '$spark/nodes';

	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		SvelteFlowProvider,
		Controls,
		Background,
		BackgroundVariant,
		MiniMap,
		NodeToolbar
	} from '@xyflow/svelte';

	// 👇 this is important! You need to import the styles for Svelte Flow to work
	import '@xyflow/svelte/dist/style.css';
	import { PanelTopClose } from 'lucide-svelte';

	const nodeTypes = {
		node: Node
	};

	$nodes = [];

	$: {
		for (let node of $nodes) {
			if (node.position.x == NODE_ORIGIN.x && node.position.y == NODE_ORIGIN.y) break;
			$nodePos[node.id] = node.position;
		}
		console.log($nodePos);
	}

	const NODE_ORIGIN = { x: 0, y: 0 };
	onMount(() => {
		$nodes = [
			{
				id: '1',
				type: 'node',
				data: {
					label: 'Sampler',
					connections: {
						inputs: [
							{
								type: 'vae'
							},
							{
								type: 'int',
								name: 'Seed'
							}
						],
						outputs: [
							{
								type: 'latent_image'
							}
						]
					}
				},
				position: NODE_ORIGIN
			},
			{
				id: '2',
				type: 'node',
				data: {
					label: 'Image Decoder',
					connections: {
						inputs: [
							{
								type: 'latent_image'
							}
						],
						outputs: [
							{
								type: 'image'
							}
						]
					}
				},
				position: NODE_ORIGIN
			}
		];

		for (let nodeID of Object.keys($nodePos)) {
			for (let nodeIndex = 0; nodeIndex < $nodes.length; ++nodeIndex) {
				if ($nodes[nodeIndex].id === nodeID) {
					$nodes[nodeIndex].position = $nodePos[nodeID];
					break;
				}
			}
		}
	});

	// same for edges
	$edges = [
		{
			id: '1-2',
			type: 'default',
			source: '1',
			target: '2'
		}
	];

	const snapGrid: [number, number] = [5, 5];
</script>

<div style:height="calc(100vh - 80px)">
	<SvelteFlowProvider>
		<SvelteFlow
			class=""
			{nodes}
			{edges}
			{snapGrid}
			{nodeTypes}
			fitView
			on:nodeclick={(event) => console.log('on node click', event.detail.node)}
		>
			<MiniMap nodeColor="hsl(var(--primary))" position="top-right" />
			<Background
				patternColor="hsl(var(--foreground))"
				bgColor="hsl(var(--background-2))"
				variant={BackgroundVariant.Cross}
			/>
		</SvelteFlow>
	</SvelteFlowProvider>
</div>
