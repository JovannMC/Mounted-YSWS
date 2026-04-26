<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		title?: string;
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div
	class="h-[min(84vh,720px)] w-full max-w-[min(96vw,1280px)] overflow-hidden rounded-4xl border border-white/25 bg-white/15 backdrop-blur-[20px] backdrop-saturate-100 lg:h-[min(70vh,720px)] lg:max-w-[min(90vw,1280px)]"
>
	{@render children()}
</div>
