import { Interpolation, Theme } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import FilterIcon from '@mui/icons-material/Filter';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { DrawTabPanel } from '../DrawTabPanel';
import { FileTabPanel } from '../FileTabPanel.ts';
import { FilterTabPabel } from '../FilterTabPabel';
import { RibbonTab } from './RibbonTab';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';
import { MQ } from 'mediaQuery';

const tabStyles: Interpolation<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    width: '100vw',
    boxShadow: '0 0 35px 0 rgba(0, 0, 0, .2)',
    [MQ.md]: {
        flexDirection: 'column-reverse',
    },
    ul: {
        margin: '0px',
        padding: '0px',
        paddingInline: '0px',
    },
});
const TabPanelChildWrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Wrapper
            css={{
                height: '200px',
                width: '100vw',
                [MQ.md]: {
                    height: '90px',
                },
            }}
        >
            {children}
        </Wrapper>
    );
};

export const RibbonTabs = () => {
    const [tabIndex, setTabIndex] = useState<number>(0);

    return (
        <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => {
                setTabIndex((culVal) => (culVal === index ? -1 : index));
            }}
            css={tabStyles}
        >
            <TabPanel>
                <TabPanelChildWrapper>
                    <FileTabPanel />
                </TabPanelChildWrapper>
            </TabPanel>
            <TabPanel>
                <TabPanelChildWrapper>
                    <DrawTabPanel />
                </TabPanelChildWrapper>
            </TabPanel>
            <TabPanel>
                <TabPanelChildWrapper>
                    <FilterTabPabel />
                </TabPanelChildWrapper>
            </TabPanel>
            <TabList>
                <Container
                    css={{
                        justifyContent: 'left',
                        margin: '10px',
                        marginBottom: '10px',
                        [MQ.md]: {
                            marginBottom: '0px',
                        },
                    }}
                >
                    <RibbonTab
                        icon={<InsertDriveFileIcon />}
                        text="ファイル"
                        isAcrive={tabIndex === 0}
                    />
                    <RibbonTab icon={<EditIcon />} text="描画" isAcrive={tabIndex === 1} />
                    <RibbonTab icon={<FilterIcon />} text="フィルタ" isAcrive={tabIndex === 2} />
                </Container>
            </TabList>
        </Tabs>
    );
};
