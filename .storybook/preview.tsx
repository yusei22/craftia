import type { Preview } from "@storybook/react";
import { CssVarsProvider } from "@mui/joy";
import { CssBaseline } from "@mui/joy"
import theme from '../src/theme'
import React from 'react';

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Story />
        </CssVarsProvider>
      )
    }
  ]
};