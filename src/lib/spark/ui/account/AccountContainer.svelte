<script lang="ts">
	import Avatar from '$spark/Avatar.svelte';
	import { Button } from '$ui/button';

	import IconUser from 'lucide-svelte/icons/user-round';
	import IconEdit from 'lucide-svelte/icons/pencil';
	import IconManage from 'lucide-svelte/icons/settings';
	import IconLogout from 'lucide-svelte/icons/log-out';

	export let name;
	export let email;

	let classNames: string = '';
	export { classNames as class };
</script>

<div
	class="fixed z-50 w-fit rounded-xl border-2 border-foreground/70 bg-background2/90 p-2 drop-shadow-2xl {classNames}"
>
	<div class="grid grid-cols-[max-content_auto] p-4">
		<Avatar avatar="https://picsum.photos/128" class="col-span-1 row-span-2 mr-6 h-14 w-14" />
		<div>
			<h2>{name}</h2>
			<p>{email}</p>
		</div>
	</div>

	<div class="flex flex-col">
		<Button variant="ghost" class="justify-start text-left"
			><IconUser class="ml-4 mr-10" />View Profile</Button
		>
		<Button variant="ghost" class="justify-start text-left"
			><IconEdit class="ml-4 mr-10" />Edit Profile</Button
		>
		<Button variant="ghost" class="justify-start text-left"
			><IconManage class="ml-4 mr-10" />Manage Account</Button
		>
		<Button variant="ghost" class="justify-start text-left text-destructive hover:text-destructive"
			><IconLogout class="ml-4 mr-10" />Sign Out</Button
		>
	</div>
</div>
