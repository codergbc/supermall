<template>
  <div id="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item 
      v-for="(item,index) in cartList" 
      :key="item.iid" 
      :cartItem="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'

export default {
  props:{
    cartList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    CartListItem,
    Scroll
  },
  activated(){
      this.$refs.scroll.refresh()
  }
}
</script>

<style  scoped>
  #cart-list{
    height:100vh
  }
  .content{
    position: relative; 
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 89px;
  }
</style>
