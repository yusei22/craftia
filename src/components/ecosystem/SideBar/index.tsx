import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import PanToolIcon from '@mui/icons-material/PanTool';
import { MouseEventHandler, useState } from 'react';
import IconButton from 'components/atoms/IconButton';
import Container from 'components/layout/Container';
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
            variant={isActive ? 'primary' : 'translucent'}
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

export const SideBar = () => {
    const [active, setActive] = useState<SideBarButtonNames | null>(null);

    return (
        <Container
            css={(theme) => ({
                width: '50px',
                height: '100%',
                backgroundColor: theme.colors.white,
                boxShadow: '0 0 35px 0 rgba(0, 0, 0, .2)',
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
                    <NearMeIcon></NearMeIcon>
                </SideBarIcon>
            </SpriteSelectTool>
            <PenTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('pen');
                    }}
                    isActive={active === 'pen'}
                >
                    <ModeEditOutlineIcon></ModeEditOutlineIcon>
                </SideBarIcon>
            </PenTool>
            <StageMoveTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('stagePan');
                    }}
                    isActive={active === 'stagePan'}
                >
                    <PanToolIcon></PanToolIcon>
                </SideBarIcon>
            </StageMoveTool>
            <SpriteMoveTool>
                <SideBarIcon
                    onClick={() => {
                        setActive('spriteMove');
                    }}
                    isActive={active === 'spriteMove'}
                >
                    <OpenWithIcon></OpenWithIcon>
                </SideBarIcon>
            </SpriteMoveTool>
        </Container>
    );
};
