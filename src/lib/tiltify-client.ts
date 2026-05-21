import TiltifyClient from "tiltify-api-client";
import {TILTIFY_CLIENT_ID, TILTIFY_CLIENT_SECRET, TILTIFY_WEBHOOK_ID, TILTIFY_CAMPAIGN_ID} from '$env/static/public';

export const tiltifyClient = new TiltifyClient(TILTIFY_CLIENT_ID, TILTIFY_CLIENT_SECRET);