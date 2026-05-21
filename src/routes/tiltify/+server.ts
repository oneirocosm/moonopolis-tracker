import { json } from "@sveltejs/kit";
import { createHmac } from "node:crypto";
import { TILTIFY_WEBHOOK_SECRET} from "$env/static/public";
import { eventManager } from "$lib/events.js";

function validateSignature(req: Request): boolean {
    const signatureIn = req.headers.get('X-Tiltify-Signature')
    const timestamp = req.headers.get('X-Tiltify-Timestamp')
    const signedPayload = `${timestamp}.${JSON.stringify(req.body)}`
    const hmac = createHmac('sha256', TILTIFY_WEBHOOK_SECRET);
    hmac.update(signedPayload);
    const signature = hmac.digest('base64');
    return (signatureIn === signature)
}

export async function POST({request}) {
    const validated = validateSignature(request);
    if (!validated) {
        console.log("invalid request received");

        // api requires this be sent regardless
        return json({success: true}, {status: 200});
    }
    const body = await request.json();
    if (body?.meta?.event_type == "public:direct:donation_updated") {
        eventManager.emit("donation", body?.data)
        console.log("received donation: ", body?.data)
        // handle donation     
    } else if (body?.meta?.event_type == "public:direct:fact_updated") {
        eventManager.emit("total", body?.data)
        console.log("received total: ", body?.data)
        // handle total
    }

    return json({success: true}, {status: 200});
}
