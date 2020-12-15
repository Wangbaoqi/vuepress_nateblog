<template>
  <section class="navbar-tags">
		<span v-for="item in filterNavTags" class="tag-item">
			 	<router-link :to="item.link" v-if="!item.outLink" class="tag" :style="{color: item.color, background: item.background}">
					{{item.text}}
				</router-link>
				<a
					v-else
					:href="item.link"
					:style="{color: item.color, background: item.background}"
					class="tag"
					:target="'_blank'"
				>
					{{ item.text }}
				</a>
		</span>
  </section>
</template>

<script>
import { isExternal, isMailto, isTel, ensureExt } from '../util'

export default {
  
  computed: {
    filterNavTags() {
			const curTagLists = this.$site.themeConfig.nav;

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
