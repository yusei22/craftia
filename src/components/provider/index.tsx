import { FilterGLProvider } from './FilterGLProvider';
import { PenProvider } from './PenProvider';
import { RenderViewListenerProvider } from './RenderViewListenerProvider';
import { RenderViewProvider } from './RenderViewProvider';
import { SpriteTreeProvider } from './SpriteTreeProvider';

const Provider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RenderViewProvider>
            <RenderViewListenerProvider>
                <FilterGLProvider>
                    <PenProvider>
                        <SpriteTreeProvider>{children}</SpriteTreeProvider>
                    </PenProvider>
                </FilterGLProvider>
            </RenderViewListenerProvider>
        </RenderViewProvider>
    );
};

export { Provider };
