<script lang="ts">
	import { T, extend } from '@threlte/core';
	import { Plane, Vector3, DoubleSide, PointLight, NumberKeyframeTrack } from 'three';

	import { useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';

	import { Stars } from '@threlte/extras';
	import BuildingA from './BuildingA.svelte';
	import NixieTube from './NixieTube.svelte';
	import MoonSurface from './MoonSurface.svelte';

	let front: [number, number, number] = [190, 150, 174];
	let side: [number, number, number] = [171, 150, 190];

	function getShifted(value: number, digit: number): number {
		value = Math.min(value, 99999.99);
		value = Math.max(value, 0);

		return Math.trunc(value / Math.pow(10, digit));
	}

	let total = 1020.593;

	function getDigitDefaultZero(value: number, digit: number): string {
		const shifted = getShifted(value, digit);

		const ones = shifted % 10;
		return ones.toString();
	}

	function getDigitOther(value: number, digit: number): string {
		const shifted = getShifted(value, digit);
		const shiftedOneFewer = getShifted(value, digit - 1);

		if (shifted == 0 && shiftedOneFewer == 0 && digit != 1) {
			return ' ';
		}

		if (shifted == 0) {
			return '$';
		}

		const out = shifted % 10;
		return out.toString();
	}

	const { renderer } = useThrelte();
	onMount(() => {
		renderer.localClippingEnabled = true;
	});
	let p = new Plane(new Vector3(0, -1, 0), 130);
</script>

<Stars radius={190} factor={40} count={10000} />

<T.PerspectiveCamera
	makeDefault
	position={[190, 164, 190]}
	oncreate={(ref) => {
		ref.lookAt(0, 80, 0);
	}}
/>
<!--
<T.PerspectiveCamera
    makeDefault
    position={front}
    oncreate={(ref)=> {
        ref.lookAt(171, 144, 174)
    }}
/>
-->

<!--
<T.DirectionalLight
    position={[67, 200, 190]}
    intensity={1}
    castShadow
/>
-->
<T.DirectionalLight position={[400, 80, 100]} castShadow />

<T.PointLight position={[170, 142, 173]} castShadow intensity={100} />

<T.Mesh scale={1.4} castShadow>
	<BuildingA castShadow clippingPlanes={[p]} />
</T.Mesh>

<T.Mesh position={[168, 65, 173]} scale={0.6} castShadow receiveShadow>
	<BuildingA castShadow receiveShadow />
</T.Mesh>

<!--
<T.Mesh
    position={[162, 131, 170]}
    rotation={[0, Math.PI/2, 0]}
    scale={1}
>
    <Text3DGeometry
        text="$1234"
        size={3}
        depth={0.2}
        font={BernhardJ}
        curveSegments={1}
    />
    <FakeGlowMaterial glowColor="yellow" glowInternalRadius={0.5}/>
</T.Mesh>
<T.Mesh
    position={[162, 131, 170]}
    rotation={[0, Math.PI/2, 0]}
    scale={1}
>
    <Text3DGeometry
        text="$1234"
        size={3}
        depth={0.2}
        font={BernhardJ}
        
    />
    <T.MeshBasicMaterial color="orange"/>
</T.Mesh>
-->
<T.Group position={[0, 0, 1.2]}>
	<NixieTube
		position={[171.5, 143, 174]}
		scale={0.5}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitOther(total, 4)}
	/>
	<NixieTube
		position={[171.5, 143, 172.8]}
		scale={0.5}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitOther(total, 3)}
	/>
	<NixieTube
		position={[171.5, 143, 171.6]}
		scale={0.5}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitOther(total, 2)}
	/>
	<NixieTube
		position={[171.5, 143, 170.4]}
		scale={0.5}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitOther(total, 1)}
	/>
	<NixieTube
		position={[171.5, 143, 169.2]}
		scale={0.5}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitDefaultZero(total, 0)}
	/>
	<NixieTube
		position={[171.5, 143, 168.1]}
		scale={0.25}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitDefaultZero(total, -1)}
		intensity={3}
	/>
	<NixieTube
		position={[171.5, 143, 167.5]}
		scale={0.25}
		rotation={[0, Math.PI / 2, 0]}
		value={getDigitDefaultZero(total, -2)}
		intensity={3}
	/>
</T.Group>

<!--
<T.Mesh 
    position={[162, 135, 170]}
    rotation={[0, Math.PI/2, 0]}
>
    <Text3DGeometry
        text="$1111.23"
        characters=" $1234567890"
        fontSize={3.5}
        depth={1}
        position={[162, 135, 170]}
        rotation={[0, Math.PI/2, 0]}
        font={Bernhard}
        outlineBlur={"white"}
    />
</T.Mesh>

<Text
    text="$1111.23"
    characters=" $1234567890"
    fontSize={3.5}
    position={[162, 135, 170]}
    rotation={[0, Math.PI/2, 0]}
    font={Bernhard}
    outlineBlur={"white"}
    color="orange"
/>
-->

<T.DirectionalLight position={[0, 1, -2]} />
<MoonSurface scale={[20, 18, 20]} rotation.y={(-0.8 * Math.PI) / 2} receiveShadow />
<!--
<T.Mesh
    rotation.x={-Math.PI / 2}
    receiveShadow
>
    <MoonSurface scale={10}/>
</T.Mesh>
-->
