<template>
  <div class="bottom-bar">
    <check-button class="check-button" :is-checked="allChecked"
    @click.native="allCheckedClick"/>
    <span class="all-check">全选</span>
    <span class="price">共计:￥{{totalPrice}}</span>
    <div class="calculate">去计算({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  components:{
    CheckButton
  },
  computed:{
    checkedLength(){
      return this.$store.state.cartList.filter(item => {return item.checked}).length
    },
    totalPrice() {
      return this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue+item.price*item.count
      }, 0).toFixed(2)
    },
    allChecked(){
      if(this.$store.state.cartList.length == 0) 
      return false
      else
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods:{
    allCheckedClick(){
      if(this.allChecked){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }
      else{
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style  scoped>
  .bottom-bar{
    font-size: 14px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #eee;
    display: flex;
    height: 34px;
  }
  .check-button{
    margin: 8px 0 0 10px;
  }
  .all-check{ 
    margin: 10px 0 0 8px;
    width: 40px;
  }
  .price{
    margin: 10px 0 0 80px;
    width: 110px;
    /* background-color: red; */
  }
  .calculate{
    position: relative;
    float: right;
    background-color: red;
    color: #fff;
    line-height: 40px;
    text-align: center;
    /* margin: 10px 0 0 8px; */
    width: 80px;
  }
</style>
