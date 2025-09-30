function getYouTubeVideoId(url) {
  if (!url) return null;

  const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|vi|e(?:mbed|live)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);

  return match ? match[1] : null;
}

export default getYouTubeVideoId;