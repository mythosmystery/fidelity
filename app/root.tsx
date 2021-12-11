import { LoaderFunction, Outlet, useCatch, useLoaderData } from 'remix';
import type { LinksFunction } from 'remix';

import tailwind from './tailwind.css';
import { Layout } from './components/core/layout';
import { Document } from './components/core/doc';
import { isSignedIn } from './utils/session.server';
import { AuthProvider } from './components/auth';
import { Header } from './components/Header/Header';

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
   return [{ rel: 'stylesheet', href: tailwind }];
};

export const loader: LoaderFunction = async ({ request }) => {
   return await isSignedIn(request);
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
   const isSignedIn = useLoaderData<boolean>();
   return (
      <Document>
         <Layout>
            <AuthProvider initialState={isSignedIn}>
               <Header />
               <Outlet />
            </AuthProvider>
         </Layout>
      </Document>
   );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
   console.error(error);
   return (
      <Document title='Error!'>
         <Layout>
            <div>
               <h1>There was an error</h1>
               <p>{error.message}</p>
               <hr />
               <p>Hey, developer, you should replace this with what you want your users to see.</p>
            </div>
         </Layout>
      </Document>
   );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
   let caught = useCatch();

   let message;
   switch (caught.status) {
      case 401:
         message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
         break;
      case 404:
         message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
         break;

      default:
         throw new Error(caught.data || caught.statusText);
   }

   return (
      <Document title={`${caught.status} ${caught.statusText}`}>
         <Layout>
            <h1>
               {caught.status}: {caught.statusText}
            </h1>
            {message}
         </Layout>
      </Document>
   );
}
