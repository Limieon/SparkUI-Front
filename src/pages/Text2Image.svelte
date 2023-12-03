<script lang="ts">
	import { size } from '@floating-ui/dom';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Progress } from '$lib/components/ui/progress';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Switch } from '$lib/components/ui/switch';
	import { Slider } from '$lib/components/ui/slider';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as RadioGroup from '$lib/components/ui/radio-group';

	import Combobox from '$spark/Combobox.svelte';
	import { ModelSelector, LoRASelector } from '$lib/components/spark/selector';

	import { ImageBrowser } from '$spark/imageBrowser';

	/* ---> Sections <--- */
	import SectionPrompt from './sections/SectionPrompt.svelte';
	let prompt = '',
		negativePrompt = '';

	let stylePrompt = '',
		negativeStylePrompt = '';

	import {
		Zap as IconZap,
		ListStart as IconListStart,
		Trash2 as IconDelete,
		X as IconCancel,
		Replace as IconModelSwitcher,
		Dices as IconRandom,
		ArrowDownUp as IconSwap,
		Plus as IconAdd,
		Copy as IconCopy,
		Sprout as IconReuseSeed,
		RotateCcw as IconRegenerate,
		Type as IconReusePrompt,
		Asterisk as IconAsteriks,
		MoreVertical as IconThreeDotsVertical,
		Expand as IconUpscale,
		Download as IconDownload,
		Forward as IconSend,
		ArrowUp as IconDirectoryUp
	} from 'lucide-svelte';

	import Page from '$src/routes/+page.svelte';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import TooltipButton from '$lib/components/spark/button/TooltipButton.svelte';

	export let stylePrompts: boolean = false;

	let seed = 0;
	let randomize = false;

	let samplingSteps = 30;
	let iterations = 4;
	let cfgScale = 7.5;

	let imageWidth = 512;
	let imageHeight = 768;

	let sldImageWidth = [imageWidth];
	let sldImageHeight = [imageHeight];

	let cbxImageSize = '';
	$: customImageSize = cbxImageSize === 'Custom';

	const samplers = [
		{
			label: 'Euler Ancestral',
			value: 'euler_a'
		},
		{
			label: 'DPM++ 2M Karras',
			value: 'dpmpp_2m_karras'
		}
	];

	const vaePrecision = [
		{
			label: 'fp16',
			value: 'fp16'
		},
		{
			label: 'fp32',
			value: 'fp32	'
		}
	];

	const vaes = [
		{
			label: 'Default',
			value: 'default'
		},
		{
			label: 'Color101',
			value: 'color101'
		}
	];

	const sizes = [
		{
			label: '512x512',
			value: '512x512'
		},
		{
			label: '512x768',
			value: '512x768'
		},
		{
			label: '768x512',
			value: '768x512'
		},
		{
			label: '768x768',
			value: '768x768'
		},
		{
			label: 'Custom',
			value: 'custom'
		}
	];

	let loras: { name: string; weight: number }[] = [];
	function removeLora(i: number) {
		let temp = [...loras];
		if (i > -1) {
			temp.splice(i, 1);
		}
		loras = temp;
	}

	function generate() {
		console.log('Loras:', loras);
		console.log('Image Size:', cbxImageSize);
	}

	// Internal States
	let modelSelectorOpen = false;
	let loraSelectorOpen = false;

	let selectedCheckpoint = '';

	let currentImage = {
		url: `https://picsum.photos/512/768`
	};
</script>

