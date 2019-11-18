<template>
  <div class="timeline-app">
    <h2>更新活动</h2>
    <div class="timeline-active">
      <div class="timeline-header">
        <span class="time-year">2019</span>
      </div>
      <section class="timeline-content" v-for="(item, index) in activeGroup" :key="index">
        <span class="timeline-icon">
          <svg t="1573178033916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2827" width="20" height="20"><path d="M528.298667 589.994667c-165.034667 0-219.136 66.304-236.8 110.08a147.541333 147.541333 0 1 1-107.093334-3.413334V286.72a147.370667 147.370667 0 1 1 98.304 0v259.925333c43.178667-31.914667 106.069333-55.04 196.437334-55.04 131.242667 0 174.933333-65.792 189.184-109.568a147.370667 147.370667 0 1 1 203.946666-136.106666c0 65.877333-43.264 122.88-102.741333 140.544-12.8 70.314667-60.416 203.434667-241.237333 203.434666zM233.472 786.517333a49.152 49.152 0 1 0 0 98.304 49.152 49.152 0 0 0 0-98.304z m0-687.786666a49.152 49.152 0 1 0 0 98.133333 49.152 49.152 0 0 0 0-98.133333z m491.349333 98.133333a49.152 49.152 0 1 0 0 98.304 49.152 49.152 0 0 0 0-98.218667z" p-id="2828" fill="#bfbfbf"></path></svg>
        </span>
        <div class="timeline-slowUp" @click="checkCommit(item, index)">
          <span class="btn-left">{{index}} 创建了{{item.commits}}个commits在{{item.lists.length}}类文章中</span>
          <span class="btn-right">
            <svg v-if="item.show" t="1573179093024" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11545" width="25" height="25"><path d="M511.4 922.5C738.1999999999999 922.5 922 738.7 922 511.9000000000001s-183.89999999999992-410.70000000000005-410.6999999999999-410.70000000000005c-226.8-7.105427357601002e-14-410.70000000000005 183.89999999999992-410.70000000000005 410.6999999999999S284.49999999999994 922.5 511.4 922.5z m2.8421709430404007e-13-770c198.5 1.4210854715202004e-14 359.2999999999999 160.9000000000001 359.29999999999995 359.3000000000001s-160.9000000000001 359.2999999999999-359.3000000000001 359.29999999999995S152 710.3 152 511.9c1.4210854715202004e-14-198.5 160.90000000000006-359.3999999999999 359.40000000000003-359.39999999999986z m-22.600000000000165 475.79999999999995c6.199999999999998 6.200000000000003 14.599999999999998 8.100000000000003 22.6 6.700000000000006 7.999999999999998 1.4000000000000021 16.4-0.4999999999999929 22.6-6.699999999999993L730.4 431.70000000000005c10.000000000000004-9.999999999999998 10.000000000000009-26.299999999999994 1.0658141036401503e-14-36.3-9.999999999999998-10.000000000000004-26.299999999999994-10.000000000000009-36.3-1.0658141036401503e-14l-182.80000000000004 182.7999999999999-182.7999999999999-182.80000000000004c-9.999999999999998-10.000000000000004-26.299999999999994-10.000000000000009-36.3-1.0658141036401503e-14-10.000000000000004 9.999999999999998-10.000000000000009 26.299999999999994-1.0658141036401503e-14 36.3L488.7999999999999 628.3z" fill="#707070" p-id="11546"></path></svg>
            <svg v-else t="1573178962149" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10895" width="25" height="25"><path d="M512.6 101.5c-226.8 0-410.6 183.8-410.6 410.6S285.9 922.80000001 512.7 922.8c226.8 0 410.7-183.9 410.7-410.7s-183.90000001-410.6-410.8-410.6z m0 770c-198.50000001 0-359.3-160.9-359.3-359.3S314.20000001 152.9 512.59999999 152.9 872 313.7 872 512.1c0 198.50000001-160.9 359.4-359.4 359.4z m22.6-475.8c-6.2-6.2-14.6-8.1-22.60000001-6.7-8-1.39999999-16.4 0.5-22.59999999 6.7l-196.4 196.6c-10 10-10 26.3 0 36.30000001 10 10 26.3 10 36.3-1e-8L512.7 445.8 695.5 628.6c10 10 26.3 10 36.3 0 10-10 10-26.3 0-36.30000001l-196.6-196.59999999z" fill="#707070" p-id="10896"></path></svg>
          </span>
        </div>
        <ul class="timeline-post" :style="{display: !item.show ? 'block': 'none'}">
          <li class="tl" v-for="post in item.lists" :key="post.key" v-if="post.commit">
              <div class="post-item post-title">
                <a :href="`${post.regularPath}`">nate.wang{{post.path}}</a>
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
    debugger
    const allNav = this.handleNavType(this.$site.themeConfig.sidebar || []);
    const allActive = this.$site.pages || [];

    this.activeGroup = this.groupMonth(allActive, allNav);

    console.log(this.activeGroup);
  },
  methods: {

    checkCommit(item, index) {

      this.$set(this.activeGroup[index], "show", !item.show)      

      
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
      left: 2.8rem;
      right: 0;
      height: 1px;
      content: '';
      background: #eaecef;
    }
  }

  .timeline-content:nth-child(n+3) {
    border-top: 1px solid #e1e4e8;
  }

  .timeline-content {
    padding: 24px 24px 8px;
    margin-left: 16px;
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