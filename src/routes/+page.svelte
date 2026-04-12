<script lang="ts">
	import { getRandomizedItems, type ShopItem } from '$lib';
	import { onMount } from 'svelte';

	let featuredItems: ShopItem[] = $state([]);

	onMount(() => (featuredItems = getRandomizedItems(3)));
</script>

<div class="flex w-full flex-col gap-3">
	<!-- probably one like flavortown -->
	<!-- tutorial/guide, links to hackatime/lapse/lookout, small help section (very minor ones - rest in help & support in real app) -->

	<!-- getting started -->
	<div class="flex w-full flex-col rounded-lg">
		<div class="flex-1 rounded-lg bg-black/25 p-6">
			<h2 class="mb-4 text-2xl font-semibold">Getting Started</h2>
			<p>
				This section would include a quick summary of how to get started probably - similar to Flavortown's
				tutorial
			</p>
		</div>
	</div>

	<!-- featured items -->
	<div class="flex w-full flex-col rounded-lg">
		<div class="flex-1 rounded-lg bg-black/25 p-6">
			<h2 class="mb-4 text-2xl font-semibold">Featured Items</h2>
			<p>
				This section would probably include "favourited" items as well as featured items. This would also be a
				carousel instead.
			</p>
			<div class="mt-4 flex flex-row justify-around gap-6">
				{#each featuredItems as item (item.name)}
					<div
						class="w-64 rounded-2xl border border-white/25 bg-black/25 p-3 backdrop-blur-md transition hover:bg-black/40"
					>
						<img src={item.image} alt={item.name} class="aspect-square w-full rounded-xl object-contain" />
						<div class="mt-3 flex w-full items-start justify-between gap-3">
							<h3 class="text-base leading-tight font-semibold">{item.name}</h3>
							<div class="shrink-0 text-sm font-semibold text-white/90">{item.price}</div>
						</div>
						{#if item.blurb}
							<p class="mt-1 text-sm leading-snug text-white/60">{item.blurb}</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- links -->
	<div class="flex w-full flex-col rounded-lg">
		<div class="flex-1 rounded-lg bg-black/25 p-6">
			<h2 class="mb-4 text-2xl font-semibold">Links</h2>
			<p>
				This would be a section to add common links a new user may want to refer to - not sure what else there
				could be rn!
			</p>
			<div class="mt-4 flex flex-row flex-wrap justify-around gap-6">
				{@render card(
					'Mounted Guide',
					'Check out the custom guides made for Mounted to get started - from project idea to shipping to the world!',
					'/',
					'basis-[calc((100%-3rem)/3)]'
				)}
				<!-- {@render card(
					'HackaTime',
					'Coding something? Use Hackatime to track your time spent in your code editor of choice!',
					'https://hackatime.hackclub.com/docs',
					'basis-[calc((100%-3rem)/3)]'
				)}
				{@render card(
					'Lapse',
					"Doing something that isn't coding? Use Lapse to track your time by creating a timelapse!",
					'https://lapse.hackclub.com/',
					'basis-[calc((100%-3rem)/3)]'
				)}
				{@render card(
					'Lookout',
					'Want an alternative to Lapse? Use Lookout to take screenshots of your screen at a regular interval to track your time, also allowing you to blacklist certain programs!',
					'https://lookout.hackclub.com/',
					'basis-[calc((100%-3rem)/3)]'
				)} -->
				{@render card(
					'Announcements',
					'Join the #mounted-announcements channel to keep up with the latest updates on Mounted!',
					'/',
					'basis-[calc((100%-3rem)/3)]'
				)}
				{@render card(
					'Community',
					'Talk with other members of the community in #mounted - share your projects or talk about anything!',
					'/',
					'basis-[calc((100%-3rem)/3)]'
				)}
			</div>
		</div>
	</div>

	<!-- another section -->
	<div class="flex w-full flex-col rounded-lg">
		<div class="flex-1 rounded-lg bg-black/25 p-6">
			<h2 class="mb-4 text-2xl font-semibold">Another Section</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
				fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.
			</p>
		</div>
	</div>
</div>

<!-- @ts-expect-error meow -->
{#snippet card(title: string, description: string, link: string, className: string)}
	{#if link || link !== ''}
		<a
			href={link}
			class="flex w-full flex-col items-start rounded-lg bg-black/25 p-6 hover:bg-black/40 {className}"
		>
			<h2 class="mb-2 text-xl font-semibold">{title}</h2>
			<p>{description}</p>
		</a>
	{:else}
		<div class="flex w-full flex-col items-start rounded-lg bg-black/25 p-6 {className}">
			<h2 class="mb-2 text-xl font-semibold">{title}</h2>
			<p>{description}</p>
		</div>
	{/if}
{/snippet}

<style lang="scss">
	@reference "./layout.css";

	p {
		@apply text-white/90;
	}
</style>
