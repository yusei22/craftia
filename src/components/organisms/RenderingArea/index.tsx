import { RenderView } from 'components/organisms/RenderView';
import { RenderViewWrapper } from 'components/organisms/RenderViewWrapper';
import { useRecoilValue } from "recoil"
import { RenderViewListenersAtom } from "stores"

const RenderingArea = () => {
    const RenderViewEventFuncs = useRecoilValue(RenderViewListenersAtom);

    return (
        <>
            <RenderViewWrapper events={RenderViewEventFuncs}>
                <RenderView />
            </RenderViewWrapper>
        </>
    )
}
export { RenderingArea }