<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>
    <cart-list :cart-list='cartList'/>
    <bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import CartList from './childCpns/CartList'
  import BottomBar from './childCpns/BottomBar'


  export default {
    components:{
      NavBar,
      CartList,
      BottomBar
    },
    computed:{
      cartList() {
		    return this.$store.getters.cartList
      }
    }
  }
</script>

<style scoped>
/* .shop-cart{
  position: relative;
  height: 100vh;
} */
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
}
/* .content{
    overflow: hidden;
    position: absolute;
    height: 100%;
  } */
</style>