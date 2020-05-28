<template>
  <div class="books">
    <h1 class="book-title">All the Books About IT ⤵️</h1>
    <section class="book-list">
      
    </section>
  </div>
</template>

<script>

export default {
  components: {
    
  },
  computed: {
   
  },
  data() {
    return {
      books: [], 
    };
  },
  mounted() {
    
    this.handleLang()

  },
  methods: {
    handleLang() {
      this.lang = this.$page.frontmatter.lang
    },
  
    changeTag(tag) {
     

    },
  },
  watch: {
    $route() {
     
    }
  }
};
</script>

<style lang="stylus" scoped>
$color = #339ef4;

.books
  padding 2rem 30px 0  
</style>