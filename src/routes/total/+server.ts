import { produce } from "sveltekit-sse";
import type { RequestHandler } from './$types';
import { eventManager } from "$lib/events";

export const POST: RequestHandler = async () => {
    return produce(async function start({emit}) {
        // Create a function so we can remove it when the client disconnects
        const send = (total: string) => {
	  console.log("sending to frontend: total:", total);
          const { error } = emit('message', total);
          // We errored sending to client - likely because they've disconnected
          if (error) {
            return cancel()
          }
        }

        const cancel = () => {
          eventManager.removeListener("total", send);
        }

        eventManager.on("total", send);
    });
}
