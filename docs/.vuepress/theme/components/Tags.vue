<template>
  <div class="tag">
    <div class="items">
      <span
        v-for="taginfo in tags"
        :style="{backgroundColor:color()}"
        @click="change(taginfo)"
        :class="taginfo===tg?'active':''"
      >{{taginfo}}</span>
    </div>
  </div>
</template>

<script>
import Article from "@theme/components/Article.vue";
export default {
  components: {
    Article
  },
  props: {
    lang: '',
    tags: {
      type: Array,
      value: []
    }
  },
  data() {
    return {
      info: [],
      tg: "全部",
    };
  },
  methods: {
    change(tag) {
      this.tg = tag;
      this.$emit('changeTag', tag)
    },
    color() {
      // 标签button颜色
      let colors = [
        "#3498DB",
        "#3EAF7C",
        "#5CBBF6",
        "#f5A28E",
        "#f2AC3B",
        "#FA6551",
        "#C68CE0"
      ];
      return colors[parseInt(Math.random() * colors.length)];
    }
  },
  mounted() {
    
  }
};
</script>

<style lang='stylus' scoped>
.tag {
  padding: 2rem 20px;

  .items {
    margin-bottom: 2rem;

    span {
      vertical-align: middle;
      cursor: pointer;
      margin: 0.5rem 0.5rem 0.2rem;
      padding: 0.4rem 0.7rem;
      margin: 1.5rem 1rem 0.2rem;
      padding: 9px 0.7rem;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      border-radius: 0.2rem;
      background: #fff;
      color: #fff;
      font-size: 13px;
      box-shadow: 0 1px 0.25rem 0 hsla(0, 0%, 57%, 0.21);
      transition: all 0.3s;
      background-color: red;

      &.active {
        transform: scale(1.2);
      }

      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
