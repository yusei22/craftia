import { useRecoilValue } from 'recoil';
import Typography from 'components/atoms/Typography';
import Container from 'components/layout/Container';
import { stageZoomSelector } from 'dataflow';

export type FooterProps = {
    className?: string;
};
export const FooterSection = ({ className }: FooterProps) => {
    const stageZoom = useRecoilValue(stageZoomSelector);

    return (
        <Container
            className={className}
            css={(theme) => ({
                width: '100%',
                backgroundColor: theme.colors.primary600,
                padding: '0px 50px',
                justifyContent: 'space-between',
                overflow: 'hidden',
            })}
        >
            <Typography
                css={{
                    width: 100,
                }}
            />
            <Typography
                css={(theme) => ({
                    color: theme.colors.white,
                    fontSize: theme.fontSize.xs,
                })}
            >
                © 2023 yusei22
            </Typography>
            <Typography
                css={(theme) => ({
                    color: theme.colors.white,
                    fontSize: theme.fontSize.xs,
                    width: 100,
                })}
            >
                Zoom：{Math.round(stageZoom * 100)}%
            </Typography>
        </Container>
    );
};
