import type { ServerInit } from "@sveltejs/kit";
import TiltifyClient from "tiltify-api-client";
import {TILTIFY_CLIENT_ID, TILTIFY_CLIENT_SECRET, TILTIFY_WEBHOOK_ID, TILTIFY_CAMPAIGN_ID} from '$env/static/public';
import { tiltifyClient } from "$lib/tiltify-client";

export const init: ServerInit = async () => {
    await tiltifyClient.initialize();

    tiltifyClient.Webhook.activate(TILTIFY_WEBHOOK_ID, () => {
        console.log("webhooks staged");
    });

    const events = { "event_types": ["public:direct:fact_updated", "public:direct:donation_updated"] }
    tiltifyClient.Webhook.subscribe(TILTIFY_WEBHOOK_ID, TILTIFY_CAMPAIGN_ID, events, () => {
        console.log("webhooks activated");
    });

}
