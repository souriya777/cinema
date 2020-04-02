function checkFilter (category, title, checked) {
  if(checked) {
    this[category].push(title);
  } else {
    this[category] = this[category].filter(item => item !== title);
  }
}

function setDay(day) {
  this.day = day;
}

export { checkFilter, setDay }