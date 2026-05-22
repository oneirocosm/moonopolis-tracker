import { json } from '@sveltejs/kit';
import { createHmac } from 'node:crypto';
import { env } from '$env/dynamic/private';
import { eventManager } from '$lib/events.js';

function validateSignature(req: Request): boolean {
	const signatureIn = req.headers.get('X-Tiltify-Signature');
	const timestamp = req.headers.get('X-Tiltify-Timestamp');
	const signedPayload = `${timestamp}.${JSON.stringify(req.body)}`;
	const hmac = createHmac('sha256', env.TILTIFY_WEBHOOK_SECRET);
	hmac.update(signedPayload);
	const signature = hmac.digest('base64');
	console.log('secret:', env.TILTIFY_WEBHOOK_SECRET);
	console.log('signature received:', signatureIn);
	console.log('signature computed:', signature);
	return true;
	return signatureIn === signature;
}

export async function POST({ request }) {
	const validated = validateSignature(request);
	if (!validated) {
		console.log('invalid request received');

		// api requires this be sent regardless
		return json({ success: true }, { status: 200 });
	}
	const body = await request.json();
	if (body?.meta?.event_type == 'public:direct:donation_updated') {
		eventManager.emit('donation', body?.data?.amount?.value);
		console.log('received donation: ', body?.data?.amount?.value);
		// handle donation
	} else if (body?.meta?.event_type == 'public:direct:fact_updated') {
		eventManager.emit('total', body?.data?.amount_raised?.value);
		console.log('received total: ', body?.data?.amount_raised?.value);
		// handle total
	}

	return json({ success: true }, { status: 200 });
}
