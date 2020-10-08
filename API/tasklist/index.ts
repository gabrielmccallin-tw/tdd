import { Context, HttpRequest } from "@azure/functions";
import { get, update } from './db';

export default async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    let body;
    if (req.method === "GET") {
        body = get();
    }
    if (req.method === "POST") {
        update(req.body);
        body = JSON.stringify(get());
    }

    context.res = {
        body
    };
};
