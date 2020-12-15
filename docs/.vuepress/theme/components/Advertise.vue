<template>
   <section class="advisement">
      <a class="adver-item" href="https://tc39.es/ecma262" target="_blank" rel="noopener noreferrer">
        <span class="item-pic" ></span>
        <span class="item-link">ECMAScript Latest specifications</span>
      </a>
    </section>
</template>

<script>

export default {
  name: '',

  components: {  },

  data () {
    return {
    }
  },

  mounted () {
  
   
  },

  computed: {
   
  }
}

</script>

<style lang="stylus">
  .advisement
    margin-bottom $sideLeftMargin
    .adver-item 
      cursor pointer
      .item-pic
        display block
        background url('https://raw.githubusercontent.com/Wangbaoqi/blogImgs/master/nateImgs/index/ecma.png') no-repeat
        background-size 100%
        width 100%
        height 53px
      .item-link 
        font-size 13px
</style>
