import LayersIcon from '@mui/icons-material/Layers';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NearMeIcon from '@mui/icons-material/NearMe';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import PanToolIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { MouseEventHandler, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ColorTool } from '../../organisms/Tools/ColorTool';
import IconButton from 'components/atoms/IconButton';
import Container from 'components/layout/Container';
import { LayerSectionVisibilityButton } from 'components/organisms/Displays/LayerSectionVisibilityButton';
import { RenoButton } from 'components/organisms/Edits/RenoButton';
import { UndoButton } from 'components/organisms/Edits/UndoButton';
import { PenTool } from 'components/organisms/Tools/PenTool';
import { SpriteMoveTool } from 'components/organisms/Tools/SpriteMoveTool';
import { SpriteSelectTool } from 'components/organisms/Tools/SpriteSelectTool';
import { StageMoveTool } from 'components/organisms/Tools/StageMoveTool';
import { layerSectionVisibilityAtom } from 'dataflow/displays/layerSectionVisibilityAtom';

type ToolIconButtonProps = {
    children?: React.ReactNode;
    label?: string;
    isActive?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ToolIconButton = ({ children, isActive, onClick }: ToolIconButtonProps) => {
    return (
        <IconButton
            variant="transparent"
            css={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '4px 7px',
                backgroundColor: isActive ? theme.colors.neutral300 : '#0000',
                color: theme.colors.neutral800,
                borderRadius: isActive ? '0% 20% 20% 0%' : '20%',
                borderLeft: isActive ? `3px solid ${theme.colors.primary600}` : `3px solid #0000`,
                ':hover': {
                    backgroundColor: theme.colors.neutral300,
                },
            })}
            onClick={onClick}
        >
            {children}
        </IconButton>
    );
};

export type ToolButtonNames = 'select' | 'pen' | 'stagePan' | 'spriteMove';

export type ToolBarProps = {
    className?: string;
};

export const ToolBar = ({ className }: ToolBarProps) => {
    const [active, setActive] = useState<ToolButtonNames | null>(null);
    const layerSectionVisibility = useRecoilValue(layerSectionVisibilityAtom);

    return (
        <Container
            className={className}
            css={(theme) => ({
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: 5,
                backgroundColor: theme.colors.neutral200,

                overflowY: 'auto',
                '::-webkit-scrollbar': {
                    display: 'none',
                },
                '-ms-overflow-style': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                gap: 6,
            })}
        >
            <SpriteSelectTool>
                <ToolIconButton
                    onClick={() => {
                        setActive('select');
                    }}
                    isActive={active === 'select'}
                    label="select"
                >
                    <NearMeIcon />
                </ToolIconButton>
            </SpriteSelectTool>
            <PenTool>
                <ToolIconButton
                    onClick={() => {
                        setActive('pen');
                    }}
                    isActive={active === 'pen'}
                >
                    <ModeEditIcon />
                </ToolIconButton>
            </PenTool>
            <StageMoveTool>
                <ToolIconButton
                    onClick={() => {
                        setActive('stagePan');
                    }}
                    isActive={active === 'stagePan'}
                >
                    <PanToolIcon />
                </ToolIconButton>
            </StageMoveTool>
            <SpriteMoveTool>
                <ToolIconButton
                    onClick={() => {
                        setActive('spriteMove');
                    }}
                    isActive={active === 'spriteMove'}
                >
                    <OpenWithIcon />
                </ToolIconButton>
            </SpriteMoveTool>
            <LayerSectionVisibilityButton>
                <ToolIconButton isActive={layerSectionVisibility}>
                    <LayersIcon />
                </ToolIconButton>
            </LayerSectionVisibilityButton>
            <ToolIconButton>
                <ColorTool />
            </ToolIconButton>
            <UndoButton>
                <ToolIconButton>
                    <UndoIcon />
                </ToolIconButton>
            </UndoButton>
            <RenoButton>
                <ToolIconButton>
                    <RedoIcon />
                </ToolIconButton>
            </RenoButton>
        </Container>
    );
};
