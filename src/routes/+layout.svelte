<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Container from '$lib/components/Container.svelte';
	import bg from '$lib/assets/hc-hq-2.png';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import RectangleGoggles from '@lucide/svelte/icons/rectangle-goggles';
	import { onNavigate } from '$app/navigation';
	import '@fontsource-variable/open-sans/wght.css';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import 'overlayscrollbars/overlayscrollbars.css';
	import { items, projects, users } from '$lib';

	interface SidebarItem {
		label: string;
		link: string;
		side: string | number;
		active?: boolean;
	}

	interface SidebarSection {
		title?: string;
		items: SidebarItem[];
	}

	const shopCount = items.length;
	const projectsCount = projects.filter((project) => project.author === users[0]).length;
	const exploreCount = projects.length;

	const sections: SidebarSection[] = $state([
		{
			items: [
				{ label: 'Dashboard', link: '/', side: '' },
				{ label: 'Projects', link: '/projects', side: projectsCount }
			]
		},
		{
			title: 'Other Stuff',
			items: [
				{ label: 'Explore', link: '/explore', side: exploreCount },
				{ label: 'Shop', link: '/shop', side: shopCount },
				{ label: 'Settings', link: '/settings', side: '' },
				{ label: 'Help & Support', link: '/help', side: '' }
			]
		}
	]);

	const allSidebarItems = sections.flatMap((section) => section.items);

	let title = $state('Mounted');
	let isSubPage = $state(false);

	const updatePathState = () => {
		const pathname = window.location.pathname;
		const currentPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
		let activeTitle = 'Mounted';

		for (const item of allSidebarItems) {
			const isActive = item.link === currentPath;
			item.active = isActive;
			if (isActive) activeTitle = item.label;
		}

		title = activeTitle;
		isSubPage = currentPath.split('/').filter(Boolean).length > 1;
	};

	onMount(updatePathState);
	onNavigate(updatePathState);

	let { children } = $props();
</script>

<svelte:head>
	<title>Mounted - Hack Club</title>
	<link rel="icon" href={favicon} />
	<meta name="title" content="Mounted - Hack Club" />
	<meta name="description" content="Mounted - Hack Club" />
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
							class="h-full content-center truncate text-xl font-semibold"
							title="Name that is long and truncated"
						>
							Name that is long and truncated
						</h1>
						<!-- pfp -->
						<div class="h-10 w-10 shrink-0 rounded-full">
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
									<h2 class="text-xl font-semibold">{section.title}</h2>
									<ChevronDown class="h-4 w-4 text-white/90" />
								</div>
							{/if}

							<div class="space-y-1 overflow-y-auto pr-1">
								{#each section.items as item, itemIndex (`item-${itemIndex}`)}
									<a
										href={item.link}
										class={[
											'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm',
											item.active ? 'bg-white/18' : 'hover:bg-white/15'
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

					<!-- bottom details -->
					<div class="mt-auto flex flex-col items-center gap-2 text-xs text-white/50">
						<span>Mounted - a Hack Club YSWS</span>
						<span>
							By: <a href="https://jovann.me" target="_blank" class="underline hover:text-white/90"
								>Maya</a
							>, Orpheus, and Heidi
						</span>
						<span>
							<a
								href="https://github.com/JovannMC/Mounted-YSWS"
								target="_blank"
								class="underline hover:text-white/90">GitHub</a
							>
							-
							<a
								href="https://github.com/JovannMC/Mounted-YSWS/commit/{__COMMIT_HASH__}"
								target="_blank"
								class="underline hover:text-white/90"
							>
								{__COMMIT_HASH__}
							</a>
						</span>
					</div>
				</div>
			</Sidebar>

			<div class="flex min-h-0 flex-1 flex-col p-6 pb-0">
				<!-- top bar -->
				<div class="relative flex h-12 w-full shrink-0 items-center justify-between">
					<div class="flex min-w-12 items-center gap-2">
						{#if isSubPage}
							<button class="rounded-full bg-white/10 p-3 hover:bg-white/20">
								<ChevronLeft class="text-white/90" />
							</button>
						{/if}
					</div>

					<h2
						class="pointer-events-none absolute left-1/2 max-w-[60%] -translate-x-1/2 truncate text-center text-3xl font-semibold"
					>
						{title}
					</h2>

					<div class="flex min-w-12 items-center justify-end gap-2">
						<div class="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm text-white/90">
							<RectangleGoggles size={20} />
							<span>6967</span>
						</div>
					</div>
				</div>
				<!-- actual content of the page lol -->
				<div class="mt-6 min-h-0 flex-1">
					<OverlayScrollbarsComponent
						class="h-full"
						options={{
							scrollbars: {
								autoHide: 'move',
								autoHideDelay: 1500
							}
						}}
						defer
					>
						{@render children()}
					</OverlayScrollbarsComponent>
				</div>
			</div>
		</div>
	</Container>
</div>
