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

import { checkFilter, setDay } from './util/bus';
import routes from './util/routes';
import { addClass, removeClass } from './util/helpers';

Vue.use(VueRouter);

const router = new VueRouter({ routes });

moment.tz.setDefault("UTC");
Vue.prototype.$moment = moment;

const bus = new Vue();
Vue.prototype.$bus = bus;

const mouseOverHandler = function(e) {
  addClass(e.target.nextElementSibling, "tooltip-show");
}
const mouseOutHandler = function(e) {
  removeClass(e.target.nextElementSibling, "tooltip-show");
}

Vue.directive("tooltip", {
  bind: function(el, binding) {
    const span = document.createElement("span");
    const text = document.createTextNode(`Seats available: ${binding.value.seats}`);
    span.appendChild(text);
    addClass(span, "tooltip");
    el.appendChild(span);
    const div = el.getElementsByTagName("div")[0];
    div.addEventListener("mouseover", mouseOverHandler);
    div.addEventListener("mouseout", mouseOutHandler);
  },
  unbind: function(el) {
    const div = el.getElementsByTagName("div")[0];
    div.removeEventListener("mouseover", mouseOverHandler);
    div.removeEventListener("mouseout", mouseOutHandler);
  }
});

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
