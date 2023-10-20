import { FilterButton } from './FilterButton';
import { Sobel, SobelConfig } from 'application/filters/Sobel';

export const SobelButton = ({ children }: { children?: React.ReactNode }) => {
    const getWindowChildren = () => {
        return null;
    };

    return (
        <>
            <FilterButton<SobelConfig>
                filter={new Sobel()}
                config={{}}
                title="バイラテラルフィルタ(ノイズ除去)"
                getWindowChildren={getWindowChildren}
            >
                {children}
            </FilterButton>
        </>
    );
};
