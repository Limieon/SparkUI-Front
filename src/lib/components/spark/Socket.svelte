<script>
	import { writable } from 'svelte/store';
	import { createEventDispatcher, onMount } from 'svelte';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	const dispatcher = createEventDispatcher();
	let ws;

	// Initialize WebSocket connection
	function startWebSocket() {
		ws = new WebSocket(`ws://${SPARKUI_BACK_HOST}/v1/ws`);

		ws.onmessage = (e) => {
			const message = JSON.parse(e.data);
			console.log(message);
			dispatcher(message.type, message.data);
		};
	}

	onMount(startWebSocket);
</script>
