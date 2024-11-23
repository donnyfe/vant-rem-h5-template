// 需要导入样式
import 'vant/es/button/style'
import 'vant/es/tabbar/style'
import 'vant/es/tabbar-item/style'
import 'vant/es/sticky/style'
import 'vant/es/nav-bar/style'
import 'vant/es/icon/style'
import 'vant/es/search/style'
import 'vant/es/dropdown-menu/style'
import 'vant/es/dropdown-item/style'
import 'vant/es/image/style'
import 'vant/es/tabs/style'
import 'vant/es/tab/style'
import 'vant/es/toast/style'
import 'vant/es/field/style'
import 'vant/es/cell/style'
import 'vant/es/cell-group/style'
import 'vant/es/form/style'
import 'vant/es/list/style'

import {
  Button,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
  Icon,
  Search,
  DropdownMenu,
  DropdownItem,
  Image,
  Lazyload,
  Tabs,
  Tab,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  List,
} from 'vant'

// 按需引入Vant组件
const pluginsVant = [
  Button,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
  Icon,
  Search,
  DropdownMenu,
  DropdownItem,
  Image,
  Lazyload,
  Tabs,
  Tab,
  Toast,
  Field,
  Cell,
  CellGroup,
  Form,
  List,
]
export const vantPlugins = {
  install: function (vm) {
    pluginsVant.forEach((item: any) => {
      vm.component(item.name, item)
    })
  },
}
