import type { PageServerLoad } from "./$types";
import TiltifyClient from "tiltify-api-client";
import {TILTIFY_CAMPAIGN_ID} from '$env/static/public';
import { tiltifyClient } from "$lib/tiltify-client";


export const load: PageServerLoad = async({params}) => {

    let totalInit = 0;
    tiltifyClient?.Campaigns?.get(TILTIFY_CAMPAIGN_ID, (campaign) => {
        totalInit = campaign.amount_raised as number;
    });

    return {
        totalInit,
    }
}
