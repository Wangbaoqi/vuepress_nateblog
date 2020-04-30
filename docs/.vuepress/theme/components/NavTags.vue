<template>
  <section class="navbar-tags">
   
		<span v-for="item in filterNavTags" class="tag-item">
			 	<router-link :to="item.link" class="tag">
					{{item.text}}
				</router-link>
		</span>
   

  </section>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@parent-theme/components/SidebarButton.vue'
import NavLinks from '@parent-theme/components/NavLinks.vue'

export default {
  name: '',

  components: {  },

  data () {
    return {
      tagList: []
    }
  },

  mounted () {
   	console.log(this.$site, 'site');
   	console.log(this.$page, 'page');

  },

  computed: {
    filterNavTags() {
			const curLanguage = /\/zh/.test(this.$page.path);
			const curTagLists = this.$site.themeConfig.locales[curLanguage ? '/zh/' : '/'].nav;
			return curTagLists
    }
  }
}

</script>

<style lang="stylus">
.navbar-tags
	.tag-item 
		display inline-block
		background #95dee3
		padding 8px
		margin 9px 
	.tag 
		color #000000
	
</style>
