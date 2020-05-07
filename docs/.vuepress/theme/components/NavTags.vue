<template>
  <section class="navbar-tags">
		<span v-for="item in filterNavTags" class="tag-item">
			 	<router-link :to="item.link" class="tag" :style="{color: item.color, background: item.background}">
					{{item.text}}
				</router-link>
		</span>
  </section>
</template>

<script>
export default {
  
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
		.tag 
			display inline-block
			padding 6px 8px
			margin 9px 14px 9px 0px
			font-size 14px
			border-radius 3px
</style>
