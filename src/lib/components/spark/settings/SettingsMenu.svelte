<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import * as Accordion from '$lib/components/ui/accordion';

	import { hotkey } from '@svelteuidev/composables';

	import SectionQueue from './sections/SectionQueue.svelte';

	import { Popup } from '$spark/popup';

	export let open: boolean = false;
</script>

<Popup title="Settings" bind:open class="top-32 left-96 bottom-32 right-96 bg-primary">
	<Accordion.Root multiple={true}>
		<Accordion.Item value="item-1">
			<Accordion.Trigger class="text-2xl">Queue Settings</Accordion.Trigger>
			<Accordion.Content>
				<SectionQueue />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</Popup>

{#if !open}
	<div
		use:hotkey={[
			[
				'mod+comma',
				() => {
					open = true;
				}
			]
		]}
	></div>
{/if}
