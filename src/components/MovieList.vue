<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item
        v-for="movie in filteredMovies"
        v-bind:key="movie.id"
        v-bind:id="movie.id"
        v-bind:infos="movie.infos"
      >
        <div class="movie-sessions">
          <div 
            class="session-time-wrapper tooltip-wrapper"
            v-for="session in filteredSessions(movie.sessions)"
            v-bind:key="session.id"
            v-tooltip="{ seats: session.seats }"
          >
            <div class="session-time">{{ formatTime(session.time) }}</div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-result">
      {{ noResults }}
    </div>
    <div v-else class="no-result">
      Loading...
    </div>
  </div>
</template>

<script>
import genres from '../util/genres';
import times from '../util/times'
import MovieItem from './MovieItem';

export default {
  props: ["movies", "genre", "time", "day"],
  methods: {
    filteredSessions: function(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    },
    filterByGenre: function(movie) {
      if(this.genre.length === 0) {
        return true;
      }

      const searchGenre = movie.infos.genre;
      let matched = false;
      this.genre.forEach(genre => {
        if(searchGenre.toLowerCase().includes(genre.toLowerCase())) {
          matched = true;
        }
      });
      return matched;
    },
    sessionPassesTimeFilter: function(session) {
      if (!this.day.isSame(this.$moment(session.time), "day")) {
        return false;
      } 
      
      if(this.time.length === 0 || this.time.length === 2) {
        return true
      }

      const currentHour = this.$moment(session.time).hour();
      return (this.time[0] === times.BEFORE_6PM)
          ? currentHour <= 18
          : currentHour >= 18;
    },
    formatTime: function(raw) {
      return this.$moment(raw).format("h:mm A");
    },
  },
  computed: {
    filteredMovies: function() {
      if (this.genre.length === 0 && this.time.length === 0) {
        return this.movies;
      }

      return this.movies
              .filter(this.filterByGenre)
              .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults: function() {
      const what = this.time.concat(this.genre).join(', ');
      return `No results for : ${what}.`;
    }
  },
  components: {
    MovieItem
  }
}
</script>