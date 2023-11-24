import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import PanToolIcon from '@mui/icons-material/PanTool';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { MouseEventHandler, useState } from 'react';
import IconButton from 'components/atoms/IconButton';
import Container from 'components/layout/Container';
import { RenoButton } from 'components/organisms/Edits/RenoButton';
import { UndoButton } from 'components/organisms/Edits/UndoButton';
import { PenTool } from 'components/organisms/Tools/PenTool';
import { SpriteMoveTool } from 'components/organisms/Tools/SpriteMoveTool';
import { SpriteSelectTool } from 'components/organisms/Tools/SpriteSelectTool';
import { StageMoveTool } from 'components/organisms/Tools/StageMoveTool';

type SideBarIconProps = {
    children?: React.ReactNode;
    isActive?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const SideBarIcon = ({ children, isActive, onClick }: SideBarIconProps) => {
    return (
        <IconButton
            variant={isActive ? 'translucentDark' : 'translucent'}
            css={{
                borderRadius: '5px',
            }}
            onClick={onClick}
        >
            {children}
        </IconButton>
    );
};
type SideBarButtonNames = 'select' | 'pen' | 'stagePan' | 'spriteMove';

export type ToolSectionProps = {
    className?: string;
};

export const ToolSection = ({ className }: ToolSectionProps) => {
    const [active, setActive] = useState<SideBarButtonNames | null>(null);

    return (
        <Container
            className={className}
            css={(theme) => ({
                backgroundColor: theme.colors.neutral100,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '20px 0px',
            })}
        >
            <SpriteSelectTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('select');
                    }}
                    isActive={active === 'select'}
                >
                    <NearMeIcon />
                </SideBarIcon>
            </SpriteSelectTool>
            <PenTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('pen');
                    }}
                    isActive={active === 'pen'}
                >
                    <ModeEditOutlineIcon />
                </SideBarIcon>
            </PenTool>
            <StageMoveTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('stagePan');
                    }}
                    isActive={active === 'stagePan'}
                >
                    <PanToolIcon />
                </SideBarIcon>
            </StageMoveTool>
            <SpriteMoveTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('spriteMove');
                    }}
                    isActive={active === 'spriteMove'}
                >
                    <OpenWithIcon />
                </SideBarIcon>
            </SpriteMoveTool>
            <UndoButton>
                <SideBarIcon>
                    <UndoIcon />
                </SideBarIcon>
            </UndoButton>
            <RenoButton>
                <SideBarIcon>
                    <RedoIcon />
                </SideBarIcon>
            </RenoButton>
        </Container>
    );
};
