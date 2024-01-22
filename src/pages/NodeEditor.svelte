<script lang="ts">
	import { Node } from '$spark/nodes';

	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
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

	// We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
	const nodes = writable([
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
			position: { x: 0, y: 150 }
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
			position: { x: 0, y: 150 }
		}
	]);

	// same for edges
	const edges = writable([
		{
			id: '1-2',
			type: 'default',
			source: '1',
			target: '2'
		}
	]);

	const snapGrid: [number, number] = [5, 5];
</script>

<div style:height="calc(100vh - 80px)">
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
</div>
