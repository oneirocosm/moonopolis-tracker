import type { PageServerLoad } from './$types';
import TiltifyClient from 'tiltify-api-client';
import { env } from '$env/dynamic/private';
import { tiltifyClient } from '$lib/tiltify-client';

export const load: PageServerLoad = async ({ params }) => {
	let totalInit = 0;
	console.log('baz');
	tiltifyClient?.Campaigns?.get(env.TILTIFY_CAMPAIGN_ID, (campaign) => {
		console.log('checking campaign gave total of:', campaign.amount_raised.value);
		totalInit = campaign.amount_raised.value as number;
	});
	console.log('quz');

	return {
		totalInit
	};
};
