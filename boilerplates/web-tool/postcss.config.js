module.exports = {
  plugins: [
    require('postcss-plugin-pxtorem')({
      rootValue: 200
      // remUnit: 75
      // selectorBlackList: ['.am']
    })
  ]
};
