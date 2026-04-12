<script lang="ts">
	import { projects, type Project } from '$lib';

	type ProjectStatus = Project['status'];
	type StatusFilter = 'all' | ProjectStatus;

	const statusFilters: StatusFilter[] = ['all', 'in progress', 'completed'];

	let query = $state('');
	let activeStatus = $state<StatusFilter>('all');

	const normalizedQuery = $derived(query.trim().toLowerCase());

	const filteredProjects = $derived(
		projects.filter((project) => {
			const matchesStatus = activeStatus === 'all' || project.status === activeStatus;
			const matchesSearch =
				normalizedQuery.length === 0 ||
				project.name.toLowerCase().includes(normalizedQuery) ||
				project.author.username.toLowerCase().includes(normalizedQuery) ||
				project.description.toLowerCase().includes(normalizedQuery);

			return matchesStatus && matchesSearch;
		})
	);

	const formatStatus = (status: ProjectStatus) => (status === 'in progress' ? 'In Progress' : 'Completed');

	const formatFilterLabel = (status: StatusFilter) => {
		if (status === 'all') return 'All';
		return formatStatus(status);
	};
</script>

<div class="flex w-full flex-col pb-6">
	<div class="mb-5">
		<input
			type="search"
			bind:value={query}
			placeholder="Search projects, creators, or descriptions"
			class="w-full rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0"
		/>
	</div>

	<div class="mb-6 flex flex-wrap gap-2">
		{#each statusFilters as status (status)}
			<button
				type="button"
				onclick={() => (activeStatus = status)}
				class={`rounded-full px-4 py-1.5 transition ${
					activeStatus === status
						? 'bg-white/25 text-white'
						: 'bg-black/25 text-white/75 hover:bg-white/15 hover:text-white'
				}`}
			>
				{formatFilterLabel(status)}
			</button>
		{/each}
	</div>

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
		{#each filteredProjects as project (project.id)}
			<article
				class="overflow-hidden rounded-2xl border border-white/20 bg-black/25 transition hover:bg-black/35"
			>
				<div class="relative h-44 w-full overflow-hidden bg-white/10">
					<img src={project.image} alt={project.name} class="h-full w-full object-cover" />
				</div>

				<div class="space-y-3 p-4">
					<div class="flex items-start justify-between gap-3">
						<h3 class="text-xl leading-tight font-semibold">{project.name}</h3>
						<span
							class={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${
								project.status === 'completed' ? 'bg-emerald-400/15 text-white/90' : 'bg-white/10'
							}`}
						>
							{formatStatus(project.status)}
						</span>
					</div>

					<div class="flex flex-wrap items-center gap-2 text-sm text-white/70">
						<span class="rounded-md bg-white/10 px-2 py-1">by {project.author.username}</span>
						<span class="rounded-md bg-white/10 px-2 py-1">{project.hours} hours</span>
					</div>

					<p class="line-clamp-3 text-sm leading-relaxed text-white/80">
						{project.description}
					</p>
				</div>
			</article>
		{/each}
	</div>
</div>

<style lang="scss">
</style>
