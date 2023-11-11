function createQueryString(params) {
  const searchParams = new URLSearchParams(params);

  const stringParams = searchParams.toString()
  if (stringParams.length === 0) {
    return '';
  } else {
    return `?${searchParams.toString()}`;
  }
}

module.exports = createQueryString;
