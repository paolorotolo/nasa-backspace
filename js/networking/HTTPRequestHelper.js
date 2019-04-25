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
