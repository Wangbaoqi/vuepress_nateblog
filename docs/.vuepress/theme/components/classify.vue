<template>
  <div class="classify">
    <!-- <Tags @changeTag="changeTag" :lang="lang"/> -->    
    <h1 class="post-title">All the {{tag}} Articles ⤵️</h1>

    <section class="main-content">
      <div class="blog-content">
        <template v-for="(tag,index) in blog" v-if="index<infoLength">
          <Article :tag="tag" @turnTo="change" :lang="lang"></Article>
        </template>
        <div class="more" v-if="show" @click="infoLength=blog.length;show=false">
          {{ lang == 'zh' ? '查看全部' : 'show all'}}
          <span class="reform-xiala"></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Article from "@theme/components/Article.vue";
import Tags from "@theme/components/Tags.vue";
let defaultLength = 10; //默认显示条数
let copyBlogs = []; //缓存所有博客

export default {
  components: {
    Article,
    Tags
  },
  computed: {
   
  },
  data() {
    return {
      blog: [], //博客
      infoLength: defaultLength, //默认显示条数
      show: false,
      lang: 'es',
      tag: ''
    };
  },
  mounted() {
    
    this.handleLang()
    this.filerArticle();

  },
  methods: {
    handleLang() {
      this.lang = this.$page.frontmatter.lang
    },
    filerArticle() {
      const { lang = '', tag = '' } = this.$page.frontmatter
      console.log(this.$page, 'page');
      
      let go = this.$site.pages.sort((pre, next) => {
        if (pre.lastUpdated === undefined) return 1;
        if (next.lastUpdated === undefined) return -1;
        return (
          new Date(next.lastUpdated).getTime() -
          new Date(pre.lastUpdated).getTime()
        );
      });
      // 每一壹题
      if(this.$page.frontmatter.type && this.$page.frontmatter.type === 'typeTopic') {
        go = go.filter(e => e.frontmatter.type === 'web-topic' )
      }

      go = go.filter(e => e.frontmatter.lang && e.frontmatter.lang === lang)
      
      this.blog = go.filter(v => v.frontmatter.tag == tag);
      this.tag = tag
      copyBlogs = go;

      if (this.blog.length > defaultLength) {
        this.show = true;
      }
    },
    changeTag(tag) {
      const { type = ''} = this.$page.frontmatter
      if(tag == '全部') {
        this.blog = copyBlogs;
        return
      }
      this.blog = copyBlogs.filter(e => {
        if(type == 'typeTopic') {
          return e.frontmatter.subTag === tag
        }else {
          return e.frontmatter.tag === tag
        }
      })
      console.log(this.blog, 'filter blog');


    },
    format(timer) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(timer);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    change(tag) {
      if (this.$site.themeConfig.tags) {
        this.$router.push("/" + this.$site.themeConfig.tags + "/?tag=" + tag);
      }
    }
  },
  watch: {
    $route() {
      this.filerArticle();
      this.handleLang();
    }
  }
};
</script>

<style lang="stylus" scoped>
$color = #339ef4;

.classify 
  padding-top 2rem
  .post-title 
    padding 0 40px
  .main-content 
    width 100%
    display flex
    flex-direction column
    justify-content center
    align-items center

    // background-color max-width50rem
    .blog-content 
      width 100%

      .more 
        color $color
        text-align center
        padding 1rem 0
        cursor pointer
        text-decoration underline
      


@media (max-width: 719px) {
  .home .main-content .blog-content {
    width: 100%;
  }

  .home {
    width: 90%;
  }

  
}
</style>