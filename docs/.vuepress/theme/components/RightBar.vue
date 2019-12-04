<template>
  <div class="right-bar">
    <section>
      <p class="title">关注Nate技术小程序</p>
      <p class="title">大前端技术攻克</p>
      <img src="../../public/mini.png" alt="">
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgList: [
        ''
      ]
    }
  }
}
</script>

<style lang="stylus">
  .right-bar {
    position fixed
    top 10rem
    right 9rem
    text-align center
    color #3eaf7c
    p {
      margin 0
    }
    img {
      width 25rem
      height 9rem
    }
    .title {
      margin-bottom .3rem
    }
  }

  @media (max-width: 1680px)
    .right-bar {
      display none
    }
  @media (min-width: 1680px)
    .right-bar {
      right 3rem
    }
  

</style>