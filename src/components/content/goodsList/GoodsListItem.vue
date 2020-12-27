<template>
  <div class="goods-item" @click="detailClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsitem:{
      type:Object,
        default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsitem.image || this.goodsitem.show.img
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    detailClick(){
      this.$router.push('/detail/'+this.goodsitem.iid)
    }
  }
}

</script>

<style>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom:5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    /*溢出隐藏，清除浮动，解决外边距塌陷等等 */
    
    text-overflow: ellipsis;/*当对象内文本溢出时显示省略标记(...)*/
    white-space: nowrap;
    /*规定段落中的文本不换行*/
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 30px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/home/collect.jpg") 0 0/14px 14px;
  }

</style>