import Vue from "vue";
import { addClass, removeClass } from './helpers';

function mouseOverHandler (e) {
  addClass(e.target.nextElementSibling, "tooltip-show");
}
function mouseOutHandler (e) {
  removeClass(e.target.nextElementSibling, "tooltip-show");
}

export default {
  install: function() {
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
  }
}