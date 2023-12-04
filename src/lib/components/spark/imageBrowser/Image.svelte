<script lang="ts">
	export let url: string;
</script>

<button class="w-full h-full" on:click
	><img class="block rounded bg-cover bg-center w-full aspect-square" src={url} alt="" />
</button>
