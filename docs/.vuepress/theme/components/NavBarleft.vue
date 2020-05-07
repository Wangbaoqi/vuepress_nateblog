<template>
  <section class="navbar-left">
   
    <!-- 广告位 -->
    <Advisement />

    <!--  -->
    <NavTags />

    <section class="follow">
      <p class="follow-info">if you like these articles, please attention my Wechat public account.</p>
      <div class="follow-pic"></div>
    </section>

    <!-- <router-link
      :to="$localePath"
      class="home-link"
    >
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$site.themeConfig.logo"
        :alt="$siteTitle"
      >
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
      >{{ $siteTitle }}</span>
    </router-link> -->
   




  </section>
</template>

<script>
import NavTags from '@theme/components/NavTags.vue'
import Advisement from '@theme/components/Advertise.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'

export default {
  name: '',

  components: { NavTags, Advisement },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
  
   
  },

  computed: {
   
  }
}

</script>

<style lang="stylus">
  .navbar-left 
    margin-top $navbarHeight + 2rem
    grid-area sidebar
    .follow 
      margin-top $sideLeftMargin
      .follow-pic
        background url('https://cdn.img.wenhairu.com/images/2020/05/05/Ywv6j.jpg') no-repeat
        background-size 100%
        width 129px
        height 129px
      .follow-info 
        font-size 13px
</style>
