<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Separator } from '$lib/components/ui/separator';
	import { Progress } from '$lib/components/ui/progress';
	import { Input } from '$lib/components/ui/input';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Switch } from '$lib/components/ui/switch';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Slider } from '$lib/components/ui/slider';

	import Combobox from '$spark/Combobox.svelte';

	import {
		Zap as IconZap,
		ListStart as IconListStart,
		Trash2 as IconDelete,
		X as IconCancel,
		Replace as IconModelSwitcher,
		Dices as IconRandom,
		ArrowDownUp as IconSwap,
		Plus as IconAdd,
		Copy as IconCopy
	} from 'lucide-svelte';
	import Page from '$src/routes/+page.svelte';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';

	export let stylePrompts: boolean = false;

	let seed = 0;
	let randomize = false;

	let samplingSteps = 30;
	let iterations = 4;

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

	let loras = [
		{
			name: 'Lora 1',
			id: 'lora1',
			weight: 1.25
		},
		{
			name: 'Lora 2',
			id: 'lora2',
			weight: 0.75
		}
	];
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
</script>

<div class="grid grid-cols-3 h-full gap-2">
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

		<div class="block overflow-y-auto" style="height: calc(100vh - 120px);">
			<Accordion.Root multiple={true}>
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="text-2xl">Base Settings</Accordion.Trigger>
					<Accordion.Content>
						{#if stylePrompts}
							<Textarea placeholder="Positive Prompt" class="mb-2" />
							<Textarea placeholder="Positive Style Prompt" class="mb-2" />
							<Textarea placeholder="Negative Prompt" class="mb-2" />
							<Textarea placeholder="Negative Style Prompt" />
						{:else}
							<Textarea placeholder="Positive Prompt" class="mb-2" />
							<Textarea placeholder="Negative Prompt" />
						{/if}

						<br />

						<div class="w-full grid grid-cols-[auto_17%_17%] gap-2 mb-4">
							<div>
								<p class="mb-1">Checkpoint</p>
								<Button variant="outline" id="model_selector" class="w-full">Dreamshaper V8</Button>
							</div>
							<div>
								<p class="mb-1">Steps</p>
								<Input bind:value={samplingSteps} num />
							</div>
							<div>
								<p class="mb-1">Iterations</p>
								<Input bind:value={iterations} num />
							</div>
						</div>

						<div class="w-full grid grid-cols-[40%_30%_auto] gap-2 mb-4">
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
										max={1024}
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
										max={1024}
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
					<Accordion.Trigger class="text-2xl">LoRAs</Accordion.Trigger>
					<Accordion.Content>
						<Button><IconAdd class="mr-2" /> Add Lora</Button>

						{#each loras as lora, i}
							<div class="grid grid-cols-[40%_auto] items-center">
								<p>{lora.name}</p>
								<div class="grid grid-cols-[40%_auto] grid-rows-1 justify-end">
									<Input bind:value={lora.weight} num class="mt-2 float-left" />
									<div>
										<Button
											variant="destructive"
											size="icon"
											class="float-right ml-1"
											style="transform: translateY(8px);"
											on:click={() => removeLora(i)}><IconDelete /></Button
										>
										<Button
											variant="default"
											size="icon"
											class="float-right ml-2"
											style="transform: translateY(8px);"><IconCopy /></Button
										>
									</div>
								</div>
							</div>
						{/each}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	</div>
	<!-- Result -->
	<div class="bg-lime-800"></div>
	<!-- Image Browser -->
	<div class="bg-purple-800"></div>
</div>
