import Vue from "vue";
import "./style.scss";
import genres from './util/genres';

new Vue({
  el: "#app",
  data: {
    time: [],
    genre: []
  },
  methods: {
    checkFilterRoot: function(category, title, checked) {
      if(checked) {
        this[category].push(title);
      } else {
        this[category] = this[category].filter(item => item !== title);
      }
    }
  },
  components: {
    "movie-list": {
      template: `
        <div id="movie-list">
          <div
            class="movie"
            v-for="movie in filteredMovies"
            v-bind:key="movie.title"
          >
            {{ movie.title }}
          </div>
        </div>
      `,
      props: ["genre", "time"],
      data: function() {
        return {
          movies: [
            { title: "Pulp Fiction", genre: genres.ANIMATION },
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
    },
    "movie-filter": {
      data: function() {
        return {
          genres
        }
      },
      methods: {
        parentCheckFilter: function(category, title, checked) {
          this.$emit("check-filter", category, title, checked)
        }
      },
      template: `
        <div id="movie-filter">
          <h2>Filter results</h2>
          <div class="filter-group">
            <check-filter
              v-for="genre in genres"
              v-bind:key="genre"
              v-bind:title="genre"
              v-on:check-filter="parentCheckFilter"
            >
              {{ genre }}
            </check-filter>
          </div>
        </div>
      `,
      components: {
        "check-filter": {
          props: [
            "title"
          ],
          data: function() {
            return {
              checked: false
            }
          },
          methods: {
            checkFilter: function() {
              this.checked = !this.checked;
              this.$emit("check-filter", "genre", this.title, this.checked);
            }
          },
          template: `
            <div 
              :class="{ 'check-filter': true, 'active': checked }
              "@click="checkFilter"
            >
              <span class="checkbox"></span>
              <span class="check-filter-title">{{ title }}</span>
            </div>
          `
        }
      }
    }
  }
});