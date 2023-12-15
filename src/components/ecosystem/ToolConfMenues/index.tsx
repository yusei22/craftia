import { useRecoilValue } from 'recoil';
import Container from 'components/layout/Container';
import { toolMenuAtom } from 'dataflow/toolMenues/toolMenuAtom';

type ToolMenuesProps = {
    className?: string;
};

export const ToolMenues = ({ className }: ToolMenuesProps) => {
    const menuContents = useRecoilValue(toolMenuAtom);
    return (
        <Container
            css={{
                justifyContent: 'start',
                height: '100%',
                width: '100%',
                overflowY: 'auto',
                '::-webkit-scrollbar': {
                    display: 'none',
                },
                '-ms-overflow-style': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
            }}
            className={className}
        >
            {menuContents}
        </Container>
    );
};
