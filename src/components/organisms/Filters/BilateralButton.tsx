import { useState } from 'react';
import { FilterButton } from './FilterButton';
import { Bilateral, BilateralConfig } from 'application/filters/Bilateral';
import Slider from 'components/molecules/Slider';
import { MAX_CONVOLUTION_RADIUS, MIN_CONVOLUTION_RADIUS } from 'consts';

export const BilateralButton = ({ children }: { children?: React.ReactNode }) => {
    const [config, setConfig] = useState<BilateralConfig>({
        radius: 3,
    });
    const labelSize = 90;
    const sliderSize = 200;
    const getWindowChildren = (onChangeFunc: () => void) => (
        <>
            <Slider
                value={config.radius}
                uniqueId="bilateralButton_radius"
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
        </>
    );
    return (
        <>
            <FilterButton<BilateralConfig>
                filter={new Bilateral()}
                config={config}
                title="バイラテラルフィルタ(ノイズ除去)"
                getWindowChildren={getWindowChildren}
            >
                {children}
            </FilterButton>
        </>
    );
};
