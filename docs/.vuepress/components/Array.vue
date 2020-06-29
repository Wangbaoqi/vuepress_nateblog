<template>
  <div class="array-specication">
    <div id="container"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import { graphRealm } from "./utils";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initG6Array();
    this.initG6Array1();
  },

  methods: {
    initG6Array1() {
      fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
      )
        .then((res) => res.json())
        .then((data) => {
          data = graphRealm(["Array"]);

          const width = document.getElementById("container").scrollWidth;
          const height =
            document.getElementById("container").scrollHeight || 500;
          const graph = new G6.TreeGraph({
            container: "container",
            width,
            height,
            modes: {
              default: [
                {
                  type: "collapse-expand",
                  onChange: function onChange(item, collapsed) {
                    const data = item.get("model").data;
                    data.collapsed = collapsed;
                    return false;
                  },
                },
                "drag-canvas",
                "zoom-canvas",
              ],
            },
            defaultNode: {
              size: 26,
              anchorPoints: [
                [0, 0.5],
                [1, 0.5],
              ],
              style: {
                fill: "#C6E5FF",
                stroke: "#5B8FF9",
              },
            },
            defaultEdge: {
              type: "cubic-horizontal",
              style: {
                stroke: "#A3B1BF",
              },
            },
            layout: {
              type: "mindmap",
              direction: "H",
              getHeight: () => {
                return 16;
              },
              getWidth: () => {
                return 16;
              },
              getVGap: () => {
                return 10;
              },
              getHGap: () => {
                return 100;
              },
              getSide: (d) => {
                if (d.id === 'prototype') {
                  return 'right';
                }
                return 'left';
              },
            },
          });

          let centerX = 0;
          graph.node(function(node) {
            if (node.id === "Modeling Methods") {
              centerX = node.x;
            }

            return {
              label: node.id,
              labelCfg: {
                position:
                  node.children && node.children.length > 0
                    ? "right"
                    : node.x > centerX
                    ? "right"
                    : "left",
                offset: 5,
              },
            };
          });

          graph.data(data);
          graph.render();
          graph.fitView();
        });
    },
    initG6Array() {
      const arrayRealm = graphRealm(["Array"]);
      console.log(arrayRealm);

      // const width = 920 || window.devicePixelRatio * window.screen.width * 0.5; // 高清显示
      // const height = 600 || window.devicePixelRatio * window.screen.height;
      // const graph = new G6.TreeGraph({
      //   container: "container",
      //   width,
      //   height,
      //   modes: {
      //     default: [
      //       {
      //         type: "collapse-expand",
      //         onChange: function onChange(item, collapsed) {
      //           console.log(item, "item");

      //           const data = item.get("model");
      //           data.collapsed = collapsed;
      //           return true;
      //         },
      //       },
      //       // 'drag-canvas',
      //       "zoom-canvas",
      //     ],
      //   },
      //   defaultNode: {
      //     size: 26,
      //     anchorPoints: [
      //       [0, 0.5],
      //       [1, 0.5],
      //     ],
      //     // color: "#000",
      //     style: {
      //       fill: "#C6E5FF",
      //       stroke: "#5B8FF9",
      //     },
      //   },
      //   defaultEdge: {
      //     type: "cubic-horizontal",
      //     style: {
      //       stroke: "#A3B1BF",
      //     },
      //   },
      //   layout: {
      //     type: "compactBox",
      //     direction: "LR",
      //     getId: function getId(d) {
      //       return d.id;
      //     },
      //     getHeight: function getHeight() {
      //       return 16;
      //     },
      //     getWidth: function getWidth() {
      //       return 16;
      //     },
      //     getVGap: function getVGap() {
      //       return 10;
      //     },
      //     getHGap: function getHGap() {
      //       return 100;
      //     },
      //   },
      // });
      // let centerX = 0;
      // graph.node(function(node) {
      //   if (node.id === "Modeling Methods") {
      //     centerX = node.x;
      //   }

      //   return {
      //     label: node.id,
      //     labelCfg: {
      //       position:
      //         node.children && node.children.length > 0
      //           ? "right"
      //           : node.x > centerX
      //           ? "right"
      //           : "left",
      //       offset: 5,
      //     },
      //   };
      // });
      // graph.data(arrayRealm);
      // graph.render();
      // graph.fitView();
    },
  },
};
</script>

<style lang="stylus">
.array-specication
  background #fff
</style>
