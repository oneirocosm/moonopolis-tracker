import type { ServerInit } from "@sveltejs/kit";
import TiltifyClient from "@ericthelemur/tiltify-api-client";
import secrets from '$env/static/private';

import { setContext } from "svelte";

export const init: ServerInit = async () => {
    let client = new TiltifyClient(secrets.TILTIFY_CLIENT_ID, secrets.TILTIFY_CLIENT_SECRET);
    await client.initialize();

    client.Webhook.activate(secrets.TILTIFY_WEBHOOK_ID, () => {
        console.log("webhooks staged");
    });

    const events = { "event_types": ["public:direct:fact_updated", "public:direct:donation_updated"] }
    client.Webhook.subscribe(secrets.TILTIFY_WEBHOOK_ID, secrets.TILTIFY_CAMPAIGN_ID, events, () => {
        console.log("webhooks activated");
    });

    // how do i use the client elsewhere???
    setContext("tiltify-client", client);
}