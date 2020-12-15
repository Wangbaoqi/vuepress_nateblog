<template>
  <div class="books">
    <h1 class="book-title">All the Books About IT ⤵️</h1>
    <section class="book-group">
      <div v-for="book in books" class="book-type">
        <h3>{{book.bookType}}</h3>
        <section class="book-list" >
          <div class="" v-for="item in book.list" class="book-item">
            <img class="item-img" :src="item.url" >
            <div class="item-name">{{item.name}}</div>
          </div>
         
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import bookList from '../../staticConfig/books'
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
      this.books = bookList
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
  .book-group 

    .book-list 
      display flex
      flex-wrap wrap
      justify-content flex-start
    .book-item
      // max-width 120px
      // flex auto
      margin 1rem 4rem 1rem 0
      .item-img 
        width 120px
        height 160px
      .item-name
        max-width 120px
</style>