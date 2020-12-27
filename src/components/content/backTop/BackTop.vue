<template>
  <div class="back-top">
    <img src="~assets/img/home/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:'BackTop'
}
</script>

<style>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 55px;
    z-index: 100;
  }
  .back-top img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
</style>