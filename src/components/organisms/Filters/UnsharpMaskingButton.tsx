import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { GLFilterButton } from './GLFilterButton';
import { FilterWorker } from 'application/filters/Filter';
import { GaussianBlurConfig } from 'application/filters/GaussianBlur';
import { UnsharpMasking, UnsharpMaskingConfig } from 'application/filters/UnsharpMasking';
import { Rasterizedmage, SmartImage } from 'application/sprites';
import Box from 'components/layout/Box';
import { ConfirmButtons } from 'components/molecules/ConfirmButtons';
import { NumberField } from 'components/molecules/NumberField';
import {
    MAX_CONVOLUTION_RADIUS,
    MAX_UNSHARPMASKING_THRESHOLD,
    MIN_CONVOLUTION_RADIUS,
    MIN_UNSHARPMASKING_THRESHOLD,
} from 'consts';
import { useSpriteTreeSaver } from 'dataflow';
import { floatingWindowAtom } from 'dataflow/windows/floatingWindowAtom';
import { useSpriteSetterID } from 'hooks/sprites/useSpriteSetterID';

export const UnsharpMaskingButton = ({ children }: { children?: React.ReactNode }) => {
    return (
        <GLFilterButton
            filter={new UnsharpMasking()}
            label="アンシャープマスキング"
            WindowContents={UnsharpMaskingWindowContents}
        >
            {children}
        </GLFilterButton>
    );
};

const UnsharpMaskingWindowContents = ({
    sprite,
    worker,
    onClose,
}: {
    sprite: Rasterizedmage | SmartImage;
    worker: FilterWorker<GaussianBlurConfig>;
    onClose: () => unknown;
}) => {
    const setWindow = useSetRecoilState(floatingWindowAtom);
    const setSpriteId = useSpriteSetterID();
    const saveSpriteTree = useSpriteTreeSaver();

    const [config, setConfig] = useState<UnsharpMaskingConfig>({
        radius: 3,
        threshold: 1.5,
    });

    const onConsent = () => {
        saveSpriteTree();
        onClose();
    };

    const onCancel = () => {
        setSpriteId(sprite.prefs.id, (sprite) => worker?.getOriginalSprite() || sprite);
        onClose();
    };

    useEffect(() => {
        setWindow((culVal) => ({
            ...culVal,
            onClose: onCancel,
        }));
        worker.execute(config);
        setSpriteId(sprite.prefs.id, (sprite) => worker.getPreviewSprite() || sprite);
    }, []);

    useEffect(() => {
        worker.execute(config);
        setSpriteId(sprite.prefs.id, (sprite) => worker?.getPreviewSprite() || sprite);
    }, [config]);

    return (
        <Box
            css={(theme) => ({
                backgroundColor: theme.colors.white,
                padding: '20px',
            })}
        >
            <NumberField
                value={config.radius}
                id="unsharpMaskingPanelRadius"
                max={MAX_CONVOLUTION_RADIUS}
                min={MIN_CONVOLUTION_RADIUS}
                step={1}
                label="半径"
                setValue={(v) => {
                    setConfig((curVal) => ({
                        ...curVal,
                        radius: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
                }}
            />
            <NumberField
                value={config.threshold}
                id="unsharpMaskingPanelThreshold"
                max={MAX_UNSHARPMASKING_THRESHOLD}
                min={MIN_UNSHARPMASKING_THRESHOLD}
                step={0.1}
                label="閾値"
                setValue={(v) => {
                    setConfig((curVal) => ({
                        ...curVal,
                        threshold: v,
                    }));
                }}
                width={400}
                css={{
                    flexFlow: 'column',
                }}
            />
            <ConfirmButtons
                css={{
                    width: '100%',
                    justifyContent: 'end',
                }}
                onCancel={onCancel}
                onConsent={onConsent}
            />
        </Box>
    );
};
