import type { ServerInit } from '@sveltejs/kit';
import TiltifyClient from 'tiltify-api-client';
import { env } from '$env/dynamic/private';
import { tiltifyClient } from '$lib/tiltify-client';

export const init: ServerInit = async () => {
	console.log('foo');
	await tiltifyClient.initialize();
	console.log('bar');

	tiltifyClient.Webhook.activate(env.TILTIFY_WEBHOOK_ID, () => {
		console.log('webhooks staged');
	});

	const events = { event_types: ['public:direct:fact_updated', 'public:direct:donation_updated'] };
	tiltifyClient.Webhook.subscribe(env.TILTIFY_WEBHOOK_ID, env.TILTIFY_CAMPAIGN_ID, events, () => {
		console.log('webhooks activated');
	});
};
