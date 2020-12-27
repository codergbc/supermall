<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .recommend{
    display: flex;
    width: 100%;
    font-size: 14px;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item a{
    text-decoration: none;
    color: brown;
  }
  .recommend-item img{
     width: 65px;
     height: 65px;
     margin-top: 8px;
     margin-bottom: 8px;
  }
</style>