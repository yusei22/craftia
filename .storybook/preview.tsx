import type { Preview } from "@storybook/react";
import React from 'react';
import defaultTheme from '../src/theme'
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Global, ThemeProvider, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      body {
        font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
    `}
  />
);

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
};

export const decorators = [
  
  withThemeFromJSXProvider({
  themes: {
    light: defaultTheme,
  },
  defaultTheme: 'light',
  Provider: ThemeProvider,
  GlobalStyles,

})];