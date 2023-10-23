import { SpritesRenderer } from "application/render/SpritesRenderer";
import Button from "components/atoms/Button";
import { useGetArtobardResolutionSync } from "hooks/artboards/useGetArtobardResolutionSync";
import { useGetSpriteTreeSync } from "hooks/sprites/useGetSpriteTreeSync";
import { useEffect, useState } from "react";

export const ExportButton = () => {
    const [artboardRenderer, setArtboardRenderer] = useState<SpritesRenderer | null>(null);
    const getSpriteTreeSync = useGetSpriteTreeSync();
    const getArtobardResolutionSync = useGetArtobardResolutionSync();
    const [url, setUrl] = useState('#')
    const [fileName, setFilename] = useState('project.png')

    const onClick = () => {
        if (artboardRenderer === null) {
            return;
        }
        const resolution = getArtobardResolutionSync();
        const sprites = getSpriteTreeSync();
        artboardRenderer.viewport(resolution);
        artboardRenderer.render(sprites);
        setUrl(artboardRenderer.getResult().toDataURL());
        setFilename('project.png')
    }

    useEffect(() => {
        setArtboardRenderer(new SpritesRenderer());
    }, []);

    return (
        <a onClick={onClick} href={url} download={fileName}>
            <Button>
                書き出し
            </Button>
        </a>
    )
}