<script lang="ts">
	import { Popup } from '$spark/popup';

	export let open: boolean = false;

	function onApply() {}
	function onClose() {
		open = false;
	}
	function onCancel() {}
</script>

<Popup bind:open title="Settings" close="OK" {onApply} {onCancel} {onClose}>
	<div class="grid h-full grid-cols-[20%_auto] gap-2">
		<ul class="menu overflow-y-auto p-2">
			<li><a href="#general">General</a></li>
			<li><a href="#server">Server</a></li>
		</ul>

		<div class="border-neutral-content overflow-y-auto border-l-2 p-2">
			<section id="general" />
			<h2 class="underline">General</h2>
			{#each { length: 200 } as _}
				<p>-</p>
			{/each}
			<section id="server" />
			<h2 class="underline">Server</h2>
			{#each { length: 50 } as _}
				<p>-</p>
			{/each}
		</div>
	</div>
</Popup>
