import { createContext2D } from 'application/canvas/createContext2D';
function useCreateContext2D() {
  return () => createContext2D().context;
}
export { useCreateContext2D };
