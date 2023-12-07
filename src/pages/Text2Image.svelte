<script lang="ts">
	import { onMount } from 'svelte';
	import { txt2imageData as genData, txt2imageData } from '$lib/stores';
	import { browser } from '$app/environment';

	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import * as Accordion from '$lib/components/ui/accordion';

	import Combobox from '$spark/Combobox.svelte';
	import { ModelSelector, LoRASelector } from '$lib/components/spark/selector';

	import { CommandPalette } from '$spark/commandPalette';
	import { ImageBrowser } from '$spark/imageBrowser';

	import {
		Item as CmdItem,
		Group as CmdGroup,
		CommandDialog as CmdDialog
	} from '$lib/components/ui/command';

	/* ---> Sections <--- */
	import SectionPrompt from './sections/SectionPrompt.svelte';
	import GenerationProgress from './sections/GenerationProgress.svelte';
	import ImageSize from './sections/ImageSize.svelte';

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

	import { TooltipButton } from '$spark/button';

	import type { Pages } from '$lib/types/Pages';

	export let stylePrompts: boolean = false;

	let randomize = false;

	let imageWidth = 512;
	let imageHeight = 768;

	let cbxImageSize = '';

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

	let loras: { name: string; weight: number }[] = [];
	function removeLora(i: number) {
		let temp = [...$genData.loras];
		if (i > -1) {
			temp.splice(i, 1);
		}
		$genData.loras = temp;
	}

	function generate() {
		console.log('Loras:', loras);
		console.log('Image Size:', `${imageWidth} x ${imageHeight}`);
	}

	// Internal States
	let modelSelectorOpen = false;
	let loraSelectorOpen = false;
	let paletteOpen = false;

	let currentImage = {
		url: `https://picsum.photos/512/768`
	};

	export let settingsOpen = false;
	export let currentPage: Pages = 'txt2img';
</script>

<div class="grid grid-cols-[30%_auto_25%] h-full gap-2">
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

		<GenerationProgress class="mt-2" />

		<div class="block overflow-y-auto overflow-x-hidden" style="height: calc(100vh - 180px);">
			<Accordion.Root multiple={true}>
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="text-2xl"
						><p>
							Base Settings (<span class="text-primary font-mono"
								>{$genData.steps}<span class="text-foreground">x</span>{`${
									$genData.iterations < 10 ? ' ' : ''
								}`}{$genData.iterations}</span
							>)
						</p></Accordion.Trigger
					>
					<Accordion.Content>
						<p class="mb-1">Prompts</p>
						<SectionPrompt
							bind:prompt={$genData.prompt}
							bind:stylePrompt={$genData.stylePrompt}
							bind:negativePrompt={$genData.negativePrompt}
							bind:negativeStylePrompt={$genData.negativeStylePrompt}
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
									}}>{$genData.checkpoint}</Button
								>
							</div>
						</div>

						<div class="w-full grid grid-cols-3 gap-2 mb-4">
							<div>
								<p class="mb-1">Steps</p>
								<Input bind:value={$genData.steps} num />
							</div>
							<div>
								<p class="mb-1">Iterations</p>
								<Input bind:value={$genData.iterations} num />
							</div>
							<div>
								<p class="mb-1">CFG Scale</p>
								<Input bind:value={$genData.cfgScale} step={0.5} num />
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
								<Input value={$genData.seed} disabled={randomize} num />
							</div>

							<div>
								<Button
									variant="outline"
									on:click={() => {
										$genData.seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
									}}><IconRandom /></Button
								>
							</div>

							<div class="flex items-center">
								<Switch id="seed_random" bind:checked={randomize} />
								<Label for="seed_random" class="ml-4">Randomize</Label>
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-2">
					<Accordion.Trigger class="text-2xl w-full">
						<p class="w-fit">
							Image Size (<span class="font-mono"
								><span class="text-primary w-fit">{$genData.outputWidth}</span>x<span
									class="text-primary w-fit">{$genData.outputHeight}</span
								></span
							>)
						</p>
					</Accordion.Trigger>
					<Accordion.Content>
						<ImageSize bind:width={$genData.outputWidth} bind:height={$genData.outputHeight} />
					</Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-3">
					<Accordion.Trigger class="text-2xl">Highres. Fix</Accordion.Trigger>
					<Accordion.Content></Accordion.Content>
				</Accordion.Item>

				<Accordion.Item value="item-4">
					{#if $genData.loras.length > 0}
						<Accordion.Trigger class="text-2xl"
							><p>
								LoRAs (<span class="text-primary font-mono">{$genData.loras.length}</span>)
							</p></Accordion.Trigger
						>
					{:else}
						<Accordion.Trigger class="text-2xl">LoRAs</Accordion.Trigger>
					{/if}

					<Accordion.Content>
						<Button
							on:click={() => {
								loraSelectorOpen = true;
							}}><IconAdd class="mr-2" /> Add Lora</Button
						>

						{#each $genData.loras as lora, i}
							<div class="grid grid-cols-[40%_auto] items-center">
								<p>{lora.name}</p>
								<div class="grid grid-cols-[40%_auto] grid-rows-1 justify-end">
									<Input bind:value={lora.weight} step={0.05} num class="mt-2 float-left" />
									<div>
										<TooltipButton
											tooltip="Remove LoRA"
											class="float-right ml-2 float-right ml-2 translate-y-[8px]"
											variant="destructive"
											on:click={() => removeLora(i)}
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
			<ModelSelector bind:open={modelSelectorOpen} bind:selected={$genData.checkpoint} />
			<LoRASelector
				bind:open={loraSelectorOpen}
				onChange={(name) => {
					for (var lora of loras) {
						if (lora.name === name) return;
					}

					let temp = [...$genData.loras];
					temp.push({ name, weight: 0.75 });
					$genData.loras = temp.sort((a, b) => a.name.localeCompare(b.name));
				}}
				ignore={$genData.loras.map((e) => e.name)}
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

<CommandPalette bind:settingsOpen bind:currentPage bind:open={paletteOpen}>
	<CmdGroup heading="Text to Image">
		<CmdItem
			onSelect={() => {
				modelSelectorOpen = true;
				paletteOpen = false;
			}}>Select Checkpoint...</CmdItem
		>
		<CmdItem
			onSelect={() => {
				loraSelectorOpen = true;
				paletteOpen = false;
			}}>Add LoRA...</CmdItem
		>
	</CmdGroup>
</CommandPalette>
