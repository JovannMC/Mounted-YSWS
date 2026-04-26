<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Container from '$lib/components/Container.svelte';
	import bg from '$lib/assets/hc-hq.webp';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import Menu from '@lucide/svelte/icons/menu';
	import RectangleGoggles from '@lucide/svelte/icons/rectangle-goggles';
	import { onNavigate } from '$app/navigation';
	import '@fontsource-variable/open-sans/wght.css';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import 'overlayscrollbars/overlayscrollbars.css';
	import { items, projects, users } from '$lib';
	import { SvelteURL } from 'svelte/reactivity';

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

	let parallaxX = $state(0);
	let parallaxY = $state(0);

	function updateParallax(event: MouseEvent) {
		const x = (event.clientX / window.innerWidth - 0.5) * 1.5;
		const y = (event.clientY / window.innerHeight - 0.5) * 1.5;

		parallaxX = x * 18;
		parallaxY = y * 12;
	}

	function resetParallax() {
		parallaxX = 0;
		parallaxY = 0;
	}

	// FIXME minor oversight lmfao - can't pass data from +page.svelte into +layout.svelte obviously
	// so can't change the title based on the page if its a subpage. gotta do dumb workaround for the projects pages lol
	let title = $state('Mounted');
	let isSubPage = $state(false);
	let isDrawerOpen = $state(false);

	const updatePathState = () => {
		const pathname = window.location.pathname;
		const currentPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
		let activeTitle = 'Mounted';

		for (const item of allSidebarItems) {
			const isActive = item.link === currentPath;
			item.active = isActive;
			if (isActive) activeTitle = item.label;
		}

		// the dumb workaround because of above comment lol
		if (currentPath.startsWith('/projects/')) {
			for (const project of projects) {
				if (currentPath.includes(`/projects/${project.id}`)) continue;
				activeTitle = project.name;
				break;
			}
		}

		title = activeTitle;
		isSubPage = currentPath.split('/').filter(Boolean).length > 1;
	};

	function closeDrawer() {
		isDrawerOpen = false;
	}

	function handleWindowKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeDrawer();
	}

	onMount(updatePathState);
	onNavigate(() => {
		updatePathState();
		closeDrawer();
	});

	// parallax effect stuff
	onMount(() => {
		window.addEventListener('mousemove', updateParallax);
		window.addEventListener('mouseleave', resetParallax);

		return () => {
			window.removeEventListener('mousemove', updateParallax);
			window.removeEventListener('mouseleave', resetParallax);
		};
	});

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

<svelte:window onkeydown={handleWindowKeydown} />

<!-- parallax bg -->
<div class="fixed inset-0 -z-10 overflow-hidden">
	<img
		src={bg}
		alt="background"
		class="absolute inset-0 h-full w-full object-cover select-none"
		style={`transform: translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.06); transition: transform 120ms ease-out;`}
	/>
</div>

<div class="relative z-10 flex min-h-screen w-full items-start justify-center p-6 pt-8 lg:items-center lg:p-10">
	<Container>
		<div class="relative flex h-full w-full">
			{#if isDrawerOpen}
				<!-- close on clicking outside sidebar area -->
				<button
					class="absolute inset-0 z-30 bg-black/45 lg:hidden"
					onclick={closeDrawer}
					aria-label="Close navigation drawer"
				></button>
			{/if}

			<div
				class={[
					'absolute inset-y-0 left-0 z-40 transition-transform duration-250 ease-out lg:relative lg:z-auto lg:translate-x-0',
					isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				]}
			>
				<Sidebar>
					<div class="flex h-full flex-col text-white/90">
						<div class="cent mb-6 flex items-center justify-between gap-3">
							<h1
								class="h-full content-center truncate text-xl font-semibold"
								title="Maya (truncation test example)"
							>
								Maya (truncation test example)
							</h1>
							<div class="flex items-center gap-2">
								<!-- pfp -->
								<div class="h-10 w-10 shrink-0 rounded-full">
									<img
										src="/static/pfp.jpg"
										alt="Maya"
										class="h-full w-full rounded-full object-cover"
									/>
								</div>
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
												'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition',
												item.active ? 'bg-white/18' : ' hover:bg-white/15'
											]}
											onclick={closeDrawer}
										>
											<div class="flex items-center gap-3 text-base">
												<span class="h-4 w-4 rounded-sm border border-blue-400"></span>
												<span>{item.label}</span>
											</div>
											<span class="text-sm text-white/65">{item.side}</span>
										</a>
									{/each}
								</div>
							</div>
						{/each}

						<!-- bottom details -->
						<div class="mt-auto flex flex-col items-center gap-2 text-xs text-white/50">
							<img
								src="/static/flag-orpheus-left.svg"
								alt="Orpheus holding a Hack Club flag"
								class="pointer-events-none absolute bottom-14 left-0 h-24 select-none"
							/>
							<span>Mounted - a Hack Club YSWS</span>
							<span>
								By: <a
									href="https://jovann.me"
									target="_blank"
									class="underline transition-colors hover:text-white/90">Maya</a
								>, Orpheus, and Heidi
							</span>
							<span>
								<a
									href="https://github.com/JovannMC/Mounted-YSWS"
									target="_blank"
									class="underline transition-colors hover:text-white/90">GitHub</a
								>
								-
								<a
									href="https://github.com/JovannMC/Mounted-YSWS/commit/{__COMMIT_HASH__}"
									target="_blank"
									class="underline transition-colors hover:text-white/90"
								>
									{__COMMIT_HASH__}
								</a>
							</span>
						</div>
					</div>
				</Sidebar>
			</div>

			<div class="flex min-h-0 flex-1 flex-col p-4 pb-0 lg:p-6 lg:pb-0">
				<!-- top bar -->
				<div class="relative flex h-12 w-full shrink-0 items-center justify-between">
					<div class="flex min-w-12 items-center gap-2">
						<button
							class="rounded-full bg-white/15 p-3 transition-colors hover:bg-white/20 lg:hidden"
							onclick={() => {
								isDrawerOpen = true;
							}}
							aria-label="Open navigation drawer"
						>
							<Menu class="text-white/90" />
						</button>

						{#if isSubPage}
							<button
								class="rounded-full bg-white/15 p-3 transition-colors hover:bg-white/20"
								onclick={() => {
									if (window.history.length > 1) {
										window.history.back();
									} else {
										const url = new SvelteURL(window.location.href);
										url.pathname = url.pathname.split('/').slice(0, -1).join('/') || '/';
										window.history.replaceState({}, '', url);
										window.dispatchEvent(new PopStateEvent('popstate'));
									}
								}}
							>
								<ChevronLeft class="text-white/90" />
							</button>
						{/if}
					</div>

					<h2
						class="pointer-events-none absolute left-1/2 w-full -translate-x-[55.5%] truncate text-center text-2xl font-semibold sm:-translate-x-1/2 sm:text-3xl"
					>
						{title}
					</h2>

					<div class="flex min-w-12 items-center justify-end gap-2">
						<div
							class="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm text-white/90 transition-colors hover:bg-black/20"
						>
							<RectangleGoggles size={20} />
							<span>6967</span>
						</div>
					</div>
				</div>
				<!-- actual content of the page lol -->
				<div class="my-3 min-h-0 flex-1 sm:my-6">
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
