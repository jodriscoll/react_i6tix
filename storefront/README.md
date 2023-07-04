### Local server
- Install `http-server` globally using `npm`
  - `npm i -g http-server`
- `cd` into the directory and execute `http-server -a localhost -p 3000 -c-1`

### Local editing
- `npm i` then `gulp` and view the `http-server` instance

### Why?
- In order to pass `localStorage` data between this static app and the React builder, they'll need to [share the same protocol and port](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript)
- When the static `index.html` file is placed on a web server, you will not be required to utilize `http-server` as serving the file from `/` and then serving the React app from `/engine/` will suffice the `localStorage` requirements
