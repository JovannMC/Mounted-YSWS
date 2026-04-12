<script lang="ts">
	import { onMount } from 'svelte';
	import { type Project } from '$lib';

	let { data } = $props<{ data: { project: Project } }>();

	const project = $derived(data.project);

	type GitHubCommit = {
		sha: string;
		html_url: string;
		commit: {
			message: string;
			author: {
				name: string;
				date: string;
			};
		};
	};

	type VisualCommit = {
		sha: string;
		url: string;
		message: string;
		author: string;
		date: string;
	};

	type TimelineItem = {
		id: string;
		commits: VisualCommit[];
		comment: string;
	};

	const comments = [
		'this thing does another thing',
		'idk what i was doing here tbh, this does something',
		'i was stupid lmao',
		'this took forever'
	];

	let loading = $state(true);
	let errorMessage = $state('');
	let repoInput = $state('');
	let timeline = $state<TimelineItem[]>([]);

	function parseRepo(raw: string) {
		const cleaned = raw.trim().replace(/\.git$/, '');
		const fullUrlMatch = cleaned.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
		if (fullUrlMatch) return `${fullUrlMatch[1]}/${fullUrlMatch[2]}`;

		const simpleMatch = cleaned.match(/^([^/\s]+)\/([^/\s]+)$/);
		if (simpleMatch) return `${simpleMatch[1]}/${simpleMatch[2]}`;

		return '';
	}

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function buildTimeline(commitsList: VisualCommit[]) {
		const items: TimelineItem[] = [];
		let cursor = 0;

		// randomly group commits from 1-3
		while (cursor < commitsList.length) {
			const size = Math.min(Math.floor(Math.random() * 3) + 1, commitsList.length - cursor);
			const commits = commitsList.slice(cursor, cursor + size);

			items.push({
				id: `${cursor}-${commits[0].sha}`,
				commits,
				comment: comments[Math.floor(Math.random() * comments.length)]
			});

			cursor += size;
		}

		return items;
	}

	async function loadCommits(rawRepo: string) {
		const parsedRepo = parseRepo(rawRepo);
		if (!parsedRepo) {
			errorMessage = 'Enter a valid GitHub repo like owner/repo or a GitHub URL.';
			timeline = [];
			return;
		}

		try {
			loading = true;
			errorMessage = '';

			const response = await fetch(`https://api.github.com/repos/${parsedRepo}/commits`);
			if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);

			const commits = (await response.json()) as GitHubCommit[];
			const normalized: VisualCommit[] = commits
				.map((entry) => ({
					sha: entry.sha,
					url: entry.html_url,
					message: entry.commit.message.split('\n')[0],
					author: entry.commit.author.name,
					date: entry.commit.author.date
				}))
				.reverse();

			timeline = buildTimeline(normalized);
		} catch (caughtError) {
			errorMessage = caughtError instanceof Error ? caughtError.message : 'Unable to fetch commits.';
			timeline = [];
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		repoInput = parseRepo(project.repo_url) || 'JovannMC/Mounted-YSWS';
		await loadCommits(repoInput);
	});
</script>

<svelte:head>
	<title>Editing {project.name}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6 pb-6">
	<div class="overflow-hidden rounded-3xl border border-white/20 bg-black/25">
		<div class="flex flex-col gap-4 p-5 md:p-6">
			<div class="flex flex-col gap-1">
				<h2 class="text-xl font-semibold text-white">Commit timeline</h2>
				<p class="text-sm text-white/65">
					This is a very basic visualization of how the system for commenting on commits and timestamps (on
					timelapses) would look like, either singular or grouped, from oldest to newest. You can test it on
					any real repo though the comments & grouping are randomized.
				</p>
			</div>

			<div class="flex flex-col gap-2 sm:flex-row">
				<input
					type="text"
					bind:value={repoInput}
					placeholder="owner/repo or https://github.com/owner/repo"
					class="w-full rounded-2xl border border-white/20 bg-black/25 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:ring-0"
				/>
				<button
					onclick={void loadCommits(repoInput)}
					class="rounded-2xl border border-white/20 bg-black/25 px-4 py-2 text-sm text-white transition hover:bg-black/40"
				>
					Load
				</button>
			</div>

			{#if loading}
				<p class="rounded-xl border border-white/20 bg-black/10 px-4 py-3 text-sm text-white/80">
					Loading commits...
				</p>
			{:else if errorMessage}
				<p class="rounded-xl border border-white/20 bg-black/10 px-4 py-3 text-sm text-red-200">
					{errorMessage}
				</p>
			{:else if !timeline.length}
				<p class="rounded-xl border border-white/15 bg-black/10 px-4 py-3 text-sm text-white/80">
					No commits found.
				</p>
			{:else}
				<div class="flex flex-col gap-4">
					{#each timeline as item (item.id)}
						{@const startDate = formatDate(item.commits[0].date)}
						{@const endDate = formatDate(item.commits[item.commits.length - 1].date)}
						{@const date = startDate === endDate ? startDate : `${startDate} - ${endDate}`}
						<div class="rounded-2xl border border-white/15 bg-black/10 p-4">
							<p class="mb-3 text-xs text-white/55">
								{date}
							</p>

							<ul class="space-y-1.5">
								{#each item.commits as commit (commit.sha)}
									<li>
										<a
											href={commit.url}
											target="_blank"
											rel="noreferrer"
											class="text-sm text-white/90 hover:underline"
										>
											{commit.author} - {commit.sha.slice(0, 7)} - {commit.message}
										</a>
									</li>
								{/each}
							</ul>

							<p class="mt-3 border-t border-white/20 pt-3 text-sm text-white/80">{item.comment}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
