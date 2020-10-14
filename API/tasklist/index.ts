import { Context, HttpRequest } from "@azure/functions";
import { init } from './db';

export default async (context: Context, { method, body }: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    const { getTasklist } = init();

    let response;
    if (method === "GET") {
        response = getTasklist();
    }

    context.res = {
        body: JSON.stringify(response)
    };
};
