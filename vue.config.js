module.exports = {
    configureWebpack: {
        devServer: {
            disableHostCheck: true,
            watchOptions: {
                poll: true
            }
        }
    }
  }
