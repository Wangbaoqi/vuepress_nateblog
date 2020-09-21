<template>
  <div class="timeline-app">
    <h1>All the Update About Archive ⤵️</h1>
    <div class="timeline-active">
     
      <section class="timeline-content" v-for="(item, index) in activeGroup" :key="index">
        <a class="timeline-slowUp" @click="checkCommit(item, index)">
          <span class="btn-left">{{index}} 创建了{{item.commits}}个commits在{{item.lists.length}}类文章中</span>
          <span class="btn-right">
            <svg v-if="!item.show" t="1573179093024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11545" width="25" height="25"><path d="M511.4 922.5C738.1999999999999 922.5 922 738.7 922 511.9000000000001s-183.89999999999992-410.70000000000005-410.6999999999999-410.70000000000005c-226.8-7.105427357601002e-14-410.70000000000005 183.89999999999992-410.70000000000005 410.6999999999999S284.49999999999994 922.5 511.4 922.5z m2.8421709430404007e-13-770c198.5 1.4210854715202004e-14 359.2999999999999 160.9000000000001 359.29999999999995 359.3000000000001s-160.9000000000001 359.2999999999999-359.3000000000001 359.29999999999995S152 710.3 152 511.9c1.4210854715202004e-14-198.5 160.90000000000006-359.3999999999999 359.40000000000003-359.39999999999986z m-22.600000000000165 475.79999999999995c6.199999999999998 6.200000000000003 14.599999999999998 8.100000000000003 22.6 6.700000000000006 7.999999999999998 1.4000000000000021 16.4-0.4999999999999929 22.6-6.699999999999993L730.4 431.70000000000005c10.000000000000004-9.999999999999998 10.000000000000009-26.299999999999994 1.0658141036401503e-14-36.3-9.999999999999998-10.000000000000004-26.299999999999994-10.000000000000009-36.3-1.0658141036401503e-14l-182.80000000000004 182.7999999999999-182.7999999999999-182.80000000000004c-9.999999999999998-10.000000000000004-26.299999999999994-10.000000000000009-36.3-1.0658141036401503e-14-10.000000000000004 9.999999999999998-10.000000000000009 26.299999999999994-1.0658141036401503e-14 36.3L488.7999999999999 628.3z" fill="#707070" p-id="11546"></path></svg>
            <svg v-else t="1573178962149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10895" width="25" height="25"><path d="M512.6 101.5c-226.8 0-410.6 183.8-410.6 410.6S285.9 922.80000001 512.7 922.8c226.8 0 410.7-183.9 410.7-410.7s-183.90000001-410.6-410.8-410.6z m0 770c-198.50000001 0-359.3-160.9-359.3-359.3S314.20000001 152.9 512.59999999 152.9 872 313.7 872 512.1c0 198.50000001-160.9 359.4-359.4 359.4z m22.6-475.8c-6.2-6.2-14.6-8.1-22.60000001-6.7-8-1.39999999-16.4 0.5-22.59999999 6.7l-196.4 196.6c-10 10-10 26.3 0 36.30000001 10 10 26.3 10 36.3-1e-8L512.7 445.8 695.5 628.6c10 10 26.3 10 36.3 0 10-10 10-26.3 0-36.30000001l-196.6-196.59999999z" fill="#707070" p-id="10896"></path></svg>
          </span>
        </a>
        <ul class="timeline-post" :style="{display: !item.show ? 'none': 'block'}">
          <li class="tl" v-for="post in item.lists" :key="post.key">
              <div class="post-item post-title">
                <!-- <a :href="`${post.regularPath}`"></a> -->
                <router-link :to="post.regularPath" class="post-link">{{post.title}}</router-link>
                <span class="post-commit" :style="{color: tagColor(post), background: tagBgColor(post)}">
                  {{tagTitle(post)}}
                </span>
              </div>
              <div class="post-date">
                <span>{{handlePostDate(post)}}</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>


<script>
import dayJs from 'dayjs';

