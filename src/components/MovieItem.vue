<template>
  <div class="movie">
    <div class="movie-col-left">
      <img v-bind:src="infos.poster">
    </div>
    <div class="movie-col-right">
      <div class="movie-title">
        <h2>{{ infos.title }}</h2>
        <span class="movie-rating">{{ infos.rated }}</span>
      </div>
      <div class="movie-sessions">
        <div 
          class="session-time-wrapper"
          v-for="session in filteredSessions" 
        >
          <div class="session-time">{{ formatTime(session.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import times from '../util/times';

export default {
  props: ["infos", "sessions", "day", "time"],
  methods: {
    formatTime: function(raw) {
      return this.$moment(raw).format("h:mm A");
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
    }
  },
  computed: {
    filteredSessions: function() {
      return this.sessions.filter(this.sessionPassesTimeFilter);
    }
  }
}
</script>