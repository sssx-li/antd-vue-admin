import { generateTitle } from './breadcrumb/index.js'
import { Menu } from 'ant-design-vue'
import path from 'path'
// 函数式组件
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title" class="menu-title">
          <a-icon :type="menuInfo.meta && menuInfo.meta.icon" />
          <span v-if="menuInfo.meta">{{ generateTitle(menuInfo.meta.title) }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="resovePath(item.path)">
            <router-link style="display: inline-block;" :to="resovePath(item.path)">
              {{ generateTitle(item.meta.title) }}
            </router-link>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item"  :base-route="resovePath(item.path)" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => {}
    },
    baseRoute: {
      type: String,
      default: ''
    }
  },
  methods: {
    generateTitle,
    resovePath(item) {
      return path.resolve(this.baseRoute, item)
    }
  }
}

export default SubMenu
