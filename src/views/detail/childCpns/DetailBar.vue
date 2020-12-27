<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back-icon" @click="backRouter">
        <img src="~assets/img/detail/back.svg" alt="">
      </div>
      <div slot="center"  class="title">
        <div v-for="(item,index) in titles" 
        class="item-title"
        :class="{active: currentIndex === index}"
        @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
export default {
  components:{
    NavBar
  },
  data () {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backRouter(){
      this.$router.back()
    }
  }
}
</script>

<style  scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.back-icon{
    margin-top: 7px;
    margin-left: 14px;
  }
  .back-icon img{
    width: 22px;
    height: 20px;
  }
  .title{
    display: flex;
    margin-left: 45px;
    width: 60%;
  }
  .item-title{
    flex: 1;
  }
  .active{
    color: black;
  }
</style>
