import { LayerSettings } from 'application/layers/layer-settings/LayerSettings';
import { EmptyLayer, RasterizedCtx2DLayer } from 'application/layers/layers-body';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { layerTreeState, layerTreeHistoryState, layerTreeUndoRedo } from 'stores/LayerTree';

const LayerTreeRoot = ({ children }: { children: any }) => {
    const setLayerTreeHistory = useSetRecoilState(layerTreeHistoryState);
    const setLayerTree = useSetRecoilState(layerTreeState);
    const saver = layerTreeUndoRedo.useSaver();
    useEffect(() => {
        const createCtx2D = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            return ctx;
        };
        const initLayerTree = async () => {
            const layer1 = new RasterizedCtx2DLayer(createCtx2D(), new LayerSettings({ name: 'レイヤー1' }));
            layer1.useContext2D((context: CanvasRenderingContext2D) => {
                context.beginPath();
                context.arc(100, 100, 50, (0 * Math.PI) / 180, (360 * Math.PI) / 180, false);
                context.fillStyle = 'rgba(255,0,0,0.8)';
                context.fill();
                context.strokeStyle = 'purple';
                context.lineWidth = 8;
                context.stroke();
            });
            const layer2 = new RasterizedCtx2DLayer(createCtx2D(), new LayerSettings({ name: 'レイヤー２' }));
            layer2.useContext2D((context: CanvasRenderingContext2D) => {
                context.beginPath();
                context.arc(100, 100, 50, (0 * Math.PI) / 180, (360 * Math.PI) / 180, false);
                context.fillStyle = 'rgba(0,0,0,1)';
                context.fill();
                context.strokeStyle = 'rgba(0,0,0,1)';
                context.lineWidth = 8;
                context.stroke();
            });
            const ids = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];
            setLayerTree([
                {
                    id: ids[0],
                    layer: new EmptyLayer(createCtx2D(), new LayerSettings({ name: 'レイヤー1' })),
                },
                {
                    id: ids[1],
                    layer: layer2,
                },
            ]);
            await saver(createCtx2D, [
                {
                    id: ids[0],
                    layer: new EmptyLayer(createCtx2D(), new LayerSettings({ name: 'レイヤー1' })),
                },
                {
                    id: ids[1],
                    layer: layer2,
                },
            ]);
        };
        initLayerTree();
    }, []);
    return <>{children}</>;
};
export { LayerTreeRoot };
