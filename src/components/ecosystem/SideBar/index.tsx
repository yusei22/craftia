import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import NearMeIcon from '@mui/icons-material/NearMe';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import PanToolIcon from '@mui/icons-material/PanTool';
import { MouseEventHandler, useState } from 'react';
import IconButton from 'components/atoms/IconButton';
import Container from 'components/layout/Container';
import { StageMoveModeButtonWrapper } from 'components/organisms/StageMoveModeButtonWrapper';
import { PenModeButtonWrapper } from 'components/organisms/PenModeButtonWrapper';
import { SpriteMoveModeButtonWrapper } from 'components/organisms/SpriteMoveModeButtonWrapper';
import { SpriteSelectModeButtonWrapper } from 'components/organisms/SpriteSelectModeButtonWrapper';

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
            <SpriteSelectModeButtonWrapper>
                <SideBarIcon
                    onClick={() => {
                        setActive('select');
                    }}
                    isActive={active === 'select'}
                >
                    <NearMeIcon></NearMeIcon>
                </SideBarIcon>
            </SpriteSelectModeButtonWrapper>
            <PenModeButtonWrapper>
                <SideBarIcon
                    onClick={() => {
                        setActive('pen');
                    }}
                    isActive={active === 'pen'}
                >
                    <ModeEditOutlineIcon></ModeEditOutlineIcon>
                </SideBarIcon>
            </PenModeButtonWrapper>
            <StageMoveModeButtonWrapper>
                <SideBarIcon
                    onClick={() => {
                        setActive('stagePan');
                    }}
                    isActive={active === 'stagePan'}
                >
                    <PanToolIcon></PanToolIcon>
                </SideBarIcon>
            </StageMoveModeButtonWrapper>
            <SpriteMoveModeButtonWrapper>
                <SideBarIcon
                    onClick={() => {
                        setActive('spriteMove');
                    }}
                    isActive={active === 'spriteMove'}
                >
                    <OpenWithIcon></OpenWithIcon>
                </SideBarIcon>
            </SpriteMoveModeButtonWrapper>
        </Container>
    );
};
