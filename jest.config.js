// 单元测试的脚本
module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'], // 需要测试的文件
  transform: { // 告诉 Jest 用 babel-jest 处理 Java 测试文件
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: { // 处理 webpack 别名  比如把 @ 设置为 /src 的别名
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [ // 用于检测测试文件的全局模式
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: ['src/utils/**/*.{js,vue}', '!src/utils/auth.js', '!src/utils/request.js', 'src/components/**/*.{js,vue}'], // 定义需要收集测试覆盖率信息的文件
  coverageDirectory: '<rootDir>/tests/unit/coverage', // 输出覆盖信息文件的目录
  // 'collectCoverage': true,
  'coverageReporters': [
    'lcov',
    'text-summary'
  ], // 定制测试文件
  testURL: 'http://localhost/'
}
