import { createWebGL2 } from 'application/canvas/createWebGL2';
function useCreateWebGL2() {
  return () => createWebGL2().gl2;
}
export { useCreateWebGL2 };
