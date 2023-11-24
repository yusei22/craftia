import Head from 'next/head';
import { ColorSection } from 'components/ecosystem/ColorSection';
import { FooterSection } from 'components/ecosystem/FooterSection';
import { LayerSection } from 'components/ecosystem/LayerSection';
import { MenuSection } from 'components/ecosystem/MenuSection';
import { PenSection } from 'components/ecosystem/PenSection';
import { RenderingSection } from 'components/ecosystem/RenderingSection';
import { ToolSection } from 'components/ecosystem/ToolSection';
import Box from 'components/layout/Box';
import Container from 'components/layout/Container';
import Wrapper from 'components/layout/Wrapper';
import { Provider } from 'components/provider';
import { MQ } from 'mediaQuery';

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <>
                <Provider>
                    <Wrapper
                        css={{
                            position: 'absolute',
                            zIndex: 1000,
                            bottom: '0',
                            [MQ.md]: {
                                top: '0',
                                left: '0',
                            },
                        }}
                    >
                        <MenuSection width={'100vw'} height={30} />
                    </Wrapper>
                    <Container
                        css={(theme) => ({
                            position: 'absolute',
                            zIndex: 500,
                            top: 30,
                            height: 'calc(100% - 45px)',
                            padding: '10px 5px',
                            paddingTop: '0px',
                            backgroundColor: theme.colors.neutral100,
                        })}
                    >
                        <ToolSection
                            css={(theme) => ({
                                marginLeft: '5px',
                                height: '100%',
                                width: '50px',
                                borderRadius: '5px',
                                backgroundColor: theme.colors.neutral200,
                            })}
                        />
                        <Box
                            css={{
                                marginLeft: '5px',
                                height: '100%',
                            }}
                        >
                            <ColorSection
                                wheelRadius={150}
                                css={(theme) => ({
                                    padding: '10px',
                                    height: '55%',
                                    borderRadius: '5px',
                                    width: '200px',
                                    backgroundColor: theme.colors.neutral200,
                                })}
                            />
                            <PenSection
                                css={(theme) => ({
                                    justifyContent: 'start',
                                    marginTop: 10,
                                    padding: '10px',
                                    height: '45%',
                                    width: '200px',
                                    borderRadius: '5px',
                                    backgroundColor: theme.colors.neutral200,
                                })}
                            />
                        </Box>
                    </Container>

                    <RenderingSection />
                    <LayerSection
                        panelWidth={280}
                        css={{
                            position: 'absolute',
                            zIndex: 500,
                            top: 30,
                            right: 0,
                            height: 'calc(100% - 45px)',
                        }}
                    />

                    <FooterSection
                        css={{
                            width: '100vw',
                            height: '15px',
                            position: 'absolute',
                            bottom: 0,
                            zIndex: 1000,
                        }}
                    />
                </Provider>
            </>
        </>
    );
}
