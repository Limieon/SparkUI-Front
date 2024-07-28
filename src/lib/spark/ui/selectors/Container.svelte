<script lang="ts">
	import { Input } from '$ui/input';
	import { Button } from '$ui/button';
	import { Popup, type SelectionEntry } from '$spark/popup';
	import * as Pagination from '$ui/pagination';
	import { Badge } from '$ui/badge';
	import * as Select from '$ui/select';
	import { writable } from 'svelte/store';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let open: boolean;
	export let title: string;

	function handleSelect(id: string) {
		dispatch('select', id);
	}

	export let items: SelectionEntry[] = [];

	const selectedSDVersions = writable([]);

	const sdVersions = ['SD1.5', 'SD2.1', 'SDXL', 'SDXL-Turbo', 'SDXL-Lightning'];

	console.log(items);
</script>

<Popup
	hideFooter={true}
	{title}
	class="flex flex-col overflow-y-hidden"
	size="xl"
	bind:open
	on:close={() => {
		open = false;
	}}
>
	<slot />
</Popup>
