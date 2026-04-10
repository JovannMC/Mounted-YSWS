<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '$lib/components/Container.svelte';
	import bg from '$lib/assets/hc-hq-2.png';

	onMount(() => {
		console.log('meow!');
	});
</script>

<img src={bg} alt="background" class="absolute inset-0 h-full w-full object-cover select-none" />

<div class="relative z-10 flex min-h-screen w-full items-center justify-center p-10">
	<Container>
		<div class="h-full w-full p-6">
			<h1 class="text-2xl font-bold text-white">meow meow!</h1>
		</div>
	</Container>
</div>

<style lang="scss">
</style>
