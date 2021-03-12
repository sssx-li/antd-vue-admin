const path = require("path");
const { generateTheme, getLessVars } = require("antd-theme-generator");
// ant-design-vue/dist/antd.less
// https://github.com/vueComponent/ant-design-vue/blob/master/components/style/themes/default.less
const options = {
  antDir: path.join(__dirname, "../../node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "../styles/theme"),
  varFile: path.join(__dirname, "../styles/theme/variable.less"),
  mainLessFile: path.join(__dirname, "../styles/theme/index.less"),
  themeVariables: [
    "@primary-color",
    "@btn-primary-bg",
    "@layout-body-background",
    "@layout-header-background",
    "@breadcrumb-link-color",
    "@menu-dark-item-active-bg"
  ],
  indexFileName: "index.html",
  outputFilePath: path.join(__dirname, "../../public/color.less"),
};
generateTheme(options)
  .then((less) => {
    // console.log("success");
  })
  .catch((error) => {
    console.log("Error", error);
  });
