<script lang="ts">
	import Avatar from '$spark/Avatar.svelte';

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
	class="bg-base-100 border-neutral-content fixed z-50 w-fit rounded-xl border-2 drop-shadow-2xl {classNames}"
>
	<div class="grid grid-cols-[max-content_auto] p-4">
		<Avatar avatar="https://picsum.photos/128" class="col-span-1 row-span-2 mr-6 h-14 w-14" />
		<div>
			<h2>{name}</h2>
			<p>{email}</p>
		</div>
	</div>

	<button class="btn-block btn-ghost grid grid-cols-[max-content_auto] items-center justify-start"
		><IconUser class="ml-8 mr-10 h-10" /> View Profile</button
	>
	<button class="btn-block btn-ghost grid grid-cols-[max-content_auto] items-center justify-start"
		><IconEdit class="ml-8 mr-10 h-10" />Edit Profile</button
	>
	<button class="btn-block btn-ghost grid grid-cols-[max-content_auto] items-center justify-start"
		><IconManage class="ml-8 mr-10 h-10" />Manage Account</button
	>
	<button
		class="btn-block btn-ghost mt-4 grid grid-cols-[max-content_auto] items-center justify-start text-red-500"
		><IconLogout class="ml-8 mr-10 h-10" />Sign Out</button
	>
</div>
