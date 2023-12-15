import { FilterGLProvider } from './FilterGL';
import { LayerTreeProvider } from './LayerTree/LayerTreeProvider';
import { PenProvider } from './Pen';
import { PortalProvider } from './Portal';
import { RenderViewListenerProvider } from './RenderView/RenderViewListenerProvider';
import { RenderViewSizeProvider } from './RenderView/RenderViewSizeProvider';
import { ThemeProvider } from './Theme';
import { FloatingWindowProvider } from './Window';

const Provider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <ThemeProvider>
            <RenderViewSizeProvider>
                <RenderViewListenerProvider>
                    <FilterGLProvider>
                        <PenProvider>
                            <LayerTreeProvider>
                                <PortalProvider>
                                    <FloatingWindowProvider>{children}</FloatingWindowProvider>
                                </PortalProvider>
                            </LayerTreeProvider>
                        </PenProvider>
                    </FilterGLProvider>
                </RenderViewListenerProvider>
            </RenderViewSizeProvider>
        </ThemeProvider>
    );
};

export { Provider };
