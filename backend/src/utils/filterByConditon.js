function filterByCondition(array, condition) {
  return array.filter((item) => condition(item));
}

module.exports = filterByCondition;
