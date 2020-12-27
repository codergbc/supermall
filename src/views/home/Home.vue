<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control 
    class="tab-control"
    ref="tabControl1"
    :titles="['流行','新款','精选']"
    @tabClick="tabClick" 
    v-show="isShowTab"/>
    <scroll class="content"
      ref="scroll"
      :probe-type= '3'
      :pull-up-load= 'true'
      @pullingUp= "loadMore"
      @scrolla= "scroll_mounted">
      <home-swiper :banners="banners" @isImageLoad= "getOffsetTop" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control 
      ref="tabControl2"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
     <back-top @click.native = "backTopClick" 
     v-show = "isBackTop" ref="back-top"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childCpns/HomeSwiper'
import RecommendView from './childCpns/RecommendView'
import FeatureView from './childCpns/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goodsList/GoodsList'

import {getHomeMultidata, getHomeData} from "network/home";
import {getDetailData} from 'network/detail'
import {debounce} from 'common/utils'
export default {
  name:'Home',
  components:{
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop
  }, 
  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop' :{page: 1, list:[]},
        'new' :{page: 1, list:[]},
        'sell':{page: 1, list:[]}
      },
      currentType:'pop',
      isShowTab: false,
      isBackTop: false,
      tabOffsetTop: 0,
      saveY: 0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },

  created() {
    this.getHomeMultidata()

    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('itemImageLoad',() =>{
      refresh()
    })
    
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods:{
    scroll_mounted(position) {
      // console.log(position);
      //如果，大于等于TabControl的offsetTop，则显示
      this.isShowTab = (-position.y) >= this.tabOffsetTop

      this.isBackTop = (-position.y) > 1000
    },
    //返回顶部函数
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0,200) 
    },

    getOffsetTop(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

     loadMore(){
      this.getHomeData(this.currentType)
    },
    /**
     * 获取数据请求方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(this.banners);
        // console.log(this.recommends);
      })
    },
    getHomeData(type){
        getHomeData(type,this.goods[type].page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
        })
      }
    // getMultiData() {
    //     getHomeMultidata().then(res => {
    //       this.banners = res.data[BANNER].list
    //       this.recommends = res.data[RECOMMEND].list
          // 下次更新DOM时,获取新的tabOffsetTop值(不保险,可以在updated钩子中获取)
          // this.$nextTick(() => {
          //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
          // })
        // })
      // },
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
  .home-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control{
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
  }
</style>

