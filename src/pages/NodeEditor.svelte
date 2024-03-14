<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { writable } from 'svelte/store';

	import { Button } from '$ui/button';
	import { Input } from '$ui/input';
	import { Separator } from '$ui/separator';
	``;
	import { clientID } from '$lib';
	console.log(clientID);

	import Socket from '$spark/Socket.svelte';

	import Layout from '$spark/SubPageLayout.svelte';
	import * as Resizable from '$ui/resizable';

	import IconPlus from 'lucide-svelte/icons/plus';
	import IconTrash from 'lucide-svelte/icons/trash';

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

	// Socket Events
	function handleProgressUpdate(data: { node: string; current: number; max: number }) {
		console.log('Progress Update', data);
	}
	function handleActivation(data: { node: string }) {
		console.log('Activation', data);
	}
	function handleDeactivation(data: { node: string }) {
		console.log('Deactivation', data);
	}
	function handleNodeDataUpdate(data: { node: string; field: string; value: any }) {
		console.log('Node Data Update', data);
	}
</script>

<Layout title="Node Editor">
	<Resizable.PaneGroup direction="horizontal" class="h-full w-full rounded-lg border">
		<Resizable.Pane defaultSize={25}>
			<div class="block h-full p-2">
				<div class="h-8 w-full">
					<span class="text-center align-middle font-semibold">Parameters</span>

					<Button class="float-right h-full w-36"><IconPlus /> Add Parameter</Button>

					<Separator class="mt-4" />
				</div>

				<div class="mt-6 grid w-full grid-flow-row gap-1">
					<div class="h-min w-full">
						<span class="text-center align-middle font-semibold">Parameter 1</span>

						<Button class="float-right ml-1 h-9 w-9 p-0" variant="destructive"><IconTrash /></Button
						>
						<Input class="float-right w-max" />
					</div>
					<div class="h-min w-full">
						<span class="text-center align-middle font-semibold">Parameter 1</span>

						<Button class="float-right ml-1 h-9 w-9 p-0" variant="destructive"><IconTrash /></Button
						>
						<Input class="float-right w-max" />
					</div>
					<div class="h-min w-full">
						<span class="text-center align-middle font-semibold">Parameter 1</span>

						<Button class="float-right ml-1 h-9 w-9 p-0" variant="destructive"><IconTrash /></Button
						>
						<Input class="float-right w-max" />
					</div>
					<div class="h-min w-full">
						<span class="text-center align-middle font-semibold">Parameter 1</span>

						<Button class="float-right ml-1 h-9 w-9 p-0" variant="destructive"><IconTrash /></Button
						>
						<Input class="float-right w-max" />
					</div>
				</div>
			</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={80}>
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
	</Resizable.PaneGroup>
</Layout>

<Socket on:node_progress_updated={(e) => handleProgressUpdate(e.detail)} />
<Socket on:node_activation={(e) => handleActivation(e.detail)} />
<Socket on:node_deactivation={(e) => handleDeactivation(e.detail)} />
<Socket on:node_data_update={(e) => handleNodeDataUpdate(e.detail)} />
