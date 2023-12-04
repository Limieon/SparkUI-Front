<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import type { Pages } from '$lib/types/Pages';
	import { hotkey } from '@svelteuidev/composables';

	let open = false;

	export let settingsOpen = false;
	export let currentPage: Pages;
</script>

<div
	use:hotkey={[
		[
			'mod+shift+p',
			() => {
				open = !open;
			}
		],
		[
			'f1',
			() => {
				open = !open;
			}
		]
	]}
></div>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		<Command.Group heading="Open Page...">
			<Command.Item
				onSelect={() => {
					currentPage = 'txt2img';
					open = false;
				}}>Text to Image</Command.Item
			>
			<Command.Item
				onSelect={() => {
					currentPage = 'img2img';
					open = false;
				}}>Image to Image</Command.Item
			>
			<Command.Item
				onSelect={() => {
					currentPage = 'node';
					open = false;
				}}>Node Editor</Command.Item
			>
			<Command.Item
				onSelect={() => {
					currentPage = 'scripts';
					open = false;
				}}>Script Manager</Command.Item
			>
			<Command.Item
				onSelect={() => {
					currentPage = 'models';
					open = false;
				}}>Model Manager</Command.Item
			>
			<Command.Item
				onSelect={() => {
					currentPage = 'queue';
					open = false;
				}}>Queue</Command.Item
			>
		</Command.Group>

		<Command.Group heading="Settings">
			<Command.Item
				onSelect={() => {
					settingsOpen = true;
					open = false;
				}}>Open Settings</Command.Item
			>
		</Command.Group>
	</Command.List>
</Command.Dialog>
