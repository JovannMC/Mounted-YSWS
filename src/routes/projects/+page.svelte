<script lang="ts">
	import { projects, users, type Project } from '$lib';

	type ProjectStatus = Project['status'];

	let query = $state('');

	const normalizedQuery = $derived(query.trim().toLowerCase());

	const user = users[0];

	const filteredProjects = $derived(
		projects.filter((project) => {
			if (project.author !== user) return false;

			if (normalizedQuery.length === 0) return true;

			return (
				project.name.toLowerCase().includes(normalizedQuery) ||
				project.author.username.toLowerCase().includes(normalizedQuery) ||
				project.description.toLowerCase().includes(normalizedQuery) ||
				project.status.toLowerCase().includes(normalizedQuery)
			);
		})
	);

	const formatStatus = (status: ProjectStatus) => (status === 'in progress' ? 'In Progress' : 'Completed');

	const totalHours = $derived(
		projects.reduce((total, project) => {
			if (project.author === user) {
				return total + project.hours;
			}
			return total;
		}, 0)
	);
</script>

<div class="flex w-full flex-col pb-6">
	<div class="mb-5">
		<input
			type="search"
			bind:value={query}
			placeholder="Search projects or descriptions"
			class="w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0"
		/>
	</div>

	<div class="mb-5 flex items-center justify-between text-sm text-white/65">
		<p>{filteredProjects.length} projects</p>
		<p>{totalHours} total hours</p>
	</div>

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
		{#each filteredProjects as project (project.id)}
			<a
				href={`/projects/${project.id}`}
				class="block overflow-hidden rounded-2xl border border-white/20 bg-black/25 transition-colors hover:border-white/30 hover:bg-black/40"
			>
				<div class="relative h-44 w-full overflow-hidden bg-white/10">
					<img src={project.image} alt={project.name} class="h-full w-full object-cover" />
				</div>

				<div class="space-y-3 p-4">
					<div class="flex items-start justify-between gap-3">
						<h3 class="text-xl leading-tight font-semibold">{project.name}</h3>
						<span
							class={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide uppercase ${
								project.status === 'completed'
									? 'bg-emerald-400/15 text-emerald-100'
									: 'bg-amber-400/15 text-amber-100'
							}`}
						>
							{formatStatus(project.status)}
						</span>
					</div>

					<div class="flex flex-wrap items-center gap-2 text-sm text-white/60">
						<span class="rounded-md bg-white/10 px-2 py-1">{project.hours} hours</span>
						<span class="rounded-md bg-white/10 px-2 py-1">{project.views} views</span>
					</div>

					<p class="line-clamp-3 text-sm leading-relaxed text-white/80">{project.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
</style>
