<script lang="ts">
	import { Canvas } from '@threlte/core';
	import BuildingScene from '$lib/BuildingScene.svelte';
	import type { PageProps } from './$types';
	import { onMount } from 'svelte';
	import { source } from 'sveltekit-sse';

	let { data }: PageProps = $props();
	//console.log("props from backend give: ": JSON.stringify(data));
	console.log('intializing');
	console.log('initial read gave ', data.totalInit);

	let total = $state(0);

	onMount(() => {
		total = data.totalInit;
		const totalHandler = source('/total').select('total');

		totalHandler.subscribe((newTotal: string) => {
			console.log('received data: ', newTotal);
			if (newTotal != '') {
				total = parseFloat(newTotal);
			}
		});
	});
</script>

<main>
	<Canvas>
		<BuildingScene {total} />
	</Canvas>
</main>

<style>
	main {
		width: 260px;
		height: 1080px;
		mask-image:
			linear-gradient(to top, black 0%, black 100%),
			linear-gradient(to top, transparent 0%, black 100%),
			linear-gradient(to right, transparent 0%, black 100%),
			linear-gradient(to bottom, transparent 0%, black 100%),
			linear-gradient(to left, transparent 0%, black 100%);
		mask-position: center, top, right, bottom, left;
		mask-size:
			100% 100%,
			100% 10px,
			10px 100%,
			100% 10px,
			10px 100%;
		mask-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
		mask-composite: subtract, add, add, add;
	}
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.read-the-docs {
		color: #888;
	}
</style>
