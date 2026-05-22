<script lang="ts">
	import { T } from '@threlte/core';
	import NixieTubeHousing from '$lib/NixieTubeHousing.svelte'; // the ../lib gets rid of a weird error.
	import { Text3DGeometry, FakeGlowMaterial } from '@threlte/extras';
	import Barlow from './assets/Barlow-Thin.json?url';
	import { MeshPhysicalMaterial, DoubleSide, FrontSide, BackSide } from 'three';

	type NixieTubeProps = {
		position?: number | [x: number, y: number, z: number] | undefined;
		scale?: number | [x: number, y: number, z: number] | undefined;
		rotation?: number | [x: number, y: number, z: number] | undefined;
		value?: string;
		intensity?: number;
	};

	type ValueMeta = {
		position: [x: number, y: number, z: number];
		size: number;
	};

	const valueData: { [key: string]: ValueMeta } = {
		'6': {
			position: [-0.87, 0, 0.3],
			size: 2.5
		},
		$: {
			position: [-0.84, 0.28, 0.24],
			size: 2.2
		},
		'7': {
			position: [-0.83, 0, 0.18],
			size: 2.5
		},
		'5': {
			position: [-0.855, 0, 0.12],
			size: 2.5
		},
		'8': {
			position: [-0.895, 0, 0.06],
			size: 2.5
		},
		'4': {
			position: [-0.9, 0, 0.0],
			size: 2.5
		},
		'3': {
			position: [-0.85, 0, -0.06],
			size: 2.5
		},
		'9': {
			position: [-0.89, 0, -0.12],
			size: 2.5
		},
		'2': {
			position: [-0.87, 0, -0.18],
			size: 2.5
		},
		'0': {
			position: [-0.98, 0, -0.24],
			size: 2.5
		},
		'1': {
			position: [-0.72, 0, -0.3],
			size: 2.5
		}
	};

	let glass = new MeshPhysicalMaterial({
		opacity: 0,
		thickness: 0.1,
		metalness: 0.9,
		roughness: 0.05
	});

	let { value, intensity = 5, ...props }: NixieTubeProps = $props();

	let display: { [key: string]: boolean } = $derived.by(() => {
		let out: { [key: string]: boolean } = {};
		if (value) {
			out[value] = true;
		}
		return out;
	});
	let litUp: boolean = $derived('0123456789$'.includes(value ?? ' '));
	let lightZ: number = $derived(valueData[value ?? ' ']?.position?.[2] ?? 0);
</script>

<T.Group {...props}>
	<T.Mesh castShadow>
		<NixieTubeHousing />
	</T.Mesh>
	{#each Object.entries(valueData) as [value, data]}
		<T.Mesh position={data.position} material={glass}>
			<Text3DGeometry text={value} size={data.size} depth={0.05} font={Barlow} />
		</T.Mesh>
		<T.Mesh position={data.position} visible={display[value] ?? false}>
			<Text3DGeometry text={value} size={data.size} depth={0.05} font={Barlow} />
			<FakeGlowMaterial glowColor="orange" glowInternalRadius={0.0} />
		</T.Mesh>
	{/each}
	<T.PointLight position={[0, 2, lightZ]} {intensity} color="orange" castShadow visible={litUp} />
</T.Group>
