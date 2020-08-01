const path = require('path');
const webpack = require('webpack');

const environment = 'production';

process.env.BABEL_ENV = environment;
process.env.NODE_ENV = environment;

const promises = [];
["apps/tembin", "apps/hato", "apps/nangka"].forEach(item => {
    promises.push(new Promise(((resolve, reject) => {
        const webpackConfig = require(path.join(process.cwd(), item, 'webpack.config.js'));
        const compiler = webpack(webpackConfig);
        compiler.run((err, stats) => {
            if (err) {
                console.log('ERROR:', err);
                reject(err);
            } else {
                let statsDetail = stats.toJson({all: false, warnings: true, errors: true});
                if (statsDetail.errors.length) {
                    console.log('ERROR:', statsDetail.errors.map(error => {
                        return error.message;
                    }).join('\n\n'));
                    reject(statsDetail.errors);
                } else {
                    console.log(`${item.toUpperCase()} BUILD SUCCESS.`);
                    reject(statsDetail);
                }
            }
        });
    })));
})

Promise.all(promises);



