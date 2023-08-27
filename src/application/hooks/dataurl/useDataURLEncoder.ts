import { useEffect, useState } from 'react';
import { useCreateContext2D } from '../canvas/useCreateContext2D';
import { DataURLEncoder } from 'application/data-url/encode-system/DataURLEncoder';

function useLayerDataURLEncoder() {
  const [dataurlEncoer, setDataURLEncoer] = useState<DataURLEncoder | null>(null);
  const createContext2D = useCreateContext2D();

  useEffect(() => {
    setDataURLEncoer(new DataURLEncoder(createContext2D()));
  }, []);

  return dataurlEncoer;
}
export { useLayerDataURLEncoder };
