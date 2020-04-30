<template>
  <section class="navbar-left">
   
    <!-- 广告位 -->

    <!--  -->


    <NavTags />



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
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'

export default {
  name: '',

  components: { NavTags },

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
    margin-top $navbarHeight
</style>
