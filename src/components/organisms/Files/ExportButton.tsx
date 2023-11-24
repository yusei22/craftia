import { useEffect, useState } from 'react';
import { Vec2 } from 'application/core/units';
import { SpritesRenderer } from 'application/render/SpritesRenderer';
import { Sprite } from 'application/sprites/Sprite';

import { stageResolutionAtom, spriteTreeAtom } from 'dataflow';
import { useRecoilValueSyncReader } from 'hooks/useRecoilValueSyncReader';

export type ExportButtonProps = {
    children?: React.ReactNode;
    exportFormat?: string;
    exportName?: string;
    className?: string;
};

export const ExportButton = ({
    children,
    exportFormat,
    exportName,
    className,
}: ExportButtonProps) => {
    const [stageRenderer, setStageRenderer] = useState<SpritesRenderer | null>(null);
    const [url, setUrl] = useState('#');

    const getSpriteTreeSync = useRecoilValueSyncReader<Sprite[]>();
    const getArtobardResolutionSync = useRecoilValueSyncReader<Vec2>();

    const onClick = () => {
        if (stageRenderer === null) {
            return;
        }

        const resolution = getArtobardResolutionSync(stageResolutionAtom);
        const sprites = getSpriteTreeSync(spriteTreeAtom);

        stageRenderer.viewport(resolution);
        stageRenderer.render(sprites);

        setUrl(stageRenderer.getResult().toDataURL(exportFormat));
    };

    useEffect(() => {
        setStageRenderer(new SpritesRenderer());
    }, []);

    return (
        <a
            className={className}
            onClick={onClick}
            href={url}
            download={exportName}
            css={(theme) => ({ color: theme.colors.black })}
        >
            {children}
        </a>
    );
};
