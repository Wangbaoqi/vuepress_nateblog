<template>
  <div class="abstract" v-if="tag.title">
    <div class="abstract-item">
      <div class="text-hover">
        <router-link :to="tag.path">{{tag.title}}</router-link>
        <span class="icon">{{tag.frontmatter.tag}}</span>
      </div>
      <div class="abstract" v-if="tag.frontmatter.excerpt">
        <div v-html="tag.frontmatter.excerpt"></div>
      </div>
      <div class="details-btn" v-if="tag.frontmatter.excerpt">
        <router-link :to="tag.path">
          <div data-v-e422eb16 class="v-btn">
            <i data-v-e422eb16 class="what"></i>
            {{ lang === 'zh' ? '阅读全文' : 'read the full acticle'}}
          </div>
        </router-link>
      </div>
      <div class="v-divider" v-if="tag.frontmatter.excerpt"></div>
      <div class="article-info article-info-item">
        <i class="what">
          <em v-if="tag.lastUpdated">{{tag.lastUpdated}}</em>
        </i>
        <i class="what" v-for="t in tag.frontmatter.tags">
          <em class="text-item active" v-if="t==tg">{{t}}</em>
          <em class="text-item" v-else @click="$emit('turnTo',t)">{{t}}</em>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: {}, //索引到的数据
    tg: "",
    lang: ""
  }
};
</script>

<style lang="stylus" scoped>
$color = $accentColor;

.abstract {
  width: 100%;
  color #666666;
  font-size 1rem;
  .abstract-item {
    margin: 0 auto 1.2rem;
    padding: 1rem 1.2rem;
    width: 100%;
    overflow: hidden;
    border-radius: 0.3rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-box-shadow: 0 0.25rem 1.2rem 0 hsla(0, 0%, 57%, 0.21);
    box-shadow: 0 0.25rem 1.2rem 0 hsla(0, 0%, 57%, 0.21);
    background-color: #fff;
    position: relative;

    .text-hover {
      font-size: 1.2rem;
      display: inline-flex;
      align-items center
      margin-bottom: 1rem;

      a {
        position: relative;
        &:after {
          content: '';
          position: absolute;
          width: 101%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: $color;
          visibility: hidden;
          -webkit-transform: scaleX(0);
          transform: scaleX(0);
          -webkit-transition: 0.3s ease-in-out;
          transition: 0.3s ease-in-out;
        }

        &:hover:after {
          visibility: visible;
          -webkit-transform: scaleX(1);
          transform: scaleX(1);
        }
      }
      .icon {
        font-size 0.8rem
        color rgba(62,175,124,1)
        background rgba(62,175,124,0.2)
        padding .2rem .3rem
        border-radius 0.2rem
        margin-left 0.4rem
      }
    }

    .details-btn {
      text-align: right;
      margin: 0.3rem 0;

      .v-btn {
        display: inline-block;
        font-size: 0.8rem;
        padding: 0.4rem 0.7rem;
        cursor: pointer;
        letter-spacing: 0.1em;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        background-color: #efefef;
        color: #2c3e50;
        border-radius: 0.1rem;
        line-height: 1.2;

        &:hover {
          background-color: $color;
          color: #fff;
        }
      }
    }

    .article-info {
      margin-right: 1rem;
      line-height: 1.6rem;
      margin-right: 1rem;
      line-height: 1.6rem;
      font-style: normal;

      .text-item {
        font-weight: 700;
        border: 1px $color;
        font-style: normal;
        margin-left: 0.4rem;
        cursor: pointer;
        background-color: #f6f6f6;
        padding: 0.2rem 0.4rem;

        &.active {
          color: $color;
        }

        &:hover {
          color: $color;
        }
      }
    }

    .v-divider {
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1 1 0px;
      flex: 1 1 0px;
      max-width: 100%;
      height: 0;
      max-height: 0;
      border: solid;
      border-width: thin 0 0 0;
      -webkit-transition: inherit;
      transition: inherit;
      border-color: rgb(234, 236, 239);
      margin-top: 0.7rem;
      margin-bottom: 0.7rem;
    }
  }
}

.what {
  font-size: 0.8rem;
  color: rgb(153, 153, 153);
}


</style>
