function createQueryString(params) {
  const searchParams = new URLSearchParams(params);
  return `?${searchParams.toString()}`;
}

export default createQueryString;
