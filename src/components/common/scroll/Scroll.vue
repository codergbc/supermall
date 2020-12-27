<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:1
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      scroll:null
     
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      click:true
    })
    
    this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scrolla', position)
    })

    if(this.pullUpLoad){
       this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    },
    refresh(){
      console.log('-----')
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    }
  }
}
</script>
 
<style>

</style>