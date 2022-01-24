import { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ params }) => {
   console.log(params.id);
   return null;
};

export default function add() {
   return <p>Add page</p>;
}
