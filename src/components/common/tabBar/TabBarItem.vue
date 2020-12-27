<template>
  <div class="tabbarItem" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
    <div :style='styleActive'><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
        type:String,
        default: 'red'
      }
  },
  data(){
    return{
     
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    styleActive(){
      return this.isActive ? {color: this.activeColor}:{}
    }
  },
  
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
    .tabbarItem{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }
  .tabbarItem img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  
</style>