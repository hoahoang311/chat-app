module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@/app': './src/app',
          '@/common': './src/common',
          '@/components': './src/components',
          '@/containers': './src/containers',
          '@/globals': './src/globals',
          '@/redux': './src/redux',
          '@/services': './src/services',
        },
      },
    ],
  ],
}
