<script lang="ts">
	import Avatar from '$spark/Avatar.svelte';
	import { AccountContainer } from '$spark/account';

	let version = 'v1.0';
	let accountMenuOpen = false;
</script>

<svelte:head>
	<title>SparkUI ✨</title>
</svelte:head>

<div class="h-screen w-screen cursor-default select-none overflow-y-hidden">
	<div class="grid h-full grid-cols-[55px_auto] grid-rows-[60px_auto] gap-1 p-2">
		<div class="col-span-2 row-span-1">
			<div class="block h-full w-full">
				<div class="group mt-1 w-fit">
					<h1 class="float-left text-4xl font-extrabold tracking-tight">✨ SparkUI⚡</h1>
					<h1
						class="float-left text-4xl font-extrabold tracking-tight opacity-0 transition-opacity group-hover:opacity-100"
					>
						- {version}
					</h1>
				</div>

				<button
					class="float-right mr-2 h-14 w-14"
					on:click={() => {
						accountMenuOpen = !accountMenuOpen;
					}}
				>
					<Avatar
						avatar="https://picsum.photos/128"
						class="float-right -mt-1 hover:cursor-pointer"
					/>
				</button>

				<div
					class="absolute bottom-0 left-0 right-0 top-0 z-40 {accountMenuOpen
						? 'pointer-events-auto'
						: 'pointer-events-none'}"
					on:click={() => {
						accountMenuOpen = false;
					}}
				/>

				<AccountContainer
					name="Demo User"
					email="demoaccount@demo.com"
					class="absolute right-4 top-20 origin-top-right transition-[transform_opacity] {accountMenuOpen
						? 'pointer-events-auto scale-100 opacity-100'
						: 'pointer-events-none scale-50 opacity-0'}"
				/>

				<!--
					<div class="float-right grid grid-flow-col gap-2 h-full">
						<ThemeSwitcher class="w-48 rounded-lg" />
						<LanguageSelector class="w-48 rounded-lg" />
					</div>
				-->
			</div>
		</div>

		<!-- Sidebar Menu -->

		<div class="col-span-1 row-span-1 block h-full">
			<slot name="nav" />
		</div>

		<!-- Content -->
		<div class="bg-background2 h-full rounded-lg p-2"><slot /></div>
	</div>
</div>
