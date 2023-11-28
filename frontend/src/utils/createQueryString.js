/**
 * Creates a query string from an object.
 * @param {Object} params - The parameters to convert into a query string.
 * @returns {string} The created query string.
 */
function createQueryString(params) {
  const searchParams = new URLSearchParams(params);
  return `?${searchParams.toString()}`;
}

export default createQueryString;
