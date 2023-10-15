import { useState } from 'react';
import { FilterButton } from './FilterButton';
import { UnsharpMasking, UnsharpMaskingConfig } from 'application/filters/UnsharpMasking';
import Slider from 'components/molecules/Slider';
import {
    MAX_CONVOLUTION_RADIUS,
    MAX_UNSHARPMASKING_THRESHOLD,
    MIN_CONVOLUTION_RADIUS,
    MIN_UNSHARPMASKING_THRESHOLD,
} from 'consts';

export const UnsharpMaskingButton = ({ children }: { children?: React.ReactNode }) => {
    const [config, setConfig] = useState<UnsharpMaskingConfig>({
        radius: 3,
        threshold: 1.5,
    });
    const labelSize = 90;
    const sliderSize = 200;
    const getWindowChildren = (onChangeFunc: () => void) => (
        <>
            <Slider
                value={config.radius}
                uniqueId="unsharpMaskingPanel_radius"
                max={MAX_CONVOLUTION_RADIUS}
                min={MIN_CONVOLUTION_RADIUS}
                step={1}
                label="半径"
                labelSize={labelSize}
                sliderSize={sliderSize}
                onChange={(e) => {
                    setConfig((curVal) => ({
                        ...curVal,
                        radius: parseFloat(e.target.value),
                    }));
                    onChangeFunc();
                }}
            />
            <Slider
                value={config.threshold}
                uniqueId="unsharpMaskingPanel_threshold"
                max={MAX_UNSHARPMASKING_THRESHOLD}
                min={MIN_UNSHARPMASKING_THRESHOLD}
                step={0.1}
                sliderSize={sliderSize}
                label="閾値"
                labelSize={labelSize}
                onChange={(e) => {
                    setConfig((curVal) => ({
                        ...curVal,
                        threshold: parseFloat(e.target.value),
                    }));
                    onChangeFunc();
                }}
            />
        </>
    );
    return (
        <>
            <FilterButton<UnsharpMaskingConfig>
                filter={new UnsharpMasking()}
                config={config}
                title="アンシャープマスキング"
                getWindowChildren={getWindowChildren}
            >
                {children}
            </FilterButton>
        </>
    );
};
