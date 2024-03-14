<script>
	import { writable } from 'svelte/store';
	import { createEventDispatcher, onMount } from 'svelte';

	import { clientID } from '$lib';

	import { PUBLIC_SPARKUI_BACK_HOST as SPARKUI_BACK_HOST } from '$env/static/public';

	import { socket } from '$lib/stores';

	const dispatcher = createEventDispatcher();

	function startWebSocket() {
		if ($socket == undefined || $socket.readyState == WebSocket.CLOSED) {
			console.log('Socket lost connection! Reconnecting...');
			$socket = new WebSocket(`ws://${SPARKUI_BACK_HOST}/v1/ws?client_id=${clientID}`);
		}

		$socket.onmessage = (e) => {
			const message = JSON.parse(e.data);
			console.log(message);
			dispatcher(message.type, message.data);
		};

		$socket.onclose = (e) => {
			console.log('Socket closed!');
		};
	}

	onMount(startWebSocket);
</script>
