import Vue from "vue";

import "./style.scss";
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

new Vue({
  el: "#app",
  data: {
    time: [],
    genre: []
  },
  methods: {
    checkFilter: function(category, title, checked) {
      if(checked) {
        this[category].push(title);
      } else {
        this[category] = this[category].filter(item => item !== title);
      }
    }
  },
  components: {
    MovieList,
    MovieFilter,
  }
});