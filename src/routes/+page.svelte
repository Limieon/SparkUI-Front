<script lang="ts">
	import Tooltip from '$ui/button/tooltip.svelte';
	import PageLayout from '$spark/MainLayout.svelte';
	import { Separator } from '$ui/separator';

	import {
		Txt2Img,
		Img2Img,
		InstalledModels,
		ModelBrowser,
		Settings,
		OutputImages,
		Downloads,
		Queue,
		type Pages
	} from '$pages';

	import ThemeSwitcher from '$spark/ThemeSwitcher.svelte';

	import { Button, TooltipButton } from '$ui/button';
	import IconType from 'lucide-svelte/icons/type';
	import IconImage from 'lucide-svelte/icons/image';
	import IconBrowser from 'lucide-svelte/icons/earth';
	import IconBook from 'lucide-svelte/icons/book';
	import IconSettings from 'lucide-svelte/icons/settings';
	import IconImages from 'lucide-svelte/icons/images';
	import IconListEnd from 'lucide-svelte/icons/list-end';
	import IconDownloads from 'lucide-svelte/icons/download';

	let page: Pages = 'txt2img';
	let settingsOpen = false;
</script>

<PageLayout>
	<span slot="nav">
		<TooltipButton
			variant={page === 'txt2img' ? 'default' : 'outline'}
			size="icon"
			tooltip="Text to Image"
			on:click={() => {
				page = 'txt2img';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconType size={32} />
		</TooltipButton>

		<TooltipButton
			variant={page === 'img2img' ? 'default' : 'outline'}
			size="icon"
			tooltip="Text to Image"
			on:click={() => {
				page = 'img2img';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconImage size={32} />
		</TooltipButton>

		<TooltipButton
			variant={page === 'modelBrowser' ? 'default' : 'outline'}
			size="icon"
			tooltip="Model Browser"
			on:click={() => {
				page = 'modelBrowser';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconBrowser size={32} />
		</TooltipButton>

		<TooltipButton
			variant={page === 'installedModels' ? 'default' : 'outline'}
			size="icon"
			tooltip="Installed Models"
			on:click={() => {
				page = 'installedModels';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconBook size={32} />
		</TooltipButton>

		<TooltipButton
			variant={page === 'outputImages' ? 'default' : 'outline'}
			size="icon"
			tooltip="Output Images"
			on:click={() => {
				page = 'outputImages';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconImages size={32} />
		</TooltipButton>

		<TooltipButton
			variant={page === 'queue' ? 'default' : 'outline'}
			size="icon"
			tooltip="Queue"
			on:click={() => {
				page = 'queue';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconListEnd size={32} />
		</TooltipButton>

		<TooltipButton
			variant={page === 'downloads' ? 'default' : 'outline'}
			size="icon"
			tooltip="Downloads"
			on:click={() => {
				page = 'downloads';
			}}
			class="mb-2 h-[48px] w-[48px]"
		>
			<IconDownloads size={32} />
		</TooltipButton>

		<Separator class="mb-4 mt-2 w-[48px]" />

		<TooltipButton
			variant="outline"
			size="icon"
			tooltip="Settings..."
			on:click={() => {
				settingsOpen = true;
			}}
			class="h-[48px] w-[48px]"
		>
			<IconSettings size={32} />
			<span class="sr-only">Open Settings</span>
		</TooltipButton>

		<ThemeSwitcher class="fixed bottom-4 left-2 h-[48px] w-[48px]" />
	</span>

	{#if page === 'txt2img'}
		<Txt2Img />
	{:else if page === 'img2img'}
		<Img2Img />
	{:else if page === 'modelBrowser'}
		<ModelBrowser />
	{:else if page === 'installedModels'}
		<InstalledModels />
	{:else if page === 'outputImages'}
		<OutputImages />
	{:else if page === 'queue'}
		<Queue />
	{:else if page === 'downloads'}
		<Downloads />
	{/if}

	<Settings bind:open={settingsOpen} />
</PageLayout>
