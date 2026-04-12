<script lang="ts">
	import { page } from '$app/state';
	import BugOff from '@lucide/svelte/icons/bug-off';

	const fake404 =
		'Oops! Seems like your headset crashed with code 404. Try restarting it maybe?\r\n\r\n(not really - this page is actually not implemented for this demo)';
	const realError = `Oops! Seems like your headset crashed with code ${page.status}. Try restarting it maybe?`;

	const status = page.status;
	const url = page.url.pathname;

	// @ts-expect-error these are the fake pages in the sidebar lol
	const isFake404 = status === 404 && (url === '/settings' || url === '/help');
</script>

<div class="flex h-full w-full flex-col items-center justify-center p-6 text-center">
	<div class="flex items-center gap-3">
		<span><BugOff class="text-white/90" size={44} /></span>
		<h1 class="text-4xl font-bold">ded headset</h1>
	</div>
	<p class="mx-auto mt-4 text-lg text-white/90 whitespace-pre-line">
		{isFake404 ? fake404 : realError}
	</p>

	<!-- restart headset button (go back) -->
	<a
		class="mt-6 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/20"
		href="/"
	>
		Restart Headset
	</a>
</div>

<style lang="scss"></style>
