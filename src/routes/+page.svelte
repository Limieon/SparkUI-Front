<script lang="ts">
	import PageLayout from '$lib/components/spark/MainPageLayout.svelte';

	import Text2Image from '$page/Text2Image.svelte';
	import Image2Image from '$page/Image2Image.svelte';
	import ModelManager from '$page/ModelManager.svelte';
	import Queue from '$page/Queue.svelte';
	import Settings from '$page/Settings.svelte';

	import { Button } from '$lib/components/ui/button';

	import {
		Type as IconType,
		Image as IconImage,
		Box as IconBox,
		Settings as IconSettings,
		AlignJustify as IconList
	} from 'lucide-svelte';

	let page: 'txt2img' | 'img2img' | 'models' | 'settings' | 'queue' = 'txt2img';
</script>

<PageLayout>
	<span slot="nav">
		<Button
			variant="outline"
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
			variant="outline"
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
			variant="outline"
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
			variant="outline"
			size="icon"
			on:click={() => {
				page = 'queue';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconList size={32} />
			<span class="sr-only">Open Queue</span>
		</Button>

		<Button
			variant="outline"
			size="icon"
			on:click={() => {
				page = 'settings';
			}}
			class="w-[48px] h-[48px] fixed bottom-4 left-2"
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
	{/if}
</PageLayout>
