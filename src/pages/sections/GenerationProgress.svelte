<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';

	let classNames: string = '';
	export { classNames as class };
</script>

<div class="{classNames} font-mono">
	<p>Queue: 35/50<span class="float-right">2m32s</span></p>
	<Progress value={(35 / 50) * 100} class="w-full mt-1" innerClass="bg-primary" />
	<p class="mt-1">Steps: 21/45<span class="float-right">0m23s</span></p>
	<Progress value={(21 / 45) * 100} class="w-full mt-1" innerClass="bg-accent" />
</div>
