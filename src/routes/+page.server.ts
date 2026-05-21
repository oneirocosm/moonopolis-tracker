import type { PageServerLoad } from "./$types";
import TiltifyClient from "@ericthelemur/tiltify-api-client";
import secrets from '$env/static/private';

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