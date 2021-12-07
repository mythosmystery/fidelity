import dotenv from 'dotenv';
dotenv.config();
import { renderToString } from 'react-dom/server';
import { HandleDataRequestFunction, RemixServer } from 'remix';
import type { EntryContext } from 'remix';

export default function handleRequest(
   request: Request,
   responseStatusCode: number,
   responseHeaders: Headers,
   remixContext: EntryContext
) {
   let markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

   responseHeaders.set('Content-Type', 'text/html');

   return new Response('<!DOCTYPE html>' + markup, {
      status: responseStatusCode,
      headers: responseHeaders
   });
}

export const handleDataRequest: HandleDataRequestFunction = async (response: Response) => {
   return response;
};
