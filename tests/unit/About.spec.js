import About from '@/views/About.vue';

// 加载组件, @vue/test-utils提供了这项功能
//  @vue/test-utils，还提供shallowMount()方法.如果组件有子组件，shallowMount()将返回该组件的本身，而不是完全渲染的详细组件.单元测试的焦点是单一的组件，多数时候我们会忽略其子组件。
import { mount } from '@vue/test-utils';

describe("ComponentsAbout", () => {
  // 组件内需要的才测试   test() === it()，it()是test()的别名。
  test('if user is not logged in, do not show logout button', () => {
    // 安装组件
    const wrapper = mount(About);
    // 默认登录状态时false,则找到组件内的btn,查看其可见性为false
    expect(wrapper.find('button').isVisible()).toBe(false)
  });
  test('if a user is logged in, show logout button', () => {
    const wrapper = mount(About, {
        data() {
          return {
            loginIn: true
          }
        },
      }
    );
    // 要验证登录状态是'已登录',则行先设置其状态值
    expect(wrapper.find('button').isVisible()).toBe(true);
    // expect(wrapper.find('button').isVisible()).toBe(true)
  })
})