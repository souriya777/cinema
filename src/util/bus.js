function checkFilter (category, title, checked) {
  if(checked) {
    this[category].push(title);
  } else {
    this[category] = this[category].filter(item => item !== title);
  }
}

export { checkFilter }