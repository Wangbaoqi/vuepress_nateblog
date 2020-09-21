export default {

  graphRealm: function (objects) {
    console.log(window, 'window');

    const set = new Set();

    const globalObject = {
      id: "Global Object",
      children: [

      ]
    }

    for (let i of objects) {
      globalObject.children.push({
        children: [],
        id: i
      })
    }

    for (let i = 0; i < objects.length; i++) {
      const current = objects[i]
      if (set.has(objects[i]))
        continue;
      set.add(objects[i])
      for (let p of Object.getOwnPropertyNames(window[objects[i]])) {
        let d = Object.getOwnPropertyDescriptor(window[objects[i]], p)
        if (d.hasOwnProperty("value") && ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function")) && d.value instanceof Object) {
          let childrenThird = []
          for (let k of Object.getOwnPropertyNames(d.value)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({
                id: k.replace(/^\S/, s => s.toUpperCase())
              })
            }
          }
          globalObject["children"][i].children.push({
            children: childrenThird,
            id: p
          })
        }
        if (d.hasOwnProperty("get") && typeof d.get === "function") {
          let childrenThird = []
          for (let k of Object.getOwnPropertyNames(d.get)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({
                id: k.replace(/^\S/, s => s.toUpperCase())
              })
            }
          }
          globalObject["children"][i].children.push({
            children: childrenThird,
            id: p.replace(/^\S/, s => s.toUpperCase())
          })
        }
        if (d.hasOwnProperty("set") && typeof d.set === "function") {
          let childrenThird = []
          for (let k of Object.getOwnPropertyNames(d.set)) {
            if (k !== 'name' && k !== 'length') {
              childrenThird.push({
                id: k.replace(/^\S/, s => s.toUpperCase())
              })
            }
          }
          globalObject["children"][i].children.push({
            children: childrenThird,
            id: p.replace(/^\S/, s => s.toUpperCase())
          })
        }
      }
    }
    return globalObject;
  },
  initG6: function(G6, collectTypes, self) {
    fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json")
      .then((res) => res.json())
      .then((data) => {
        data = this.graphRealm(collectTypes);
        console.log(data, 'datass');
        const width = self.$refs.container.scrollWidth;
        const height = self.$refs.container.scrollHeight || 800;
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
              if (d.id === "prototype") {
                return "right";
              }
              return "left";
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
  }
  
}