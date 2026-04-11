<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<aside class="h-full w-70 shrink-0 border-r border-white/25 bg-black/20 p-5">
	{@render children()}
</aside>