<div class="grid grid-cols-[30%_auto_30%] h-full gap-2">
	<!-- Generation Data -->
	<div>
		<div class="grid grid-cols-[auto_auto_auto]">
			<Button class="mr-1" on:click={generate}>Generate</Button>
			<Button variant="outline" size="icon"><IconZap /></Button>

			<div class="float-right">
				<Button class="float-right ml-1" variant="destructive" size="icon"><IconDelete /></Button>
				<Button class="float-right ml-1" variant="destructive" size="icon"><IconCancel /></Button>
			</div>
		</div>

		<div class="block">
			<Progress value={33} class="w-full mt-3" />
			<p class="float-right">25% - ETA: 23s</p>
		</div>
		<br />

		<div class="block overflow-y-auto overflow-x-hidden mt-2" style="height: calc(100vh - 180px);">
			<Accordion.Root multiple={true}>
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="text-2xl">Base Settings</Accordion.Trigger>
					<Accordion.Content>
						<p class="mb-1">Prompts</p>
						<SectionPrompt
							bind:prompt
							bind:stylePrompt
							bind:negativePrompt
							bind:negativeStylePrompt
							{stylePrompts}
						/>

						<br />

						<div class="w-full grid grid-cols-1 gap-2 mb-4">
							<div>
								<p class="mb-1">Checkpoint</p>
								<Button
									variant="outline"
									id="model_selector"
									class="w-full"
									on:click={() => {
										modelSelectorOpen = true;
									}}>{selectedCheckpoint}</Button
								>
							</div>
						</div>

						<div class="w-full grid grid-cols-3 gap-2 mb-4">
							<div>
								<p class="mb-1">Steps</p>
								<Input bind:value={samplingSteps} num />
							</div>
							<div>
								<p class="mb-1">Iterations</p>
								<Input bind:value={iterations} num />
							</div>
							<div>
								<p class="mb-1">CFG Scale</p>
								<Input bind:value={cfgScale} step={0.5} num />
							</div>
						</div>

						<div class="w-full grid grid-cols-[40%_35%_auto] gap-2 mb-4">
							<div>
								<p class="mb-1">Sampler</p>
								<Combobox items={samplers} />
							</div>

							<div>
								<p class="mb-1">VAE</p>
								<Combobox items={vaes} />
							</div>

							<div>
								<p class="mb-1">Precision</p>
								<Combobox items={vaePrecision} />
							</div>
						</div>

						<p class="mb-1">Seed</p>
						<div class="w-full grid grid-cols-[55%_15%_auto] gap-2 mb-4">
							<div>
								<Input value={seed} disabled={randomize} num />
							</div>

							<div>
								<Button
									variant="outline"
									on:click={() => {
										seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
									}}><IconRandom /></Button
								>
							</div>

							<div class="flex items-center">
								<Switch id="seed_random" bind:checked={randomize} />
								<Label for="seed_random" class="ml-4">Randomize</Label>
							</div>
						</div>

						<div>
							<p class="mb-1">Image Size</p>
							<Combobox items={sizes} bind:selectedValue={cbxImageSize} />

							{#if customImageSize}
								<div class="w-full grid grid-cols-[10%_auto_5%_40%] gap-2 items-center mt-2">
									<p class="ml-2">Width</p>
									<Slider
										class="mr-2"
										style="transform: translateX(16px);"
										max={2048}
										min={64}
										bind:value={sldImageWidth}
										onValueChange={(v) => {
											imageWidth = v[0];
										}}
									/>
									<div></div>
									<Input
										bind:value={imageWidth}
										on:change={(e) => {
											sldImageWidth = [e.target.value];
										}}
										step={64}
										num
									/>
								</div>
								<div class="w-full grid grid-cols-[10%_auto_5%_40%] gap-2 items-center mt-2">
									<p class="ml-2">Height</p>
									<Slider
										class="mr-2"
										style="transform: translateX(16px);"
										max={2048}
										min={64}
										bind:value={sldImageHeight}
										onValueChange={(v) => {
											imageHeight = v[0];
										}}
									/>
									<div></div>
									<Input
										bind:value={imageHeight}
										on:change={(e) => {
											sldImageHeight = [e.target.value];
										}}
										step={64}
										num
									/>
								</div>
							{/if}
						</div>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-2">
					<Accordion.Trigger class="text-2xl">Highres. Fix</Accordion.Trigger>
					<Accordion.Content></Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-3">
					<Accordion.Trigger class="text-2xl"
						>LoRAs {loras.length > 0 ? `(${loras.length})` : ''}</Accordion.Trigger
					>
					<Accordion.Content>
						<Button
							on:click={() => {
								loraSelectorOpen = true;
							}}><IconAdd class="mr-2" /> Add Lora</Button
						>

						{#each loras as lora, i}
							<div class="grid grid-cols-[40%_auto] items-center">
								<p>{lora.name}</p>
								<div class="grid grid-cols-[40%_auto] grid-rows-1 justify-end">
									<Input bind:value={lora.weight} step={0.05} num class="mt-2 float-left" />
									<div>
										<TooltipButton
											tooltip="Remove LoRA"
											class="float-right ml-2 float-right ml-2 translate-y-[8px]"
											variant="destructive"
										>
											<IconDelete />
										</TooltipButton>

										<TooltipButton
											tooltip="Copy Trigger Words"
											class="float-right ml-2 translate-y-[8px]"
										>
											<IconCopy />
										</TooltipButton>
									</div>
								</div>
							</div>
						{/each}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

			<!-- Fullscreen Popups -->
			<ModelSelector
				title="Model Selector"
				bind:open={modelSelectorOpen}
				bind:selected={selectedCheckpoint}
			/>
			<LoRASelector
				title="LoRA Selector"
				bind:open={loraSelectorOpen}
				onChange={(name) => {
					for (var lora of loras) {
						if (lora.name === name) return;
					}

					let temp = [...loras];
					temp.push({ name, weight: 0.75 });
					loras = temp.sort((a, b) => a.name.localeCompare(b.name));
				}}
				ignore={loras.map((e) => e.name)}
			/>
		</div>
	</div>
	<!-- Result -->
	<div class="pl-8 pr-8">
		<!-- Toolbar Buttons -->
		<div class="block w-full">
			<div class="w-fit m-[0_auto] flex items-center bg-primary p-4 pt-2 pb-2 rounded-xl">
				<div class="mr-4">
					<!-- More Options -->
					<TooltipButton tooltip="More Options..." variant="outline">
						<IconThreeDotsVertical />
					</TooltipButton>
				</div>
				<div class="mr-4">
					<!-- Reuse Prompt -->
					<TooltipButton tooltip="Reuse Prompt" variant="outline">
						<IconReusePrompt />
					</TooltipButton>
					<!-- Reuse Seed -->
					<TooltipButton tooltip="Reuse Seed" variant="outline">
						<IconReuseSeed />
					</TooltipButton>
					<!-- Reuse All -->
					<TooltipButton tooltip="Reuse all" variant="outline">
						<IconAsteriks />
					</TooltipButton>
				</div>
				<div class="mr-4">
					<!-- Upscale Image -->
					<TooltipButton tooltip="Upscale..." variant="outline">
						<IconUpscale />
					</TooltipButton>
					<!-- Download Image -->
					<TooltipButton tooltip="Download Image..." variant="outline">
						<IconDownload />
					</TooltipButton>
					<!-- Send to (img2img, nodes, ...) -->
					<TooltipButton tooltip="Send to..." variant="outline">
						<IconSend />
					</TooltipButton>
				</div>
				<div class="">
					<!-- Delete this image -->
					<TooltipButton tooltip="Delete Image" variant="destructive">
						<IconCancel />
					</TooltipButton>
					<!-- Delete entire batch -->
					<TooltipButton tooltip="Delete Batch" variant="destructive">
						<IconDelete />
					</TooltipButton>
				</div>
			</div>
		</div>

		<!-- Image Output -->
		<div class="w-full h-full flex items-center">
			<img
				class="rounded-xl m-[0_auto]"
				src={currentImage.url}
				alt="generated"
				width="auto"
				height="auto"
				draggable={false}
			/>
		</div>
	</div>
	<!-- Image Browser -->
	<ImageBrowser root="/images/generated/output" bind:selectedImage={currentImage} />
</div>
