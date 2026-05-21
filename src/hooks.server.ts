import type { ServerInit } from "@sveltejs/kit";
import TiltifyClient from "tiltify-api-client";
import {TILTIFY_CLIENT_ID, TILTIFY_CLIENT_SECRET, TILTIFY_WEBHOOK_ID, TILTIFY_CAMPAIGN_ID} from '$env/static/public';

import { setContext } from "svelte";

export const init: ServerInit = async () => {
    let client = new TiltifyClient(TILTIFY_CLIENT_ID, TILTIFY_CLIENT_SECRET);
    await client.initialize();

    client.Webhook.activate(TILTIFY_WEBHOOK_ID, () => {
        console.log("webhooks staged");
    });

    const events = { "event_types": ["public:direct:fact_updated", "public:direct:donation_updated"] }
    client.Webhook.subscribe(TILTIFY_WEBHOOK_ID, TILTIFY_CAMPAIGN_ID, events, () => {
        console.log("webhooks activated");
    });

    // how do i use the client elsewhere???
    setContext("tiltify-client", client);
}
