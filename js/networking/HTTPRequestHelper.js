/**
 * Transform ASYNC ajax request
 * to JS promise for GET request
 *
 * @param requestUrl
 * @returns {Promise<any>}
 */
function performGetRequest(requestUrl) {
  return new Promise(resolve => {
    $.ajax({
      url: requestUrl,
      success: function (result) {
        resolve(result)
      }
    });
  })
}
