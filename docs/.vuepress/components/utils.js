


export default {

  ownPropertyNamesFor: function (target) {
    if (target === window) {
      return [
        // Function Properties
        'eval',
        'isFinite',
        'isNaN',
        'parseFloat',
        'parseInt',
        'decodeURI',
        'decodeURIComponent',
        'encodeURI',
        'encodeURIComponent',
        // Constructor Properties
        'Array',
        'ArrayBuffer',
        'Boolean',
        'DataView',
        'Date',
        'Error',
        'EvalError',
        'Float32Array',
        'Float64Array',
        'Function',
        'Int8Array',
        'Int16Array',
        'Int32Array',
        'Map',
        'Number',
        'Object',
        'Promise',
        'Proxy',
        'RangeError',
        'ReferenceError',
        'RegExp',
        'Set',
        'SharedArrayBuffer',
        'String',
        'Symbol',
        'SyntaxError',
        'TypeError',
        'Uint8Array',
        'Uint8ClampedArray',
        'Uint16Array',
        'Uint32Array',
        'URIError',
        'WeakMap',
        'WeakSet',
        // Other Properties
        'Atomics',
        'JSON',
        'Math',
        'Reflect',
      ];
    }
    if(Array.isArray(target)) {
      return target
    }
    return Object.getOwnPropertyNames(target);
  },

  ownPropertyFor: function (target = window, propName) {
    return Object.getOwnPropertyDescriptor(target, propName).value;
  },

  isObject: function (any) {
    return (any !== null) && (typeof any === 'function' || typeof any === 'object');
  },

  getObjectProperties: function (target, prefix = 'global', visited = new Set()) {
    if (visited.has(target) || !this.isObject(target)) {
      return null;
    }
    visited.add(target);
    const objectPropNames = this.ownPropertyNamesFor(target).filter(name => this.isObject(this.ownPropertyFor(target, name)));
    return objectPropNames.map((name) => {
      const id = `${prefix}.${name}`
      return {
        id,
        name,
        children: this.getObjectProperties(this.ownPropertyFor(target, name), id, visited)
      };
    });
  },

  getPropsCollectionType: function(collectTypes) {
    if(typeof collectTypes === 'string') {
      let collectArr = collectTypes.split(',');
      if(Array.isArray(collectArr)) {
        return collectArr
      }
      return window
    }
    return window
  },

  
  initG6: function(G6, collectTypes, self) {

    const targetObject = this.getPropsCollectionType(collectTypes);
    const targetId = (collectTypes && collectTypes.length == 1) ? collectTypes[0] : 'global';
    const targetName = (collectTypes && collectTypes.length == 1) ? collectTypes[0] : 'global';

    const width = self.$refs.container.scrollWidth;
    const height = self.$refs.container.scrollHeight || 1000;
    const data = {
      id: targetId,
      name: targetName,
      children: this.getObjectProperties(targetObject)
    };  

    const graph = new G6.TreeGraph({
      container: 'container',
      width,
      height,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model').data;
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          // 'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 20,
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        style: {
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
        },
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF',
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => {
          return 16;
        },
        getWidth: () => {
          return 16;
        },
        getVGap: () => {
          return 8;
        },
        getHGap: () => {
          return 100;
        },
      },
    });
  
    let centerX = 0;
    graph.node(function (node) {
      let position = 'top';
      if (node.id === 'global') {
        centerX = node.x;
      } else {
        if (node.x > centerX) {
          position = (node.children && node.children.length) ? 'left' : 'right';
        } else {
          position = (node.children && node.children.length) ? 'right' : 'left';
        }
      }
  
      return {
        label: node.name,
        labelCfg: {
          position,
          offset: 5,
        },
      };
    });

    console.log(data, 'dataProps');
  
    G6.Util.traverseTree(data, item => {
      item.collapsed = item.id.split('.').length > 1;    
    })
    
    graph.data(data);
    graph.render();
    graph.fitView();
  }
  
}