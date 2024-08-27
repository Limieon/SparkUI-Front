<script lang="ts">
	import { getContext } from 'svelte';
	import { Separator } from '$ui/separator';
	import * as Resizable from '$ui/resizable';
	import * as Form from '$ui/form';
	import { Textarea } from '$ui/textarea';
	import { Input } from '$ui/input';
	import { Button } from '$ui/button';
	import { Progress } from '$ui/progress';
	import { Label } from '$ui/label';
	import * as Accordion from '$ui/accordion';
	import { Slider } from '$ui/slider';
	import { Switch } from '$ui/switch';
	import * as Select from '$ui/select';
	import { AspectRatio } from '$ui/aspect-ratio';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Tabs from '$ui/tabs';
	import { Badge } from '$ui/badge';
	import { Checkbox } from '$ui/checkbox';

	import { SubPageLayout as Layout } from '$spark/layouts';

	import IconX from 'lucide-svelte/icons/x';
	import IconDices from 'lucide-svelte/icons/dices';
	import IconZap from 'lucide-svelte/icons/zap';
	import IconLock from 'lucide-svelte/icons/lock';
	import IconSwap from 'lucide-svelte/icons/arrow-up-down';
	import IconAdd from 'lucide-svelte/icons/plus';
	import IconDelete from 'lucide-svelte/icons/trash';
	import IconCopy from 'lucide-svelte/icons/copy';

	import { random } from '$lib/math';
	import { getEmblaContext } from '$ui/carousel/context';

	import { Popup } from '$spark/popup';
	import * as Selector from '$spark/selectors';
	import Header from '$spark/selectors/Header.svelte';
	import ItemContainer from '$spark/selectors/Items.svelte';

	const MAX_SEED = Math.pow(2, 32) - 1;
	const MIN_SEED = 0;

	interface GenerationData {
		prompt: string;
		negativePrompt: string;
		batch_count: number;
		batch_size: number;
		steps: number;
		cfg_scale: number;
		seed: number;
		generation_width: number;
		generation_height: number;
		subseed: number;
		subseed_strength: number;
		randomize_seed: boolean;
		randomize_subseed: boolean;
		checkpointID: string;
		refinerID?: string;
		loras: { [key: string]: number };
		embeddings: { [key: string]: number };
	}

	let generationData: GenerationData = {
		prompt: '',
		negativePrompt: '',
		batch_count: 1,
		batch_size: 4,
		steps: 30,
		cfg_scale: 7,
		seed: 0,
		subseed: 0,
		subseed_strength: 0.2,
		generation_width: 512,
		generation_height: 512,
		randomize_seed: true,
		randomize_subseed: false,
		checkpointID: 'dreamshaper/v8',
		loras: {
			neon_valorant: 7.5,
			anime_style: 8.5,
			more_details: 9
		},
		embeddings: {
			better_hands: 2.5,
			better_negative: 7.5
		},
		refinerID: undefined
	};

	let generationSettingsTab: 'embeddings' | 'loras' | 'controlnets' = 'embeddings';

	function swapGenerationSize() {
		const temp = generationData.generation_width;
		generationData.generation_width = generationData.generation_height;
		generationData.generation_height = temp;
	}

	function removeLora(id: string) {
		if (id in generationData.loras) delete generationData.loras[id];
		generationData.loras = { ...generationData.loras };
	}
	function removeEmbedding(id: string) {
		if (id in generationData.embeddings) delete generationData.embeddings[id];
		generationData.embeddings = { ...generationData.embeddings };
	}

	function copyTriggerWordsLora(id: string) {}
	function copyTriggerWordsEmbedding(id: string) {}

	function sendGenerationRequest() {
		console.log(generationData);
	}

	function handleCheckpointSelect(id: string) {
		console.log('Selected:', id);
		generationData.checkpointID = id;
		checkpointSelectorOpen = false;
	}
	function handleLoraSelect(id: string) {
		console.log('Added:', id);
		if (generationData.loras[id] == undefined) generationData.loras[id] = 0.5;
		loraSelectorOpen = false;
	}

	let checkpointSelectorOpen = false;
	const selectorCheckpoints: SelectionEntry[] = [
		{
			name: 'DreamShaper V8',
			id: 'dreamshaper/v8',
			image: 'https://picsum.photos/256',
			leftBadges: ['V8'],
			rightBadges: ['SD1.5']
		},
		{
			name: 'Juggernaut XL',
			id: 'juggernaut/v5',
			image: 'https://picsum.photos/256',
			leftBadges: ['V9'],
			rightBadges: ['SDXL']
		}
	];

	let loraSelectorOpen = false;
	const selectorLoras: SelectionEntry[] = [
		{
			name: 'Neon (VALORANT)',
			id: 'valorant/neon',
			image: 'https://picsum.photos/256',
			leftBadges: ['Neon'],
			rightBadges: ['SD1.5']
		},
		{
			name: 'Genshin Impact - Ganyu',
			id: 'genshinimpact/ganyu',
			image: 'https://picsum.photos/256',
			leftBadges: ['Ganyu'],
			rightBadges: ['SD1.5']
		}
	];