export default {
  data() {
    return {
      activeGroup: {}
    };
  },
  computed: {
    
  },
  mounted() {
    const allNav = this.handleNavType(this.$site.themeConfig.sidebar || []);
    this.activeGroup = this.groupMonth(this.$site.pages, allNav);

  },
  methods: {

    checkCommit(item, index) {
      this.$set(this.activeGroup[index], "show", !item.show)      
    },
    tagColor(post) {
      return this.handleFilterTag(post).color || '';
    },
    tagBgColor(post) {
      return this.handleFilterTag(post).background || '';
    },
    tagTitle(post) {
      return this.handleFilterTag(post).text || '';
    },
    handleFilterTag(post) {
      const allNav = this.$themeConfig.nav;
      const tag = allNav.filter(e => e.text == post.frontmatter.tag)[0] || {};
      return tag
    },

    handlePostDate(post) {
      return dayJs(post.lastUpdated).format('YYYY-MM-DD')
    },

    handleProportion(prot, allProt) {
      return {
        background: `rgb(255, 215, 0, ${prot/allProt + 0.5})`,
        width: `${(prot/allProt)*100}%`
      }
    },
    

    handleNavType(navList) {
      let newSide = [];
      for (const key in navList) {
        if (navList.hasOwnProperty(key)) {
          newSide.push(key);
        }
      }
      return newSide;
    },
    groupMonth(list, nav) {
      const monthGroup = {};
      const typeList = ['typeHome', 'typeBook', 'typeArchive']
      let groupMonth = {}
      // 月份分组
      list.map((value, index, array) => {
        if (value.lastUpdated) {
          let d = new Date(value.lastUpdated);
          d = `${d.getFullYear()}/${d.getMonth() + 1}`;
          monthGroup[d] = monthGroup[d] || [];
          monthGroup[d].push(value);
        }
      });
      
      for (const key in monthGroup) {
        if (monthGroup.hasOwnProperty(key)) {
          groupMonth[key] = {}
          groupMonth[key].commits = monthGroup[key].length
          groupMonth[key].lists = monthGroup[key].filter(el => !typeList.includes(el.frontmatter.type)) || [],
          groupMonth[key].show = true
        }
      }


   
      return groupMonth;
    }
  }
};
</script>




<style lang="stylus" scoped>

.timeline-app {
  padding 2rem 30px 0
}
.timeline-active {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  position: relative;
  z-index: 1;
  margin-bottom: 50px;
  margin-top: 30px;


  h1 {
    padding 
  }

 
  .timeline-header {
    // position relative
    display: inline-block;
    font-size: 0.6rem;
    font-weight: bold;

    .time-year {
      color: gray;
    }
    
  }

  // .timeline-content:nth-child(n+3) {
  //   border-top: 1px solid #e1e4e8;
  // }

  .timeline-content {
    min-height: 40px;

    .timeline-icon {
      display flex
      align-items center
      justify-content center
      float: left;
      width: 32px;
      height: 32px;
      line-height: 28px;
      color: #24292e;
      background: #e1e4e8;
      border: 2px solid #ffffff;
      border-radius: 50%;
      margin-left: -42px;
      >svg {
        margin-left 2px
      }
    }

    .timeline-slowUp :hover {
      background rgba(64,64,62,.2)
    }

    .timeline-slowUp {
      line-height: 2.5rem !important;
      width: 100% !important;
      color #fff;
      display: inline-block;
      padding: 0;
      cursor: pointer;
      font-size 14px;
      .btn-left {
        font-weight: 500;
        float: left;
      }

      .btn-right {
        float: right;
      }
    }

    >ul {
      padding: 0;
      margin: 0;
    }

    .timeline-post {
      list-style: none;
      padding 5px 0
      .tl {
        display flex;
        justify-content space-between;
        line-height: 30px;

        .post-item {
          display: inline-block;
        }

        .post-title {
          // max-width: 85%;

          .post-commit {
            padding: 2px 8px;
            margin: 9px 14px 9px 20px;
            border-radius: 3px;
            font-size: 0.7rem;
          }
        }
        .post-link {
          color #42b983
        }

        .post-data {
          // width: 25%;
          
        }
      }
    }
  }
}
</style>