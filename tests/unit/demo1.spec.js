import  { sum } from '../demo1'

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

// expect()方法中描述的是测试的结果
// toBe()是测试预期的值