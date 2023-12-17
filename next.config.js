/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    disableDevLogs: true,
  })

const nextConfig = withPWA({
  reactStrictMode: true,
  webpack: (config, options) => {

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });

    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      use: [
        options.defaultLoaders.babel,
        { loader: "raw-loader" },
        { loader: "glslify-loader" },
      ],
      exclude: /node_modules/,
    });

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true, // importした画像の型定義設定を無効にする
  }
})

module.exports = nextConfig
