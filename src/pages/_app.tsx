import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import createEmotionCache from 'createEmotionCache';
import defaultTheme from 'theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <>
            <Head>
                <meta key="charset" name="charset" content="utf-8" />
                <meta
                    key="viewport"
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
                />
                <meta property="og:locale" content="ja_JP" />
                <meta property="og:type" content="website" />
            </Head>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={defaultTheme}>
                    <RecoilRoot>
                        <Component {...pageProps} />
                    </RecoilRoot>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};

export default MyApp;
