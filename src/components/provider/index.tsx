import { PenProvider } from './PenProvider';
import { RenderViewListenerProvider } from './RenderViewListenerProvider';
import { RenderViewProvider } from './RenderViewProvider';
import { SpriteTreeProvider } from './SpriteTreeProvider';

const Provider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RenderViewProvider>
            <RenderViewListenerProvider>
                <PenProvider>
                    <SpriteTreeProvider>{children}</SpriteTreeProvider>
                </PenProvider>
            </RenderViewListenerProvider>
        </RenderViewProvider>
    );
};

export { Provider };
