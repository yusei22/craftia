import { Tab } from 'react-tabs';
import type { ReactTabsFunctionComponent, TabProps } from 'react-tabs';
import { TabButton } from 'components/molecules/TabButton';

type CustomTabProps = TabProps & {
    icon: React.ReactNode;
    text: string;
    isAcrive?: boolean;
};

export const RibbonTab: ReactTabsFunctionComponent<CustomTabProps> = ({
    children,
    icon,
    text,
    isAcrive,
    ...otherProps
}) => (
    <Tab {...otherProps}>
        <TabButton icon={icon} text={text} isAcrive={isAcrive}></TabButton>
    </Tab>
);

RibbonTab.tabsRole = 'Tab';
