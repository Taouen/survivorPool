/**
 * API Helper utilities to reduce duplication in API endpoints
 */

/**
 * Create batch update requests for Sanity Client
 * @param {Array} items - Array of items to update
 * @param {Function} updateFn - Function that takes an item and returns a Client patch builder
 * @returns {Array} Array of promises from Sanity Client commits
 */
export function createBatchRequests(items, updateFn) {
  return items.map(updateFn);
}

/**
 * Execute batch requests and handle errors
 * @param {Array} requests - Array of promises to execute
 * @returns {Promise} Promise that resolves when all requests complete
 */
export async function executeBatchRequests(requests) {
  return Promise.all(requests);
}

/**
 * Send successful API response
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {*} result - Optional result data
 * @param {number} statusCode - HTTP status code (default 200)
 */
export function sendSuccessResponse(
  res,
  message,
  result = null,
  statusCode = 200,
) {
  const response = { success: true, message };
  if (result !== null) {
    response.result = result;
  }
  res.status(statusCode).json(response);
}

/**
 * Send error API response
 * @param {Object} res - Express response object
 * @param {string|Error} error - Error message or Error object
 * @param {number} statusCode - HTTP status code (default 500)
 */
export function sendErrorResponse(res, error, statusCode = 500) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
}

/**
 * Wrapper to handle common API endpoint pattern
 * @param {Array} items - Items to update
 * @param {Function} updateFn - Function to create update request for each item
 * @param {Array} successMessages - Optional array of success messages to log (parallel to items)
 * @returns {Object} Object with requests array and success message
 */
export function createUpdateRequests(items, updateFn, successMessages = null) {
  const requests = items.map((item, index) => {
    const promise = updateFn(item);
    if (successMessages && successMessages[index]) {
      return promise
        .then((result) => {
          console.log(successMessages[index]);
          return result;
        })
        .catch((err) => {
          console.error(`Error with ${successMessages[index]}: ${err}`);
          throw err;
        });
    }
    return promise;
  });

  return requests;
}
