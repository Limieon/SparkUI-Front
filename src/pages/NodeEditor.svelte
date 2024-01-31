<script lang="ts">
	import { onMount } from 'svelte';
	import { workflow, node_data, type WorkflowNode } from '$lib/stores';
	import { v4 as uuidv4 } from 'uuid';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import Socket from '$spark/Socket.svelte';

	import { Spark_DefaultNode, Spark_LoadModel, Spark_ImageNode, type NodeMeta } from '$spark/nodes';

	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import * as Accordion from '$lib/components/ui/accordion';

	import Combobox from '$spark/Combobox.svelte';
	import { LoRASelector } from '$lib/components/spark/selector';

	import { CommandPalette } from '$spark/commandPalette';
	import { ImageBrowser } from '$spark/imageBrowser';

	import {
		ChevronLeft,
		ChevronRight,
		FolderDown as SaveIcon,
		FolderUp as OpenIcon,
		PlusIcon,
		ZapIcon
	} from 'lucide-svelte';

	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		Background,
		BackgroundVariant,
		MiniMap,
		type IsValidConnection
	} from '@xyflow/svelte';

	import '@xyflow/svelte/dist/style.css';
	import { PanelTopClose } from 'lucide-svelte';

	import * as Command from '$lib/components/ui/command';
	import { Button } from '$lib/components/ui/button';

	import { hotkey } from '@svelteuidev/composables';
	import TooltipButton from '$lib/components/spark/button/TooltipButton.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let addNode_open = false;

	const nodeTypes = {
		Spark_DefaultNode: Spark_DefaultNode,
		Spark_LoadModel: Spark_LoadModel,
		Spark_ImageNode: Spark_ImageNode
	};

	let nodes = writable<any[]>([]);
	let edges = writable<any[]>([]);
	let availableNodes: { [key: string]: NodeMeta } = {};

	const NODE_ORIGIN = { x: 0, y: 0 };
	onMount(async () => {
		const data = await fetch(`http://${SPARKUI_BACK_HOST}/v1/nodes`);
		const json = await data.json();
		availableNodes = json.nodes;

		loadFromStore();

		nodes.subscribe(() => {
			saveIntoStore($nodes, $edges);
		});
		edges.subscribe(() => {
			saveIntoStore($nodes, $edges);
		});
		node_data.subscribe(() => {
			saveIntoStore($nodes, $edges);
		});
	});

	function addNode(nodeType: string) {
		const temp = [...$nodes];
		const node = availableNodes[nodeType];

		const valStore = writable({});

		const id = uuidv4();
		temp.push({
			id: id,
			type: node.svelte_comp,
			data: {
				nodeID: id,
				id: node.id,
				label: node.label,
				inputs: node.inputs,
				outputs: node.outputs,
				current: writable<boolean>(false),
				useProgress: node.use_progress,
				progressCurrent: writable<number>(0),
				progressMax: writable<number>(1),
				values: valStore
			},
			position: NODE_ORIGIN,
			dragHandle: '.dragHandle'
		});

		$nodes = [...temp];

		console.log($nodes);
	}

	function saveIntoStore(nodes: any[], edges: any[]) {
		let temp: { [key: string]: WorkflowNode } = {};

		for (let n of nodes) {
			temp[n.id] = {
				id: n.id,
				svelte_comp: n.type,
				inputParameters: {},
				type: n.data.id,
				pos: n.position
			};

			if ($node_data[n.id]) {
				for (let d of Object.keys($node_data[n.id])) {
					temp[n.id].inputParameters[d] = {
						type: 'value',
						value: $node_data[n.id][d],
						handle: d
					};
				}
			}

			for (let e of edges) {
				if (e.target === n.id) {
					temp[n.id].inputParameters[e.targetHandle] = {
						type: 'node',
						value: {
							node: e.source,
							handle: e.sourceHandle
						}
					};
				}
			}
		}

		$workflow = temp;
	}
	function loadFromStore() {
		console.log('Loading...');
		$node_data = {};
		for (let n of Object.keys($workflow)) {
			const node = $workflow[n];

			$node_data[node.id] = {};

			$nodes.push({
				id: `${node.id}`,
				type: node.svelte_comp,
				data: {
					nodeID: `${node.id}`,
					id: node.type,
					label: availableNodes[node.type].label,
					inputs: availableNodes[node.type].inputs,
					outputs: availableNodes[node.type].outputs,
					current: writable<boolean>(false),
					useProgress: availableNodes[node.type].use_progress,
					progressCurrent: writable<number>(0),
					progressMax: writable<number>(1),
					values: writable({})
				},
				position: node.pos,
				dragHandle: '.dragHandle'
			});

			for (let p of Object.keys(node.inputParameters)) {
				const param = node.inputParameters[p];

				if (param.type === 'node' && param.value != undefined) {
					$edges.push({
						source: `${param.value.node}`,
						sourceHandle: `${param.value.handle}`,
						target: `${node.id}`,
						targetHandle: `${p}`,
						id: `xy-edge__${param.value.node}${param.value.handle}-${node.id}${p}`
					});
				}

				if (param.type === 'value' && param.value != undefined) {
					console.log('Before:', $node_data);
					console.log({ param, nodeID: node.id });
					$node_data[node.id][param.handle] = param.value;
					console.log('After:', $node_data);
				}
			}
		}

		$nodes = $nodes;
		$edges = $edges;
		$node_data = $node_data;

		console.log('Final:', $node_data);
	}

	function getNodeFromID(id: string) {
		for (let n of $nodes) {
			if (n.id === id) return n;
		}
	}

	const isValidConnection: IsValidConnection = (connection) => {
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
	};

	function handleProgress(data: { node: string; current: number; max: number }) {
		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(true);
				n.data.progressCurrent.set(data.current);
				n.data.progressMax.set(data.max);
				$nodes = $nodes;
			}
		});
	}
	function handleActivation(data: { node: string }) {
		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(true);
				$nodes = $nodes;
			}
		});
	}
	function handleDeactivation(data: { node: string }) {
		$nodes.forEach((n) => {
			if (n.id == data.node) {
				n.data.current.set(false);
				$nodes = $nodes;
			}
		});
	}

	let sidebarOpen = true;
	let sidebarTab = 0;
