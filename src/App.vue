<template>
  <div id="app" v-cloak>
    <router-link 
      :to="{ name: 'home' }"
      class="no-link-decoration"
    >
      <div id="title">
          <img src="../public/logo.png">
          <h1>Vue.js Cinema</h1>
      </div>
    </router-link>
    <keep-alive>
      <router-view
        v-bind:movies="movies"
        v-bind:genre="genre"
        v-bind:time="time"
        v-bind:day="day"
      />
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment-timezone';

import { checkFilter, setDay } from './util/bus';
import routes from './util/routes';
import Tooltip from './util/tooltip';

Vue.use(VueRouter);
Vue.use(Tooltip);

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
    this.$bus.$on("set-day", setDay.bind(this));
  },
  router
}
</script>

<style lang="scss" src="./style.scss"></style>
