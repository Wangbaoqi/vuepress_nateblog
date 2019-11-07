<template>
  <div class="timeline-app">
    <h2>更新活动</h2>
    <div class="timeline-active">
      <div class="timeline-header">
        November
        <span class="time-year">2019</span>
      </div>
      <section class="timeline-content" v-for="(item, index) in activeGroup" :key="index">
        <span class="timeline-icon"></span>
        <div class="timeline-slowUp">
          <span class="btn-left">{{index}}创建了{{item.commits}}个commits在{{item.lists.length}}类文章中</span>
          <span class="btn-right">kk</span>
        </div>
        <ul class="timeline-post">
          <li class="tl" v-for="post in item.lists" :key="post.key" v-if="post.commit">
              <div class="post-item post-title">
                <a :href="post.regularPath">nate.wang{{post.path}}</a>
                <span class="post-commit">{{post.commit}}commits</span>
              </div>
              <div class="post-item post-proportion">
                <div class="proportion-many">
                  <span class="proportion-paint" :style="handleProportion(post.commit, item.commits)"></span>
                </div>
            </div>
          </li>
        </ul>
      </section>
      <section class="timeline-content">
        <span class="timeline-icon"></span>
      </section>
    </div>
  </div>
</template>


<script>
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
    const allActive = this.$site.pages || [];

    this.activeGroup = this.groupMonth(allActive, allNav);

    console.log(this.activeGroup);
  },
  methods: {
    handleProportion(prot, allProt) {
      console.log(prot, allProt);
  
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
          groupMonth[key].lists = monthGroup[key] || []
        }
      }


      for (let it in groupMonth) {
        
        groupMonth[it].lists = nav.map(e =>
          groupMonth[it].lists.filter(el => el.path.includes(e))
        ).map(el => {
          return {
            ...el[0],
            commit: el.length
          }
        });
        
      }
      return groupMonth;
    }
  }
};
</script>




<style lang="stylus" scoped>
.timeline-active {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  position: relative;
  z-index: 1;
  margin-bottom: 50px;
  margin-top: 30px;

  &:before {
    position: absolute;
    top: 1.5rem;
    left: 15px;
    bottom: 0;
    display: block;
    width: 2px;
    content: '';
    background: #eaecef;
    z-index: -1;
  }

  .timeline-header {
    // position relative
    display: inline-block;
    font-size: 0.6rem;
    font-weight: bold;

    .time-year {
      color: gray;
    }

    &:after {
      position: absolute;
      top: 10px;
      left: 6.8rem;
      right: 0;
      height: 1px;
      content: '';
      background: #eaecef;
    }
  }

  .timeline-content:nth-of-type(even) {
    border-top: 1px solid #e1e4e8;
  }

  .timeline-content {
    padding: 24px;
    margin-left: 16px;
    min-height: 40px;

    .timeline-icon {
      float: left;
      width: 32px;
      height: 32px;
      line-height: 28px;
      color: #24292e;
      background: #e1e4e8;
      border: 2px solid #ffffff;
      border-radius: 50%;
      margin-left: -42px;
    }

    .timeline-slowUp :hover {
      color: #239a3b;
    }

    .timeline-slowUp {
      line-height: 2.5rem !important;
      width: 100% !important;
      color: #586069 !important;
      display: inline-block;
      padding: 0;
      margin-bottom: 10px;
      cursor: pointer;

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

      .tl {
        padding: 4px 0;
        line-height: 1;

        .post-item {
          display: inline-block;
        }

        .post-title {
          max-width: 85%;

          .post-commit {
            font-size: 0.7rem;
          }
        }

        .post-proportion {
          width: 25%;
          float: right;

          .proportion-many {
            width: 68%;

            .proportion-paint {
              display: inherit;
              height: 8px;
              border-radius: 3px;
              overflow: hidden;
              background: #eaecef;
              margin-top: 0.4rem;
            }
          }
        }
      }
    }
  }
}
</style>