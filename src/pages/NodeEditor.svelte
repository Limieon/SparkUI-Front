<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { writable } from 'svelte/store';

	import Layout from '$spark/SubPageLayout.svelte';
	import * as Resizable from '$ui/resizable';

	import { SvelteFlow, Background, BackgroundVariant, MiniMap } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	let nodes = writable<any[]>([]);
	let edges = writable<any[]>([]);
	let availableNodes: { [key: string]: any } = {};
	const nodeTypes = {};

	function getNodeFromID(id: string) {
		for (let n of $nodes) {
			if (n.id === id) return n;
		}
	}

	function isValidConnection(connection: any): boolean {
		try {
			if (!$nodes) return true;

			if (connection.source == connection.target) return false;

			const tgt = getNodeFromID(connection.target);
			const src = getNodeFromID(connection.source);

			const to = tgt.data.inputs[(connection.targetHandle as unknown as number) - 1];
			const from =
				src.data.outputs[
					(connection.sourceHandle as unknown as number) - src.data.inputs.length - 1
				];

			console.log({ from, to });

			return from.type === to.type;
		} catch (e) {
			return false;
		}
	}
</script>

<Layout title="Node Editor">
	<Resizable.PaneGroup direction="horizontal" class="h-full w-full rounded-lg border">
		<Resizable.Pane defaultSize={25}>
			<div class="flex h-full p-2">
				<span class="font-semibold">Sidebar</span>
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={70}>
			<SvelteFlow
				{nodes}
				{edges}
				snapGrid={[5, 5]}
				{nodeTypes}
				{isValidConnection}
				deleteKey="Delete"
				fitView
				on:nodeclick={(event) => console.log('on node click', event.detail.node)}
			>
				<MiniMap nodeColor="hsl(var(--primary))" position="top-right" />
				<Background
					patternColor="hsl(var(--foreground))"
					bgColor="hsl(var(--background-2))"
					variant={BackgroundVariant.Dots}
				/>
			</SvelteFlow>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={15}>
			<div class="flex h-full p-2">
				<span class="font-semibold">Content</span>
			</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</Layout>
