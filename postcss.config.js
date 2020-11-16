/* eslint-disable global-require, import/no-extraneous-dependencies */
const postcssConfig = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('postcss-nested'),
        require('autoprefixer'),
    ]
}

// If we are in production mode, then add cssnano
if (process.env.NODE_ENV === 'production') {
    postcssConfig.plugins.push(
        require('cssnano'),
        // require('cssnano')({
        //     // use the safe preset so that it doesn't
        //     // mutate or remove code from our css
        //     preset: 'default',
        // })
    );
}

module.exports = postcssConfig;