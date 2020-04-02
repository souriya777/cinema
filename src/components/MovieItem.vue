<template>
  <div class="movie">
    <div class="movie-col-left">
      <router-link :to="linkTo">
        <img v-bind:src="infos.poster">
      </router-link>
    </div>
    <div class="movie-col-right">
      <div class="movie-title">
        <router-link :to="linkTo">
          <h2>{{ infos.title }}</h2>
        </router-link>
        <span class="movie-rating">{{ infos.rated }}</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import times from '../util/times';

export default {
  props: ["id", "infos"],
  computed: {
    linkTo: function() {
      return { name: 'movie', params: { id: this.id } }
    }
  }
}
</script>