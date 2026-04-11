<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- see if bg-black/25 stays with a darker bg behind the window -->
<aside class="h-full w-70 shrink-0 border-r border-white/25 bg-black/25 p-5">
	{@render children()}
</aside>
