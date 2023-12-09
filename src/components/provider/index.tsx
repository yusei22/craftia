import { FilterGLProvider } from './FilterGLProvider';
import { PenProvider } from './PenProvider';
import { RenderViewListenerProvider } from './RenderViewListenerProvider';
import { RenderViewProvider } from './RenderViewProvider';
import { SpriteTreeProvider } from './SpriteTreeProvider';
import { ThemeProvider } from './ThemeProvider';
import { FloatingWindowProvider } from './WindowProvider';

const Provider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <RenderViewProvider>
                <RenderViewListenerProvider>
                    <FilterGLProvider>
                        <PenProvider>
                            <SpriteTreeProvider>
                                <FloatingWindowProvider>{children}</FloatingWindowProvider>
                            </SpriteTreeProvider>
                        </PenProvider>
                    </FilterGLProvider>
                </RenderViewListenerProvider>
            </RenderViewProvider>
        </ThemeProvider>
    );
};

export { Provider };
