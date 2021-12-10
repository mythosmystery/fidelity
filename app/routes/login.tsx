import { GLogin } from '../components/GLogin';

export default function Login() {
   return (
      <div className='w-full h-screen flex justify-center items-center'>
         <GLogin redirectTo='/profile' />
      </div>
   );
}
