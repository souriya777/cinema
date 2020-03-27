<template>
  <div id="movie-list">
    <movie-item
      class="movie"
      v-for="movie in filteredMovies"
      v-bind:key="movie.id"
      v-bind:infos="movie.infos"
    />
  </div>
</template>

<script>
import genres from '../util/genres';
import MovieItem from './MovieItem';

export default {
  props: ["movies", "genre", "time"],
  methods: {
    filterByGenre: function(movie) {
      return this.genre.find(genre => movie.infos.genre.toLowerCase().includes(genre.toLowerCase()));
    }
  },
  computed: {
    filteredMovies: function() {
      if (this.genre.length === 0) {
        return this.movies;
      }
      return this.movies.filter(this.filterByGenre);
    }
  },
  components: {
    MovieItem
  }
}
</script>