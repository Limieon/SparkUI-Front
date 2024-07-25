<script lang="ts">
	import { Button } from '$ui/button';
	import { Popup } from '$spark/popup';

	export let open: boolean = false;

	function onClose() {
		open = false;
	}
	function onOk() {
		open = false;
	}
	function onApply() {
		open = false;
	}
</script>

<Popup bind:open size="2xl" title="Settings" on:close={onClose}>
	{#each { length: 200 } as _}
		<p class="mb-2">Setting 1</p>
	{/each}

	<div slot="footer">
		<Button variant="ghost" class="w-24" on:click={onApply}>Apply</Button>
		<Button variant="ghost" class="w-24" on:click={onOk}>OK</Button>
		<Button variant="ghost" class="w-24" on:click={onClose}>Close</Button>
	</div>
</Popup>
