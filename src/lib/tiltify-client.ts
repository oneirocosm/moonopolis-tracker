import TiltifyClient from 'tiltify-api-client';
import { env } from '$env/dynamic/private';

console.log(env.TILTIFY_CLIENT_ID);
console.log(env.TILTIFY_CLIENT_SECRET);
export const tiltifyClient = new TiltifyClient(env.TILTIFY_CLIENT_ID, env.TILTIFY_CLIENT_SECRET);
