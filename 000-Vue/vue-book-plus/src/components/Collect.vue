<template>
  <div>
    <MHeader>购物车</MHeader>
    <ul class="content">
      <li v-for="l in cartList">
        <img :src="l.bookCover" alt="">
        <h3>{{l.bookName}}</h3>
        <button>-</button>{{l.bookCount}}<button>+</button>
        <p>小计 {{l.bookPrice*l.bookCount}}</p>
        <button>删除</button>
      </li>
      <li>共{{count}}本</li>
    </ul>
  </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  // 辅助函数 语法糖
  import {mapState,mapGetters} from 'vuex';
  export default {
        data(){
            return {msg: 'hello'}
        },
        created(){
        },
        methods: {},
        computed: {
          ...mapGetters(['count']),
          ...mapState(['cartList']),
          /*cartList(){
              return this.$store.state.cartList
          }*/
        },
        components: {MHeader}
    }
</script>
<style scoped>

</style>
