<template>
  <main class="page">
    <slot name="top"/>

    <Classify v-if="type == 'typeHome'" />

    <Books v-else-if="type == 'typeBook'"/>

    <Archive v-else-if="type == 'typeArchive'"/>

    <Content v-else class="content theme-default-content"/>



    <Issue v-if="issueType"/>

    <footer class="page-edit">
      <div class="edit-link" v-if="editLink">
        <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
        <OutboundLink/>
      </div>

      <div class="last-updated" v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}:</span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ←
          <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
        </span>

        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>→
        </span>
      </p>
    </div>
    <div id="gitalk-container" v-show="isShow()"></div>
    <!-- <slot name="sider"/> -->

    <slot name="bottom"/>
  </main>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from "@parent-theme/util";
import Gitalk from "gitalk";
import dayJs from 'dayjs';
import Classify from "@theme/components/classify.vue";
import Issue from "@theme/components/GoodIssue.vue";
import imagesZoom from "@theme/util/imageScale";
import Books from '@theme/components/Books.vue';
import Archive from '@theme/components/Archive.vue';
import "gitalk/dist/gitalk.css";
export default {
  components: { Classify, Issue, Books, Archive },
  props: ["sidebarItems"],
  data() {
    return {
      path: "",
      type: "",
      issueType: ""
    };
  },
  computed: {
    lastUpdated() {
      return dayJs(this.$page.lastUpdated).format('YYYY-MM-DD');
    },
    
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },

    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },

    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },

    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },

    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },

  
  methods: {
    isShow() {
      return !(this.type == 'typeHome' || this.type == 'typeBook' || this.type == 'typeArchive')
    },
    updated() {
      const { frontmatter = {} } = this.$page;
      const types = ['typeHome', 'typeTopic']

      this.type = frontmatter.type
      this.issueType = frontmatter.subType == 'oneTopic'
      this.initGitalk();
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    },
    initGitalk() {
      let path = this.$route.path;
      if (path !== this.path) {
        this.initImgZoom();
        this.path = path;
        let a = document.getElementById("gitalk-container");
        if (a && a.children.length > 0) a.innerHTML = "";
        let gitTalkParams = this.$site.themeConfig.gitalk;
        if (Gitalk && gitTalkParams) {
          let labelRule = eval(gitTalkParams.labelRule);
          let id = labelRule(this.$page.title, this.$page.path);
          var gitalk = new Gitalk({
            ...gitTalkParams,
            id: id || this.$page.title
          });
          gitalk.render("gitalk-container");
        }
      }
    },
    initImgZoom() {
      let imgDom = document.getElementsByTagName("img");
      for (let v of imgDom) {
        v.style = `
          cursor: zoom-in;
        `;
        v.addEventListener("click", function(e) {
          let dom = document.createElement("div");
          dom.style = `
            position:fixed;
            top: 0;
            left: 0;
            z-index: 999;
            width:100%;
            height:100%;
            background-color:rgba(46, 46, 46, 0.79);
            display:flex;
            justify-content:center;
            align-items:center;
            cursor: zoom-out;
          `;

          let imgDom = document.createElement("img");
          imgDom.src = this.src;
          imgDom.style = `
            height:90%
          `;
          dom.append(imgDom);
          document.body.append(dom);
          try {
            imagesZoom.init({
              elem: imgDom,
              parentDom: dom
            });
          } catch (e) {
            console.log(e);
          }

          dom.addEventListener("click", function() {
            document.body.removeChild(dom);
          });
        });
      }
    }
  },
  mounted() {
    this.updated();
    
  },
  watch: {
    $route: function(params) {
      this.updated();
    }
  },

  
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl';

.page {
  position relative
  margin-top: 2rem;
  grid-area main

}



.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: lighten($textColor, 25%);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: lighten($textColor, 25%);
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
  

  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}

#gitalk-container {
  // width: 100%;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}

</style>
