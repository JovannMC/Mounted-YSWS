<script lang="ts">
	import { items } from '$lib';

	type ItemCategory = (typeof items)[number]['category'];
	type ShopCategory = 'all' | ItemCategory;

	const categories: ShopCategory[] = ['all', ...new Set(items.map((item) => item.category))];

	let query = $state('');
	let activeCategory = $state<ShopCategory>('all');
	const normalizedQuery = $derived(query.trim().toLowerCase());

	const filteredItems = $derived(
		items.filter((item) => {
			const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
			const matchesSearch =
				normalizedQuery.length === 0 ||
				item.name.toLowerCase().includes(normalizedQuery) ||
				(item.blurb?.toLowerCase().includes(normalizedQuery) ?? false) ||
				item.category.toLowerCase().includes(normalizedQuery);

			return matchesCategory && matchesSearch;
		})
	);

	const formatLabel = (category: ShopCategory) =>
		category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
</script>

<div class="flex w-full flex-col pb-6">
	<div class="mb-5">
		<input
			type="search"
			bind:value={query}
			placeholder="Search shop items, categories, or descriptions"
			class="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0"
		/>
	</div>

	<div class="mb-6 flex flex-wrap gap-2">
		{#each categories as category (category)}
			<button
				type="button"
				onclick={() => (activeCategory = category)}
				class={`rounded-full px-4 py-1.5 transition ${
					activeCategory === category
						? 'bg-white/25 text-white'
						: 'bg-black/25 text-white/90 hover:bg-white/15 hover:text-white'
				}`}
			>
				{formatLabel(category)}
			</button>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredItems as item (item.name)}
			<div
				class="rounded-2xl border border-white/25 bg-black/25 p-3 backdrop-blur-md transition-colors hover:bg-black/40"
			>
				<img src={item.image} alt={item.name} class="aspect-square w-full rounded-xl object-contain" />
				<div class="mt-3 flex items-start justify-between gap-3">
					<h3 class="text-base leading-tight font-semibold">{item.name}</h3>
					<p class="shrink-0 text-sm font-semibold text-white/90">{item.price}</p>
				</div>
				{#if item.blurb}
					<p class="mt-1 text-sm leading-snug text-white/65">{item.blurb}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
</style>
