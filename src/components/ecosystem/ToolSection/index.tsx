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
import Box from 'components/layout/Box';

type SideBarIconProps = {
    children?: React.ReactNode;
    label?: string;
    isActive?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const SideBarIcon = ({ children, label, isActive, onClick }: SideBarIconProps) => {
    return (
        <IconButton
            variant='transparent'
            css={theme => ({
                width: '100%',
                padding: '5px 6px',
                margin: '3px 0px',
                borderRadius: 5,

                backgroundColor: isActive ? theme.colors.neutral200 : '#0000',
                color: theme.colors.neutral700,
                ':hover': {
                    color: theme.colors.neutral800,
                }
            })}
            onClick={onClick}
        >
            <Container css={theme => ({
                width: '100%',
                flexFlow: 'column',
            })}>
                {children}
                <Box css={theme => ({
                    fontSize: theme.fontSize.xs
                })}>
                    {label}
                </Box>
            </Container>
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
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '10px 5px',
            })}
        >
            <SpriteSelectTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('select');
                    }}
                    isActive={active === 'select'}
                    label='select'
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
                    label='draw'
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
                    label='pan'
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
                    label='move'
                >
                    <OpenWithIcon />
                </SideBarIcon>
            </SpriteMoveTool>
            <UndoButton>
                <SideBarIcon
                    label='undo'
                >
                    <UndoIcon />
                </SideBarIcon>
            </UndoButton>
            <RenoButton>
                <SideBarIcon
                    label='reno'
                >
                    <RedoIcon />
                </SideBarIcon>
            </RenoButton>
        </Container>
    );
};
