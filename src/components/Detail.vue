<template>
  <div 
    id="detail"
    v-if="movie"
  >
    <movie-item
      v-bind:key="movie.id"
      v-bind:id="movie.id"
      v-bind:infos="movie.infos"
      v-bind:day="day"
      v-bind:time="time"
    >
      <div class="movie-details">
        <p class="movie-genre">{{ movie.infos.genre }}</p>
        <p class="movie-plot">{{ movie.infos.plot }}</p>
        <table>
          <tr>
            <td>Realeased date: </td>
            <td>{{ movie.infos.released }}</td>
          </tr>
          <tr>
            <td>Running time: </td>
            <td>{{ movie.infos.runtime }}</td>
          </tr>
          <tr>
            <td>Director: </td>
            <td>{{ movie.infos.director }}</td>
          </tr>
          <tr>
            <td>Cast: </td>
            <td>{{ movie.infos.actors }}</td>
          </tr>
        </table>
      </div>
    </movie-item>
    <div class="home">
      <router-link :to="{ name: 'home' }">
        Back to results
      </router-link>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem';

export default {
  props: [ "movies", "day", "time" ],
  computed: {
    movie: function() {
      return this.movies.find(({id}) => id === this.$route.params.id)
    }
  },
  components: {
    MovieItem
  }
}
</script>