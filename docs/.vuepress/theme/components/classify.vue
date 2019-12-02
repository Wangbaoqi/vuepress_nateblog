<template>
  <div class="classify">
    <Tags @changeTag="changeTag"/>
    <section class="main-content">
      <div class="blog-content">
        <template v-for="(tag,index) in blog" v-if="index<infoLength">
          <Article :tag="tag" @turnTo="change"></Article>
        </template>
        <div class="more" v-if="show" @click="infoLength=blog.length;show=false">
          查看全部
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
      show: false
    };
  },
  mounted() {
    this.filerArticle();

  },
  methods: {
    filerArticle() {
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
        go = go.filter(e => e.frontmatter.type === 'web-topic')
      }
      this.blog = go.filter(v => v.frontmatter.tag);
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
    }
  }
};
</script>

<style lang="stylus" scoped>
$color = #339ef4;

.classify {
  padding-top: 5rem;
  max-width: 60rem;
  margin:0 auto;
  .main-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // background-color max-width:50rem;
    .blog-content {
      width: 100%;

      .more {
        color: $color;
        text-align: center;
        padding: 1rem 0;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}




@media (max-width: 719px) {
  .home .main-content .blog-content {
    width: 100%;
  }

  .home {
    width: 90%;
  }

  
}
</style>