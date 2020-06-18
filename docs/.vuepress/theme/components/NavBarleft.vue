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


    <section class="navbar-sidebar">
      <Sidebar :items="sidebarItems"  >
        <slot name="sidebar-top" slot="top"/>
        <slot name="sidebar-bottom" slot="bottom"/>
      </Sidebar>
    </section>
    

  </section>
</template>

<script>
import NavTags from '@theme/components/NavTags.vue'
import Advisement from '@theme/components/Advertise.vue'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'
import Sidebar from "@theme/components/Sidebar.vue";
import { resolveSidebarItems } from "@theme/util";

export default {
  name: '',

  components: { NavTags, Advisement, Sidebar },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    // this.sidebarItems()
   
  },

  computed: {
    sidebarItems() {
      const sidebar = resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
      const newSidebar = this.$site.pages.filter(e => e.regularPath == this.$page.regularPath)
      return newSidebar
    },
  },
  methods: {
    // sidebarItems() {
    //   const sidebar = resolveSidebarItems(
    //     this.$page,
    //     this.$page.regularPath,
    //     this.$site,
    //     this.$localePath
    //   );
    //   console.log(sidebar, 'sidebar');
    //   console.log(this, 'sidebar this');

    //   return 
    // },
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
    .navbar-sidebar
      position sticky
      top 0
</style>
