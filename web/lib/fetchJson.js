export default async function fetchJson(input, init) {
  const response = await fetch(input, init);

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  if (response.ok) {
    return data;
  }

  throw new Error(response);
}

/**
 * POST JSON data to an endpoint
 * @param {string} endpoint - API endpoint URL
 * @param {Object} data - Data to POST
 * @returns {Promise} Response data
 */
export async function postJson(endpoint, data) {
  return fetchJson(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * POST JSON with built-in success and error handling
 * @param {string} endpoint - API endpoint URL
 * @param {Object} data - Data to POST
 * @param {Function} onSuccess - Callback on success
 * @param {Function} onError - Callback on error
 * @returns {Promise} Promise that resolves when fetch completes
 */
export async function postJsonWithHandling(endpoint, data, onSuccess, onError) {
  try {
    const result = await postJson(endpoint, data);
    onSuccess?.(result);
    return result;
  } catch (err) {
    console.error(err);
    onError?.(err);
    throw err;
  }
}
