<template>
  <div id="movie-list">
    <div
      class="movie"
      v-for="movie in filteredMovies"
      v-bind:key="movie.title"
    >
      {{ movie.title }}
    </div>
  </div>
</template>

<script>
import genres from '../util/genres';

export default {
  props: ["genre", "time"],
  data: function() {
    return {
      movies: [
        { title: "La La Land 3", genre: genres.ANIMATION },
        { title: "Home Alone", genre: genres.ANIMATION },
        { title: "Austin Powers", genre: genres.HORROR },
      ]
    }
  },
  methods: {
    filterByGenre: function(movie) {
      return this.genre.find(genre => genre === movie.genre);
    }
  },
  computed: {
    filteredMovies: function() {
      if (this.genre.length === 0) {
        return this.movies;
      }
      return this.movies.filter(this.filterByGenre);
    }
  }
}
</script>