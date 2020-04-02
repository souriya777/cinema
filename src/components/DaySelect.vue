<template>
  <div id="day-select">
    <ul class="days">
      <li 
        :class="{ day: true, active: isActive(day) }"
        v-for="day in days"
        @click="selected = day"
      >
        {{ humanDate(day) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      selected: this.$moment(),
      days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, "days"))
    }
  },
  methods: {
    humanDate: function(moment) {
      if (moment.isSame(this.$moment(), "day")) {
        return "Today";
      }

      return moment.format("ddd DD/MM");
    },
    isActive: function(day) {
      return day.isSame(this.selected, "day");
    }
  }
}
</script>