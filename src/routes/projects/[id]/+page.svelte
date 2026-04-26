<script lang="ts">
	import { users, type Project } from '$lib';

	let { data } = $props<{ data: { project: Project } }>();

	const project = $derived(data.project);
	const isCompleted = $derived(project.status === 'completed');
	const ownProject = $derived(project.author.username === users[0].username);
	const formatStatus = (status: Project['status']) => (status === 'in progress' ? 'In Progress' : 'Completed');
</script>

<svelte:head>
	<title>{project.name}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 pb-6">
	<!-- project details -->
	<div class="overflow-hidden rounded-3xl border border-white/20 bg-black/25">
		<div class="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="relative min-h-56 bg-white/15">
				<img src={project.image} alt={project.name} class="h-full w-full object-cover" />
			</div>

			<div class="flex flex-col justify-between gap-3 p-5 lg:p-6">
				<div class="space-y-3">
					<div class="flex flex-wrap items-center gap-2.5">
						<span
							class={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
								isCompleted ? 'bg-emerald-400/15 text-emerald-100' : 'bg-amber-400/15 text-amber-100'
							}`}
						>
							{formatStatus(project.status)}
						</span>
						<span
							class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white/75 uppercase"
						>
							{project.views} views
						</span>
					</div>
					<div>
						<h1 class="text-2xl font-semibold tracking-tight">{project.name}</h1>
						<p class="mt-1.5 text-sm text-white/65">By {project.author.username}</p>
					</div>

					<div class="flex flex-wrap gap-2 text-sm text-white/65">
						<span class="rounded-md bg-white/15 px-2.5 py-1">{project.hours} hours</span>
						<span class="rounded-md bg-white/15 px-2.5 py-1">Project #{project.id}</span>
					</div>

					<p class="text-sm leading-relaxed text-white/80">{project.description}</p>
				</div>

				<!-- action buttons -->
				<div class="flex flex-wrap gap-2.5">
					<a
						href={project.repo_url}
						target="_blank"
						rel="noreferrer"
						class="rounded-full bg-black/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black/40"
					>
						View Repo
					</a>
					{#if project.demo_url}
						<a
							href={project.demo_url}
							target="_blank"
							rel="noreferrer"
							class="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
						>
							View Demo
						</a>
					{/if}
					{#if ownProject}
						<a
							href={`/projects/${project.id}/edit`}
							class="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/25"
						>
							Edit Project
						</a>
						<button
							type="button"
							class="rounded-full border border-emerald-300/45 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:bg-emerald-400/25"
							onclick={void alert('pretend this ships the project <3')}
						>
							Ship Project
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- comments -->
	{#if project.comments?.length}
		<div class="space-y-3">
			<h2 class="text-xl font-semibold">Comments</h2>
			<div class="space-y-3">
				{#each [...project.comments].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) as comment, i (i)}
					<div class="rounded-2xl border border-white/20 bg-black/25 p-4">
						<div class="flex items-center justify-between gap-3 text-sm text-white/65">
							<div class="flex items-center gap-2">
								<img
									src={comment.author.profile_image}
									alt={comment.author.username}
									class="inline-block h-6 w-6 rounded-full object-cover"
								/>
								<span>{comment.author.username}</span>
							</div>
							<span>{new Date(comment.timestamp).toLocaleString()}</span>
						</div>
						<p class="mt-2 text-sm leading-relaxed text-white/90">{comment.content}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
</style>
