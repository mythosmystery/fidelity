export function Authorized() {
   return function (...args: any[]) {
      args.forEach(arg => console.log(arg));
   };
}
