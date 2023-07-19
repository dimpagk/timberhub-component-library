const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  },
  staticDirs: ['../src/assets'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'src': path.resolve(__dirname, '../src/'),
    };
    return config;
  },
};
