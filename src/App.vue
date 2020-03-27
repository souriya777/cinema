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
              v-bind:day="day"
            ></movie-list>
            <movie-filter></movie-filter>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment-timezone';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';
import { checkFilter } from './util/bus'

moment.tz.setDefault("UTC");
Vue.prototype.$moment = moment;

const bus = new Vue();
Vue.prototype.$bus = bus;

export default {
  data: function() {
    return {
      movies: [],
      time: [],
      genre: [],
      day: moment()
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

    this.$bus.$on("check-filter", checkFilter.bind(this));
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
