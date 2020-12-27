<template>
   <div id="detail">
    <detail-bar @titleClick="titleClickTo" ref="nav"/>
    
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scrolla="scrollPosition">
      <detail-swiper :image-top="imageTop" />
      <item-base-info :goods="goodsInfo" />
      <item-shop-info :shop="shopInfo"/>
      <!-- <detail-goods-info :detailInfo="detailImages" @detailImageLoad="getImageLoad"/> -->
      <item-params :paramInfo="paramsInfo" ref="params"/>
      <item-comment-info :commentInfo="commentInfo" ref="comment"/>
      <h1 class="recommendsText">--------潮品推荐--------</h1>
      <goods-list :goods = recommends ref="recommends"/>
    </scroll>
    <back-top @click.native = "backTopClick" 
    v-show = "isBackTop" ref="back-top"/>
    <bottom-bar @addToCart="addToCart"/>
   </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import DetailBar from './childCpns/DetailBar'
import DetailSwiper from './childCpns/DetailSwiper'
import ItemBaseInfo from './childCpns/ItemBaseInfo'
import ItemShopInfo from './childCpns/ItemShopInfo'
// import DetailGoodsInfo from './childCpns/DetailGoodsInfo'
import ItemParams from './childCpns/ItemParams'
import ItemCommentInfo from './childCpns/ItemCommentInfo'
import GoodsList from 'components/content/goodsList/GoodsList'
import BottomBar from './childCpns/BottomBar'

import {getDetailData,Goods,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
export default {
  name:'Detail',
  components:{
    Scroll,
    DetailBar,
    DetailSwiper,
    ItemBaseInfo,
    ItemShopInfo,
    // DetailGoodsInfo,
    ItemParams,
    ItemCommentInfo,
    GoodsList,
    BottomBar,
    BackTop
  },
  data(){
    return{
      newRefresh:null,
      iid:null,
      imageTop: [],
      goodsInfo: {},
      shopInfo: {},
      // detailImages: {},
      paramsInfo: {},
      commentInfo: {},
      recommends:[],
      themeSaveY:[],
      currentIndex:0,
      isBackTop: false
    }
  },
  created(){
    this.iid = this.$route.params.iid

    getDetailData(this.iid).then(res =>{
      console.log(res)
      const data = res.result
      this.imageTop = data.itemInfo.topImages
      this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      this.shopInfo = data.shopInfo
      // this.detailImages = data.detailInfo
      this.paramsInfo = data.itemParams

      if(data.rate.cRate !== 0)
      this.commentInfo = data.rate.list[0]

      this.$nextTick(() =>{
        // this.themeSaveY = []
        this.themeSaveY.push(0)
        this.themeSaveY.push(this.$refs.params.$el.offsetTop)
        this.themeSaveY.push(this.$refs.comment.$el.offsetTop)
        this.themeSaveY.push(this.$refs.recommends.$el.offsetTop)
        this.themeSaveY.push(Number.MAX_VALUE)
      })

    })

    getRecommend().then(res =>{
      this.recommends = res.data.list
    })
  },
  mounted(){
    const newRefresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad',() =>{
      newRefresh()
    })
  },
  methods:{
    titleClickTo(index){
      this.$refs.scroll.scrollTo(0,-this.themeSaveY[index],200)
    },

    scrollPosition(position){
      const positionY = -position.y
      for(let i=0;i < this.themeSaveY.length-1 ;i++){
        if(this.currentIndex !== i && this.themeSaveY[i] <= positionY 
        && positionY <= this.themeSaveY[i+1]){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.isBackTop = positionY > 1000
    },
    // getImageLoad(){
    //   console.log('------')
    //   this.$refs.scroll.refresh()
    // },
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,200) 
    },

    addToCart(){
      const product = {}
      product.image = this.imageTop[0]
      product.desc  = this.goodsInfo.desc
      product.title = this.goodsInfo.title
      product.price = this.goodsInfo.nowPrice
      product.iid   = this.iid
      product.count = 1

      this.$store.dispatch('cAddToCart', product)
      console.log('dsadsa')
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    height: 100vh;
    z-index: 1;
    background-color: #fff;
  }
  .content{
    position:absolute;
    right: 0;
    left: 0;
    top: 44px; 
    bottom: 58px;
    overflow: hidden;
    /* height: calc(100%-44px); 
    background-color: #fff; */
  }
  .recommendsText{
    /* margin-left: 4px; */
    text-align: center;
    color: var(--color-high-text);
  }
</style>