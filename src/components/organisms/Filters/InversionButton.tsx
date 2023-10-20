import { FilterButton } from './FilterButton';
import { Inversion } from 'application/filters/Inversion';
import { SobelConfig } from 'application/filters/Sobel';

export const InversionButton = ({ children }: { children?: React.ReactNode }) => {
    const getWindowChildren = () => {
        return null;
    };

    return (
        <>
            <FilterButton<SobelConfig>
                filter={new Inversion()}
                config={{}}
                title="ネガポジ反転"
                getWindowChildren={getWindowChildren}
            >
                {children}
            </FilterButton>
        </>
    );
};
