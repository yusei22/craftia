import { useSetRecoilState } from 'recoil';
import Wrapper from 'components/layout/Wrapper';
import { layerSectionVisibilityAtom } from 'dataflow/displays/layerSectionVisibilityAtom';

export type LayerSectionVisibilityButtonProps = {
    children?: React.ReactNode;
    className?: string;
};

export const LayerSectionVisibilityButton = ({
    children,
    className,
}: LayerSectionVisibilityButtonProps) => {
    const setLayerSectionVisibility = useSetRecoilState(layerSectionVisibilityAtom);
    return (
        <Wrapper
            className={className}
            onClick={() => {
                setLayerSectionVisibility((culVal) => {
                    return !culVal;
                });
            }}
        >
            {children}
        </Wrapper>
    );
};
