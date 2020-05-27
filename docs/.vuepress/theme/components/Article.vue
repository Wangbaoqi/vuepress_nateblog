<template>
  <div class="abstract" v-if="tag.title" >
    <div class="post-item">

      <router-link :to="tag.path" class="post-stub">
        <h3>{{tag.title}}</h3>
        <p class="post-desc" v-if="tag.frontmatter.excerpt">
          {{tag.frontmatter.excerpt}}
        </p>
      </router-link>

      <div class="post-tag">
        <span class="post-time" v-if="tag.lastUpdated" >{{handleDate(tag, tag.lastUpdated)}}</span>
        <span class="tags" :style="tagStyle(tag)">
          {{tag.frontmatter.tag}}
        </span>
      </div>
      
     
    </div>
  </div>
</template>

<script>
import * as moment from 'moment';
import dayJs from 'dayjs';

export default {
  props: {
    tag: {}, //索引到的数据
    tg: "",
    lang: ""
  },
  computed: {
    
  },
  methods: {
    handleDate(tag, date) {
      return dayJs(date).format('MMM D, YYYY')
    },
    tagStyle(tag) {
      const navList = this.$themeLocaleConfig.nav;
      const curItem = navList.filter(e => e.text.toLowerCase() === tag.frontmatter.tag.toLowerCase())[0];
      return {
        background: curItem.background,
        color: curItem.color
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
$color = $accentColor;

.abstract 
  width 100%

  .post-item 
    display flex
    justify-content space-between
    align-items center
    padding 20px 30px
    border-bottom 1px dotted #303030
    color #ffffff

    &:hover 
      background rgba(64,64,62,.2)
    .post-desc 
      font-size 1.2rem

    .post-tag 
      display flex
      flex-direction column
      align-items flex-end
      min-width 140px
      .post-time 
        font-family 'Inconsolata', monospace
        font-size 18px
      .tags 
        margin-top 15px
        background #5b5ea6
        border-radius 3px
        padding 8px


</style>
