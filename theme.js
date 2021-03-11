const path = require("path");
const { generateTheme, getLessVars } = require("antd-theme-generator");
// ant-design-vue/dist/antd.less
// https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src/styles/theme"),
  varFile: path.join(__dirname, "./src/styles/theme/variable.less"),
  mainLessFile: path.join(__dirname, "./src/styles/theme/index.less"),
  themeVariables: [
    "@primary-color",
    "@secondary-color",
    "@text-color",
    "@text-color-secondary",
    "@heading-color",
    "@layout-body-background",
    "@btn-primary-bg",
    "@layout-header-background",
    "@body-background",
  ],
  indexFileName: "index.html",
  outputFilePath: path.join(__dirname, "./public/color.less"),
};
generateTheme(options)
  .then((less) => {
    console.log("Theme generated successfully");
  })
  .catch((error) => {
    console.log("Error", error);
  });
