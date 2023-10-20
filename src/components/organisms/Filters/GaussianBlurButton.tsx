import { useState } from 'react';
import { FilterButton } from './FilterButton';
import { GaussianBlur, GaussianBlurConfig } from 'application/filters/GaussianBlur';
import Slider from 'components/molecules/Slider';
import { MAX_CONVOLUTION_RADIUS, MIN_CONVOLUTION_RADIUS } from 'consts';

export const GaussianBlurButton = ({ children }: { children?: React.ReactNode }) => {
    const [config, setConfig] = useState<GaussianBlurConfig>({
        radius: 0.5,
    });
    const labelSize = 90;
    const sliderSize = 200;
    const getWindowChildren = (updateFilter: () => void) => (
        <>
            <Slider
                value={config.radius}
                uniqueId="bilateralButton_radius"
                max={MAX_CONVOLUTION_RADIUS * 2}
                min={MIN_CONVOLUTION_RADIUS}
                step={0.5}
                label="半径"
                labelSize={labelSize}
                sliderSize={sliderSize}
                onChange={(e) => {
                    setConfig((curVal) => ({
                        ...curVal,
                        radius: parseFloat(e.target.value),
                        sigma: parseFloat(e.target.value) / 3,
                    }));
                    updateFilter();
                }}
            />
        </>
    );
    return (
        <>
            <FilterButton<GaussianBlurConfig>
                filter={new GaussianBlur()}
                config={config}
                title="ガウシアンフィルタ"
                getWindowChildren={getWindowChildren}
            >
                {children}
            </FilterButton>
        </>
    );
};
