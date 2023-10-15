import { useRecoilValue } from 'recoil';
import { RenderView } from 'components/ecosystem/RenderingArea/RenderView';
import { RenderViewWrapper } from 'components/ecosystem/RenderingArea/RenderViewWrapper';
import { renderViewListenersAtom } from 'dataflow';

const RenderingArea = () => {
    const RenderViewEventFuncs = useRecoilValue(renderViewListenersAtom);

    return (
        <>
            <RenderViewWrapper events={RenderViewEventFuncs}>
                <RenderView />
            </RenderViewWrapper>
        </>
    );
};
export { RenderingArea };
