import { FilterButton } from './FilterButton';
import { Illustration } from 'application/filters/Illustration';
import { SobelConfig } from 'application/filters/Sobel';

export const IllustrationButton = ({ children }: { children?: React.ReactNode }) => {
    const getWindowChildren = () => {
        return null;
    };

    return (
        <>
            <FilterButton<SobelConfig>
                filter={new Illustration()}
                config={{}}
                title="イラスト化"
                getWindowChildren={getWindowChildren}
            >
                {children}
            </FilterButton>
        </>
    );
};
