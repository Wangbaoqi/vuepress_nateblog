<template>
  <div class="array-specication">
    <div id="container" ref="container"></div>
  </div>
</template>

<script>
import { graphRealm, initG6 } from "./utils";
export default {
  data() {
    return {};
  },
  props: ['collectionType'],
  mounted() {
    let that = this;
    
    import("./utils").then((module) => {
      // use code
      console.log(module, "modulesss");
      import("@antv/g6").then((g6Module) => {
        // use code
        module.default.initG6(g6Module, that.collectionType, that);
      });
    });
  },
};
</script>
<style lang="stylus">
.array-specication
  color #333
  background #fff
</style>