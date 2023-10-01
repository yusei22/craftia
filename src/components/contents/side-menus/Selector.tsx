import NearMeIcon from '@mui/icons-material/NearMe';
import { SpritesHitDetector } from 'application/render/SpritesHitDetector';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { RenderViewEventFuncsState } from 'stores';

type selectorProps = {
    iconSize: string;
}

const Selector = () => {
    const [hitDetector, setHitDetector] = useState<SpritesHitDetector | null>(null);
    const setRenderViewListeners = useSetRecoilState(RenderViewEventFuncsState);

    function onClick() {

    }

    useEffect(() => {
        setHitDetector(new SpritesHitDetector());
    }, [])


    return (
        <>
            <NearMeIcon ></NearMeIcon>
        </>
    )
}
