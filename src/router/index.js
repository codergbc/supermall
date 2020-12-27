import Vue from 'vue'
import VueRouter from 'vue-router'

//安装路由插件
Vue.use(VueRouter)

//导入组件
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const ShopCart = () => import('views/shopCart/ShopCart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

//创建路由映射
const routes = [
{
  path:'',
  redirect:'/home'
},
{
  path:'/home',
  component:Home
},
{
  path:'/category',
  component:Category
},
{
  path:'/shopCart',
  component:ShopCart
},
{
  path:'/profile',
  component:Profile
},
{
  path:'/detail/:iid',
  component:Detail
}
]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router