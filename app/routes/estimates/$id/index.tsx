import { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
   console.log(params.id);
   return null;
};

export default function index() {
   return <p>index page</p>;
}
