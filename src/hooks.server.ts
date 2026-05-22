import type { ServerInit } from '@sveltejs/kit';
import TiltifyClient from 'tiltify-api-client';
import { env } from '$env/dynamic/private';
import { tiltifyClient } from '$lib/tiltify-client';
import { eventManager } from '$lib/events';

export const init: ServerInit = async () => {
	console.log('foo');
	await tiltifyClient.initialize();
	console.log('bar');

    /*
    let i = 43;
    setInterval(() => {
        console.log("emitting");
        eventManager.emit("total", i.toString());
        i += 58.12;
    }, 10000);
    */

	tiltifyClient.Webhook.activate(env.TILTIFY_WEBHOOK_ID, () => {
		console.log('webhooks staged');
	});

	const events = { event_types: ['public:direct:fact_updated', 'public:direct:donation_updated'] };
	tiltifyClient.Webhook.subscribe(env.TILTIFY_WEBHOOK_ID, env.TILTIFY_CAMPAIGN_ID, events, () => {
		console.log('webhooks activated');
	});

};
