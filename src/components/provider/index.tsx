import { RenderViewProvider } from './RenderViewProvider';
import { SpriteTreeProvider } from './SpriteTreeProvider';

const Provider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RenderViewProvider>
            <SpriteTreeProvider>{children}</SpriteTreeProvider>
        </RenderViewProvider>
    );
};

export { Provider };
