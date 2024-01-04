<script lang="ts">
	import { onMount } from 'svelte';

	import PageLayout from '$lib/components/spark/layouts/MainPageLayout.svelte';

	import Text2Image from '$page/Text2Image.svelte';
	import Image2Image from '$page/Image2Image.svelte';
	import ModelManager from '$page/ModelManager.svelte';
	import Queue from '$page/Queue.svelte';
	import ScriptManager from '$page/ScriptManager.svelte';
	import NodeEditor from '$page/NodeEditor.svelte';

	import { Separator } from '$lib/components/ui/separator';

	import ThemeSwitcher from '$spark/ThemeSwitcher.svelte';
	import { TooltipButton } from '$spark/button';

	import { SettingsMenu } from '$spark/settings';
	import { CommandPalette } from '$spark/commandPalette';

	import {
		Type as IconType,
		Image as IconImage,
		Box as IconBox,
		Settings as IconSettings,
		AlignJustify as IconList,
		FileJson as IconScripts,
		Workflow as IconNode
	} from 'lucide-svelte';

	import type { Pages } from '$lib/types/Pages';
	import type { PageData } from './$types';

	import { Socket_CivitAIImporterUpdate, currentImage } from '$lib/stores';
	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	onMount(() => {
		connectWebSocket();
	});

	const connectWebSocket = () => {
		socket = new WebSocket(`ws://${SPARKUI_BACK_HOST}`);
		status = 'connecting';

		socket.addEventListener('open', (e) => {
			console.log('WebSocket connection opened:', e);

			status = 'connected';
		});

		socket.addEventListener('message', (e) => {
			console.log('WebSocket message received:', e.data);

			const rawData = JSON.parse(e.data);

			const { id, data } = rawData;

			switch (id) {
				case 'civitai_importer_update': {
					Socket_CivitAIImporterUpdate.set(data);
					break;
				}
				case 'on_image_generated': {
					currentImage.set(`http://${SPARKUI_BACK_HOST}/v1/image/${data.id}/full.png`);
					break;
				}
				default: {
					console.log(`Unimplemented message id! ${id}!`);
					console.log(data);
				}
			}
		});

		socket.addEventListener('close', (e) => {
			console.log('WebSocket connection closed:', e);

			status = 'disconnected';
		});

		socket.addEventListener('error', (e) => {
			console.error('WebSocket error:', e);
		});
	};

	const sendMessage = () => {
		const message = 'Hello, WebSocket!';
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(message);
			console.log('Sent message:', message);
		} else {
			console.warn('WebSocket connection not open.');
		}
	};
	let socket: WebSocket;

	let status: 'connected' | 'connecting' | 'disconnected';

	let page: Pages = 'models';

	let settingsOpen = false;
</script>

<PageLayout bind:status>
	<span slot="nav">
		<TooltipButton
			variant={page === 'txt2img' ? 'default' : 'outline'}
			size="icon"
			tooltip="Text to Image"
			on:click={() => {
				page = 'txt2img';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconType size={32} />
			<span class="sr-only">Open Text to Image</span>
		</TooltipButton>
		<TooltipButton
			variant={page === 'img2img' ? 'default' : 'outline'}
			size="icon"
			tooltip="Image to Image"
			on:click={() => {
				page = 'img2img';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconImage size={32} />
			<span class="sr-only">Open Image to Image</span>
		</TooltipButton>
		<TooltipButton
			variant={page === 'node' ? 'default' : 'outline'}
			size="icon"
			tooltip="Node Editor"
			on:click={() => {
				page = 'node';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconNode size={32} />
			<span class="sr-only">Open Node Editor</span>
		</TooltipButton>
		<TooltipButton
			variant={page === 'scripts' ? 'default' : 'outline'}
			size="icon"
			tooltip="Script Manager"
			on:click={() => {
				page = 'scripts';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconScripts size={32} />
			<span class="sr-only">Open Script Manager</span>
		</TooltipButton>
		<TooltipButton
			variant={page === 'models' ? 'default' : 'outline'}
			size="icon"
			tooltip="Model Manager"
			on:click={() => {
				page = 'models';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconBox size={32} />
			<span class="sr-only">Open Model Manager</span>
		</TooltipButton>
		<TooltipButton
			variant={page === 'queue' ? 'default' : 'outline'}
			size="icon"
			tooltip="Generation Queue"
			on:click={() => {
				page = 'queue';
			}}
			class="w-[48px] h-[48px] mb-2"
		>
			<IconList size={32} />
			<span class="sr-only">Open Queue</span>
		</TooltipButton>

		<Separator class="w-[48px] mt-2 mb-4" />

		<TooltipButton
			variant="outline"
			size="icon"
			tooltip="Settings..."
			on:click={() => {
				settingsOpen = true;
			}}
			class="w-[48px] h-[48px]"
		>
			<IconSettings size={32} />
			<span class="sr-only">Open Settings</span>
		</TooltipButton>

		<ThemeSwitcher class="w-[48px] h-[48px] fixed bottom-4 left-2" />
	</span>

	{#if page == 'txt2img'}
		<Text2Image bind:currentPage={page} bind:settingsOpen />
	{:else if page == 'img2img'}
		<Image2Image />
	{:else if page == 'models'}
		<ModelManager />
	{:else if page == 'queue'}
		<Queue />
	{:else if page == 'scripts'}
		<ScriptManager />
	{:else if page == 'node'}
		<NodeEditor />
	{/if}

	<SettingsMenu bind:open={settingsOpen} />
</PageLayout>
