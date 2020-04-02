<template>
  <div id="app">
    <router-link 
      :to="{ name: 'home' }"
      class="no-link-decoration"
    >
      <div id="title">
          <img src="../public/logo.png">
          <h1>Vue.js Cinema</h1>
      </div>
    </router-link>
    <router-view
      v-bind:movies="movies"
      v-bind:genre="genre"
      v-bind:time="time"
      v-bind:day="day"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import { checkFilter } from './util/bus';
import routes from './util/routes'

Vue.use(VueRouter);

const router = new VueRouter({ routes });

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
  created: function() {
    fetch("//localhost:8888/api")
      .then(response => response.json())
      .then(json => {
        this.movies = json
      });

    this.$bus.$on("check-filter", checkFilter.bind(this));
  },
  router
}
</script>

<style lang="scss" src="./style.scss"></style>
