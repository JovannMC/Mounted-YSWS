<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Container from '$lib/components/Container.svelte';
	import bg from '$lib/assets/hc-hq-2.png';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	interface SidebarItem {
		label: string;
		link: string;
		side: string;
		active?: boolean;
	}

	interface SidebarSection {
		title?: string;
		items: SidebarItem[];
	}

	const sections: SidebarSection[] = $state([
		{
			items: [
				{ label: 'Dashboard', link: '/', side: '67' },
				{ label: 'Projects', link: '/projects', side: '' }
			]
		},
		{
			title: 'Other Stuff',
			items: [
				{ label: 'Explore', link: '/explore', side: '69' },
				{ label: 'Shop', link: '/shop', side: '' },
				{ label: 'Settings', link: '/settings', side: '' },
				{ label: 'Help & Support', link: '/help', side: '' }
			]
		}
	]);

	let title = $state('Mounted');

	onMount(() => {
		const currentPath = resolve(window.location.pathname);
		console.log(`meow! ${currentPath}`);
		sections.forEach((section) => {
			console.log(section);
			section.items.forEach((item) => {
				console.log(item.link, currentPath);
				if (item.link === currentPath) {
					item.active = true;
					title = item.label;
					console.log('active', item.label);
				} else {
					item.active = false;
				}
			});
		});
	});

	let { children } = $props();
</script>

<svelte:head>
	<title>Mounted - Hack Club</title>
	<link rel="icon" href={favicon} />
	<meta name="title" content="Mounted - Hack Club" />
	<meta name="description" content="Mounted - Hack Club" />
	<meta property="og:url" content="https://vert.sh" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Mounted - Hack Club" />
</svelte:head>

<img src={bg} alt="background" class="absolute inset-0 h-full w-full object-cover select-none" />

<div class="relative z-10 flex min-h-screen w-full items-center justify-center p-10">
	<Container>
		<div class="flex h-full w-full">
			<Sidebar>
				<div class="flex h-full flex-col text-white/90">
					<div class="cent mb-6 flex items-center justify-between gap-3">
						<h1
							class="h-full content-center overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap text-white"
							title="Name that is long and truncated"
						>
							Name that is long and truncated
						</h1>
						<!-- pfp -->
						<div class="h-10 w-10 shrink-0 rounded-full border border-white/25">
							<img
								src="https://placehold.co/100"
								alt="pfp"
								class="h-full w-full rounded-full object-cover"
							/>
						</div>
					</div>

					<!-- sidebar items -->
					{#each sections as section, index (`section-${index}`)}
						<div class="mb-7">
							{#if section.title}
								<div class="mb-3 flex items-center justify-between">
									<h2 class="text-xl font-semibold text-white">{section.title}</h2>
									<span class="text-lg text-white/90">⌄</span>
								</div>
							{/if}

							<div class="space-y-1 overflow-y-auto pr-1">
								{#each section.items as item, itemIndex (`item-${itemIndex}`)}
									<a
										href={item.link}
										class={[
											'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm',
											item.active ? 'bg-white/18 text-white' : 'hover:bg-white/15'
										]}
									>
										<div class="flex items-center gap-3">
											<span class="h-4 w-4 rounded-sm border border-blue-400"></span>
											<span>{item.label}</span>
										</div>
										<span class="text-sm text-white/60">{item.side}</span>
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</Sidebar>

			<div class="flex-1 p-6">
				<h2 class="text-center text-3xl font-semibold text-white">{title}</h2>
				{@render children()}
			</div>
		</div>
	</Container>
</div>
