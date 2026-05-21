import type { PageServerLoad } from "./$types";
import TiltifyClient from "tiltify-api-client";
import secrets from '$env/static/public';

import { getContext } from "svelte";

export const load: PageServerLoad = async({params}) => {
    const client = getContext("tiltify-client") as any;

    let totalInit = 0;
    client?.Campaigns?.get(secrets.TILTIFY_CAMPAIGN_ID, (campaign) => {
        totalInit = campaign.amount_raised as number;
    });

    return {
        totalInit,
    }
}
