import type { PageServerLoad } from './$types';
import TiltifyClient from 'tiltify-api-client';
import { env } from '$env/dynamic/private';
import { tiltifyClient } from '$lib/tiltify-client';

export const load: PageServerLoad = async ({ params }) => {
	console.log('baz');
	const totalInit: number = await new Promise((resolve, reject) => {
		tiltifyClient?.Campaigns?.get(env.TILTIFY_CAMPAIGN_ID, (campaign) => {
			console.log('checking campaign gave total of:', campaign.amount_raised.value);
			resolve(campaign.amount_raised.value as number);
		});
	});

	/*
	tiltifyClient?.Campaigns?.get(env.TILTIFY_CAMPAIGN_ID, (campaign) => {
		console.log('checking campaign gave total of:', campaign.amount_raised.value);
		totalInit = campaign.amount_raised.value as number;
	});
       */
	console.log('quz');

	return {
		totalInit
	};
};
