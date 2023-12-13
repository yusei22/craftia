import { useRecoilValue } from 'recoil';
import Container from 'components/layout/Container';
import { toolMenuAtom } from 'dataflow/toolMenues/toolMenuAtom';

type ToolMenuesProps = {
    className?: string;
};

export const ToolMenues = ({ className }: ToolMenuesProps) => {
    const menuContents = useRecoilValue(toolMenuAtom);
    return (
        <Container className={className}>
            <Container
                css={(theme) => ({
                    justifyContent: 'start',
                    height: '100%',
                    width: '100%',
                    padding: '0px 20px',
                    borderRadius: 5,
                    backgroundColor: theme.colors.neutral200,
                })}
            >
                {menuContents}
            </Container>
        </Container>
    );
};
