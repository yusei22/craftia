import { AppProps } from "next/app";
import PropTypes from "prop-types";
import Head from "next/head";
import { RecoilRoot } from 'recoil';
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import createEmotionCache from "createEmotionCache";
import theme from "theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (<>
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
      <CssVarsProvider theme={theme} >

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>

      </CssVarsProvider>
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