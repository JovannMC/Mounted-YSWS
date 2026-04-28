<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<aside class="relative h-full w-[min(82vw,320px)] shrink-0 border-r border-white/25 bg-black/70 p-5 sm:w-70 sm:bg-black/25">
	{@render children()}
</aside>
