<template>
  <div id="app">
    <div id="title">
        <img src="../public/logo.png">
        <h1>Vue.js Cinema</h1>
    </div>
    <div id="overview">
        <div class="main">
            <movie-list
              v-bind:movies="movies"
              v-bind:genre="genre"
              v-bind:time="time"
            ></movie-list>
            <movie-filter v-on:check-filter="checkFilter"></movie-filter>
        </div>
    </div>
  </div>
</template>

<script>
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

export default {
  data: function() {
    return {
      movies: [],
      time: [],
      genre: [],
    }
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
  },
  created: function() {
    fetch("//localhost:8888/api")
      .then(response => response.json())
      .then(json => {
        this.movies = json
      });
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
