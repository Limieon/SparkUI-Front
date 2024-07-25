<script lang="ts">
	import { Popup } from '$spark/popup';

	export let open: boolean = false;
</script>

<Popup bind:open size="2xl" title="Settings">
	{#each { length: 200 } as _}
		<p class="mb-2">Setting 1</p>
	{/each}
</Popup>
