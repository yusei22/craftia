import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { cloneToStatic } from 'application/layers/layer-clone/cloneToStatic';
import { memo, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { getLayerIndexFromID } from 'application/layers/layer-tree/layer-tree-management/getLayerIndex';
import { shallowCopyLayerTree } from 'application/layers/layer-tree/layer-tree-management/shallowCopyLayerTree';
import { Layer } from 'application/types';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import { layerTreeState, layerTreeUndoRedo } from 'stores/LayerTree';

const LayerPanel = memo(({ id, layer }: { id: string; layer: Layer }) => {
  const [layerTree, setLayerTree] = useRecoilState(layerTreeState);
  const saveHistory = layerTreeUndoRedo.useSaver();

  const handleVisible = async () => {
    const createCtx2D = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      return ctx;
    };
    const index = getLayerIndexFromID(layerTree, id);

    if (index === null) return;
    const newLayerTree = shallowCopyLayerTree(layerTree);
    const newLayer = (await cloneToStatic(newLayerTree[index].layer, createCtx2D, true)).editSettings({
      visible: !newLayerTree[index].layer.settings.visible,
    });

    newLayerTree[index].layer = newLayer;
    setLayerTree(newLayerTree);

    await saveHistory(createCtx2D, newLayerTree);
  };
  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };
  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    ctx.drawImage(layer.source, 0, 0, 65, 30);
  }, []);
  return (
    <>
      <Flex
        $width={'300px'}
        $height={'50px'}
        $backgroundColor={'primaryLight'}
        $borderRadius={'10px'}
        $margin={'10px'}
        $padding={'10px'}
        $justifyContent={'space-between'}
        $alignItems={'center'}
      >
        <Box onClick={handleVisible}>{layer.settings.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}</Box>
        <Box>{layer.settings.name}</Box>
        <Box $backgroundColor={'white'}>
          <canvas width={'65px'} height={'30px'} ref={canvasRef} />
        </Box>
      </Flex>
    </>
  );
});
export { LayerPanel };
