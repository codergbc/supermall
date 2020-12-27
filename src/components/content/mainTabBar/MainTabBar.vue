<template>
    <tab-bar>
      <tab-bar-item path='/home'>
          <img slot='item-icon' src="~assets/img/tabbar/home_active.jpg" alt="">
          <img slot='item-active-icon' src="~assets/img/tabbar/home_active.jpg" alt="">
          <div slot='item-text'>首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
          <img slot='item-icon' src="~assets/img/tabbar/category.svg" alt="">
          <img slot='item-active-icon' src="~assets/img/tabbar/category.svg" alt="">
          <div slot='item-text'>分类</div>
      </tab-bar-item>
        <tab-bar-item path='/shopCart'>
            <img slot='item-icon' src="~assets/img/tabbar/cart.jpg" alt="">
            <img slot='item-active-icon' src="~assets/img/tabbar/cart.jpg" alt="">
            <div slot='item-text'>购物车</div>
        </tab-bar-item>
        <tab-bar-item path='/profile'>
            <img slot='item-icon' src="~assets/img/tabbar/profile.jpg" alt="">
            <img slot='item-active-icon' src="~assets/img/tabbar/profile.jpg" alt="">
            <div slot='item-text'>我的</div>
        </tab-bar-item>   
    </tab-bar>
</template>

<script>
import TabBar from '../../common/tabBar/TabBar'
import TabBarItem from '../../common/tabBar/TabBarItem'
export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>