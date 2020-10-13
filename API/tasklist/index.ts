import { Context, HttpRequest } from "@azure/functions";
import { dbConnect } from './db';

export default async (context: Context, { method, body }: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    const response = dbConnect({ method, body });

    context.res = {
        body: JSON.stringify(response)
    };
};