</script>

<div>
	<div
		use:hotkey={[
			[
				'mod+space',
				() => {
					addNode_open = !addNode_open;
				}
			]
		]}
	/>

	<Command.Dialog bind:open={addNode_open}>
		<Command.Input placeholder="Select a Node to add..." />
		<Command.List>
			<Command.Empty>No results found.</Command.Empty>

			<Command.Group heading="Nodes">
				{#each Object.keys(availableNodes) as nodeType}
					<Command.Item
						onSelect={() => {
							addNode(nodeType);
							addNode_open = false;
						}}>{availableNodes[nodeType].label}</Command.Item
					>
				{/each}
			</Command.Group>
		</Command.List>
	</Command.Dialog>
</div>

<div style:height="calc(100vh - 85px)">
	<div class="grid grid-cols-[auto_35rem] w-full h-full grid-flow-col">
		<div class="w-full h-full">
			<div class="absolute z-50 w-fit">
				<TooltipButton
					class="mr-1"
					tooltip="Add Node (Ctrl + Space)"
					on:click={() => {
						addNode_open = true;
					}}><PlusIcon /></TooltipButton
				>
				<TooltipButton
					class="mr-1"
					tooltip="Save Workflow"
					on:click={() => {
						console.log($workflow);
					}}><SaveIcon /></TooltipButton
				>
				<TooltipButton class="mr-1" tooltip="Load Workflow" on:click={() => {}}
					><OpenIcon /></TooltipButton
				>
				<br />
				<TooltipButton
					class="mr-1 w-full mt-2 bg-accent hover:bg-secondary"
					tooltip="Use Workflow"
					on:click={() => {}}><ZapIcon class="mr-2" /> Generate</TooltipButton
				>
			</div>
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
		</div>
		<div class="w-full h-full border-r-2 border-r-white pr-2">
			<div class="grid grid-cols-2 gap-2">
				<Button
					variant={sidebarTab == 0 ? 'default' : 'outline'}
					on:click={() => {
						sidebarTab = 0;
					}}>Images</Button
				>
				<Button
					variant={sidebarTab == 1 ? 'default' : 'outline'}
					on:click={() => {
						sidebarTab = 1;
					}}>Workflow</Button
				>
			</div>
			<Separator class="w-full mt-4 bg-white" />
		</div>
	</div>
</div>

<Socket on:node_progress={(e) => handleProgress(e.detail)} />
<Socket on:node_activation={(e) => handleActivation(e.detail)} />
<Socket on:node_deactivation={(e) => handleDeactivation(e.detail)} />
