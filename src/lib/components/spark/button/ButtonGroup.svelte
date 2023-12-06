<script lang="ts">
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';

	let divClasses: string[] = [];

	if (orientation === 'horizontal') {
		divClasses.push('w-full grid grid-flow-col grid-rows-1 gap-2');
	} else {
		divClasses.push('w-full grid grid-flow-row grid-cols-1 gap-2');
	}
</script>

<div class={divClasses.join(' ')}>
	<slot />
</div>
