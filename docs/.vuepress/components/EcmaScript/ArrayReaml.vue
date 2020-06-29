<template>
  <div class="array-specication">
    <div id='container'>array hello</div>
  </div>
</template>


<script>
import G6 from '@antv/g6';
import { graphRealm } from '../utils'
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    this.initG6Array()
  },

  methods: {
    initG6Array() {
      const arrayRealm = graphRealm(['Array'])
      console.log(arrayRealm);
    }
  },
}
</script>