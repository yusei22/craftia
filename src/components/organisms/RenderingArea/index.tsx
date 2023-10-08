import { useRecoilValue } from 'recoil';
import { RenderView } from 'components/organisms/RenderingArea/RenderView';
import { RenderViewWrapper } from 'components/organisms/RenderingArea/RenderViewWrapper';
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
