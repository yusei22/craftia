import { useRecoilValue } from 'recoil';
import { RenderView } from 'components/ecosystem/RwnderView/RenderView';
import { RenderViewWrapper } from 'components/ecosystem/RwnderView/RenderViewWrapper';
import { renderViewListenersAtom } from 'dataflow';

export const RenderingSection = () => {
    const RenderViewEventFuncs = useRecoilValue(renderViewListenersAtom);

    return (
        <>
            <RenderViewWrapper events={RenderViewEventFuncs}>
                <RenderView />
            </RenderViewWrapper>
        </>
    );
};
