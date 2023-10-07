import { RenderView } from 'components/organisms/RenderingArea/RenderView';
import { RenderViewWrapper } from 'components/organisms/RenderingArea/RenderViewWrapper';
import { useRecoilValue } from "recoil"
import { renderViewListenersAtom } from "dataflow"

const RenderingArea = () => {
    const RenderViewEventFuncs = useRecoilValue(renderViewListenersAtom);

    return (
        <>
            <RenderViewWrapper events={RenderViewEventFuncs}>
                <RenderView />
            </RenderViewWrapper>
        </>
    )
}
export { RenderingArea }