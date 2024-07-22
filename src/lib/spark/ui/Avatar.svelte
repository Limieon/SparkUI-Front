<script lang="ts">
	export let avatar: string;

	let classNames: string = '';
	export { classNames as class };
</script>

<img src={avatar} alt="avatar" class="rounded-full {classNames}" />
