import FetchBase64 from 'fetch-base64-in-browser';

const fetchRemoteFile = (url) => {
  let b64f = new FetchBase64(url);
  return b64f.fetchAsData();
};

export default fetchRemoteFile;