const NASA_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

async function getCurrentImage() {
  let result = await performGetRequest(NASA_ENDPOINT);

  // Map json result to NasaImage
  return new NasaImage(
    result.title,
    result.explanation,
    result.url,
    result.hdurl);
}