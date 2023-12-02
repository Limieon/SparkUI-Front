<script lang="ts">
	import PageLayout from '$lib/components/spark/MainPageLayout.svelte';

	import Text2Image from '$page/Text2Image.svelte';
	import Image2Image from '$page/Image2Image.svelte';
	import ModelManager from '$page/ModelManager.svelte';
	import Queue from '$page/Queue.svelte';
	import Settings from '$page/Settings.svelte';
	import ScriptManager from '$page/ScriptManager.svelte';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import {
		Type as IconType,
		Image as IconImage,
		Box as IconBox,
		Settings as IconSettings,
		AlignJustify as IconList,
		FileJson as IconScripts
	} from 'lucide-svelte';

	let page: 'txt2img' | 'img2img' | 'models' | 'settings' | 'queue' | 'scripts' = 'txt2img';
</script>

<PageLayout>
	<span slot="nav">
		<Button
			variant={page === 'txt2img' ? 'default' : 'outline'}
			size="icon"
			on:click={() => {
				page = 'txt2img';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconType size={32} />
			<span class="sr-only">Open Text to Image</span>
		</Button>
		<Button
			variant={page === 'img2img' ? 'default' : 'outline'}
			size="icon"
			on:click={() => {
				page = 'img2img';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconImage size={32} />
			<span class="sr-only">Open Image to Image</span>
		</Button>
		<Button
			variant={page === 'models' ? 'default' : 'outline'}
			size="icon"
			on:click={() => {
				page = 'models';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconBox size={32} />
			<span class="sr-only">Open Model Manager</span>
		</Button>
		<Button
			variant={page === 'scripts' ? 'default' : 'outline'}
			size="icon"
			on:click={() => {
				page = 'scripts';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconScripts size={32} />
			<span class="sr-only">Open Script Manager</span>
		</Button>
		<Button
			variant={page === 'queue' ? 'default' : 'outline'}
			size="icon"
			on:click={() => {
				page = 'queue';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconList size={32} />
			<span class="sr-only">Open Queue</span>
		</Button>

		<Separator class="w-[48px] mt-2 mb-4" />

		<Button
			variant={page === 'settings' ? 'default' : 'outline'}
			size="icon"
			on:click={() => {
				page = 'settings';
			}}
			class="w-[48px] h-[48px]"
		>
			<IconSettings size={32} />
			<span class="sr-only">Open Settings</span>
		</Button>
	</span>

	{#if page == 'txt2img'}
		<Text2Image />
	{:else if page == 'img2img'}
		<Image2Image />
	{:else if page == 'models'}
		<ModelManager />
	{:else if page == 'queue'}
		<Queue />
	{:else if page == 'settings'}
		<Settings />
	{:else if page == 'scripts'}
		<ScriptManager />
	{/if}
</PageLayout>