</script>

<Layout title="Text 2 Image">
	<div class="grid grid-cols-[30%_auto_25%] gap-1">
		<div class="">
			<div
				class="flex flex-col space-y-2 overflow-y-scroll pr-2"
				style="height: calc(100vh - 6rem);"
			>
				<div class="flex w-full items-center justify-between">
					<Button
						class="mr-2 mt-4 w-auto flex-shrink-0 flex-grow text-lg font-bold"
						on:click={sendGenerationRequest}
					>
						Generate
					</Button>
					<Button size="icon" class="mr-2 mt-4 bg-amber-400 hover:bg-amber-500"><IconZap /></Button>

					<div class="flex space-x-2">
						<div class="flex w-full flex-col space-y-1">
							<Label for="batch_size">Batch Size:</Label>
							<Input
								id="batch_size"
								type="number"
								class="w-24 text-center"
								value={generationData.batch_size}
								min={1}
								max={9}
								step={1}
							/>
						</div>
						<div class="flex w-full flex-col space-y-1">
							<Label for="batch_count">Batch Count:</Label>
							<Input
								id="batch_count"
								type="number"
								class="w-24 text-center"
								value={generationData.batch_count}
								min={1}
								max={9}
								step={1}
							/>
						</div>
					</div>
				</div>

				<Separator orientation="horizontal" />

				<h2>Prompt</h2>
				<Textarea placeholder="Prompt" bind:value={generationData.prompt} />
				<Textarea
					class="mt-1"
					placeholder="Negative Prompt"
					bind:value={generationData.negativePrompt}
				/>

				<Separator orientation="horizontal" />

				<h2>Base Settings</h2>
				<div class="flex items-center space-x-2">
					<div class="flex w-full flex-col space-y-1">
						<Label for="seed">Seed:</Label>
						<Input
							disabled={generationData.randomize_seed}
							id="seed"
							type="number"
							class="w-full flex-grow"
							bind:value={generationData.seed}
							min={MIN_SEED}
							max={MAX_SEED}
						/>
					</div>

					<Button
						size="icon"
						class="mt-4 w-12 self-end"
						on:click={() => (generationData.seed = random(MIN_SEED, MAX_SEED))}
						><IconDices /></Button
					>

					<div class="ml-auto flex h-full items-center space-x-2 pt-4">
						<Label for="randomize">Randomize:</Label>
						<Switch bind:checked={generationData.randomize_seed} />
					</div>
				</div>
				<div class="flex items-center space-x-2">
					<div class="flex w-full flex-col space-y-1">
						<Label for="subseed">Subseed:</Label>
						<Input
							disabled={generationData.randomize_subseed}
							id="subseed"
							type="number"
							class="w-full flex-grow"
							bind:value={generationData.subseed}
							min={MIN_SEED}
							max={MAX_SEED}
						/>
					</div>

					<div class="flex flex-col items-center space-y-1">
						<Label class="mr-14 whitespace-nowrap">Subseed Strength:</Label>
						<Input
							class="w-full text-center"
							type="number"
							bind:value={generationData.subseed_strength}
							min={0}
							max={1}
							step={0.01}
						/>
					</div>
				</div>

				<Separator orientation="horizontal" />

				<h2>Image Size</h2>
				<div class="flex flex-row items-center space-x-2">
					<div class="flex w-full flex-col space-y-1">
						<Label for="generation_width">Width:</Label>
						<Input
							id="generation_width"
							type="number"
							class="w-full flex-grow text-center"
							bind:value={generationData.generation_width}
							min={8}
							max={1536}
							step={8}
							on:input={() => {
								generationData.generation_width = +generationData.generation_width;
							}}
						/>
					</div>
					<div class="flex w-full flex-col space-y-1">
						<Label for="generation_height">Height:</Label>
						<Input
							id="generation_height"
							type="number"
							class="w-full flex-grow text-center"
							bind:value={generationData.generation_height}
							min={8}
							max={1536}
							step={8}
							on:input={() => {
								generationData.generation_height = +generationData.generation_height;
							}}
						/>
					</div>
					<Button size="icon" class="mt-4 w-20 self-end" on:click={swapGenerationSize}
						><IconSwap /></Button
					>
				</div>

				<Separator orientation="horizontal" />

				<h2>Generation Settings</h2>
				<div class="flex-col space-y-2">
					<div class="flex flex-row items-center space-x-2">
						<div class="flex w-full flex-col space-y-1">
							<Label>Model:</Label>
							<Button
								class="h-10 w-full py-4 text-xl"
								on:click={() => {
									checkpointSelectorOpen = true;
								}}>DreamShaper V8</Button
							>
						</div>
					</div>
					<div class="flex space-x-2">
						<div class="flex w-full flex-col space-y-1">
							<Label for="steps">Steps:</Label>
							<Input
								id="steps"
								type="number"
								class="w-full text-center"
								bind:value={generationData.steps}
								min={1}
								max={100}
								step={1}
								on:input={() => {
									generationData.steps = +generationData.steps;
								}}
							/>
						</div>
						<div class="flex w-full flex-col space-y-1">
							<Label for="cfg_scale">CFG Scale:</Label>
							<Input
								id="cfg_scale"
								type="number"
								class="w-full text-center"
								bind:value={generationData.cfg_scale}
								min={1}
								max={10}
								step={0.5}
								on:input={() => {
									generationData.cfg_scale = +generationData.cfg_scale;
								}}
							/>
						</div>
					</div>

					<Tabs.Root value="embeddings" class="w-full">
						<Tabs.List class="w-full">
							<Tabs.Trigger class="flex-grow" value="embeddings">Embeddings</Tabs.Trigger>
							<Tabs.Trigger class="flex-grow" value="loras">LoRAs</Tabs.Trigger>
							<Tabs.Trigger class="flex-grow" value="controlnet">ControlNet</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content class="space-y-2 rounded-lg border-2 p-2" value="embeddings">
							<div class="flex items-center justify-end">
								<p class="text-lg">
									Active Embeddings: {Object.keys(generationData.embeddings).length}
								</p>
								<Button class="ml-auto w-fit">
									<IconAdd class="mr-2 h-4 w-4" />
									Add Embedding
								</Button>
							</div>
							{#if Object.keys(generationData.embeddings).length > 0}
								<Separator orientation="horizontal" />
								<div class="flex w-full flex-col space-y-2 rounded-lg bg-background p-2">
									{#each Object.keys(generationData.embeddings) as embedding, i}
										<div class="flex w-full items-center space-x-2">
											<img
												alt="{embedding} icon"
												src="https://picsum.photos/64"
												class="h-[64px] w-[64px] rounded-lg"
											/>
											<p class="flex-grow text-xl">{embedding}</p>
											<Input
												class="ml-auto w-24 text-center"
												type="number"
												bind:value={generationData.embeddings[embedding]}
												min={0}
												max={10}
												on:input={() => {
													generationData.embeddings[embedding] =
														+generationData.embeddings[embedding];
												}}
											/>
											<Button size="icon" on:click={() => copyTriggerWordsEmbedding(embedding)}>
												<IconCopy />
											</Button>
											<Button
												variant="destructive"
												size="icon"
												on:click={() => removeEmbedding(embedding)}
											>
												<IconDelete />
											</Button>
										</div>

										{#if i < Object.keys(generationData.embeddings).length - 1}
											<Separator orientation="horizontal" />
										{/if}
									{/each}
								</div>
							{/if}
						</Tabs.Content>
						<Tabs.Content class="space-y-2 rounded-lg border-2 p-2" value="loras">
							<div class="flex items-center justify-end">
								<p class="text-lg">Active LoRAs: {Object.keys(generationData.loras).length}</p>
								<Button
									class="ml-auto w-fit"
									on:click={() => {
										loraSelectorOpen = true;
									}}
								>
									<IconAdd class="mr-2 h-4 w-4" />
									Add LoRA
								</Button>
							</div>
							{#if Object.keys(generationData.loras).length > 0}
								<Separator orientation="horizontal" />
								<div class="flex w-full flex-col space-y-2 rounded-lg bg-background p-2">
									{#each Object.keys(generationData.loras) as lora, i}
										<div class="flex w-full items-center space-x-2">
											<img
												alt="{lora} icon"
												src="https://picsum.photos/64"
												class="h-[64px] w-[64px] rounded-lg"
											/>
											<p class="flex-grow text-xl">{lora}</p>
											<Input
												class="ml-auto w-24 text-center"
												type="number"
												bind:value={generationData.loras[lora]}
												min={0}
												max={10}
												on:input={() => {
													generationData.loras[lora] = +generationData.loras[lora];
												}}
											/>
											<Button size="icon" on:click={() => copyTriggerWordsLora(lora)}>
												<IconCopy />
											</Button>
											<Button variant="destructive" size="icon" on:click={() => removeLora(lora)}>
												<IconDelete />
											</Button>
										</div>

										{#if i < Object.keys(generationData.loras).length - 1}
											<Separator orientation="horizontal" />
										{/if}
									{/each}
								</div>
							{/if}
						</Tabs.Content>
						<Tabs.Content class="rounded-lg border-2 p-2" value="controlnet"></Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
		</div>
		<div class="">
			<div class="overflow-y-scroll bg-green-500" style="height: calc(100vh - 6rem);"></div>
		</div>
		<div class="">
			<div class="overflow-y-scroll bg-red-500" style="height: calc(100vh - 6rem);"></div>
		</div>
	</div>

	<Selector.Container title="Checkpoint Selector" bind:open={checkpointSelectorOpen}>
		<Selector.Header>
			<div class="flex w-full flex-col">
				<div class="flex w-full space-x-2">
					<Input type="text" value="" placeholder="Search..." class="w-full flex-grow" />

					<div class="min-w-[180px] flex-shrink-0">
						<Select.Root multiple={true}>
							<Select.Trigger
								class="inline-flex min-w-0 items-center rounded border border-gray-300 px-2 py-1"
							>
								<Select.Value placeholder="Tags" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="Anime">Anime</Select.Item>
								<Select.Item value="Realistic">Realistic</Select.Item>
								<Select.Item value="Sci-Fi">Sci-Fi</Select.Item>
								<Select.Item value="Architecture">Architecture</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>

					<div class="min-w-[180px] flex-shrink-0">
						<Select.Root multiple={true}>
							<Select.Trigger
								class="inline-flex min-w-0 items-center rounded border border-gray-300 px-2 py-1"
							>
								<Select.Value placeholder="Version" />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="SD1.5">SD1.5</Select.Item>
								<Select.Item value="SDXL">SDXL</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
					<Button class="px-4 py-2">Search</Button>
				</div>
			</div>
		</Selector.Header>
		<Selector.Items>
			{#each { length: 200 } as _}
				<Selector.Checkpoint
					name="DreamShaperXL"
					id="dramshaperxl/v1"
					image="https://picsum.photos/256"
					leftBadges={[{ text: 'V1', color: 'green' }]}
					rightBadges={[{ text: 'SDXL', color: 'red' }]}
				/>
			{/each}
		</Selector.Items>
	</Selector.Container>
</Layout>
