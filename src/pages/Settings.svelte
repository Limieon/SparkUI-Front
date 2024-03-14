<script lang="ts">
	import Popup from '$spark/Popup.svelte';

	export let open: boolean = false;
</script>

<Popup title="Settings" bind:open class="bottom-32 left-96 right-96 top-32 bg-primary"></Popup>
