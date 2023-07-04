## i6 Posters

| Development        | Description
| ----------------   | -------
| `yarn`            | _Install dependencies_
| `npm start`        | _Start application_
| `localhost:3000`   | _localhost testing URL_

| Production         | Description
| ----------------   | -------
| `npm run build`    | _Builds out the /dist assets_


## CI Integration & Hosting

The Poster Configurator is a set of `.html`, `.js`, and `.css` files capable of being
hosted in a file storage system such as [RackSpace Cloud Files](https://www.rackspace.com/cloud/files) or [AWS S3](https://aws.amazon.com/s3/). 

  - This repository is set up to automatically to AWS S3 when pushes are made to the
master branch.
    - You may access the S3 instance at the following URL: 
       - TBD

  - The following environment variables need to be set via [GitLab Secrets](https://git.mindgrub.net/dalb/Versa/settings/ci_cd) for this to work:

        AWS_ACCESS_KEY_ID
        AWS_BUCKET
        AWS_REGION
        AWS_SECRET_ACCESS_KEY

## Misc Notes

This project is based on [React Slingshot](https://github.com/coryhouse/react-slingshot)

## Troubleshooting
- `(FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)`
  - Follow these steps: https://github.com/facebook/react-native/issues/9309#issuecomment-238966924

```bash
# when executing npm start, you're greeted with the following:
｢wdm｣: TypeError: Cannot read property 'map' of undefined
    at /{path}/{project}/node_modules/hard-source-webpack-plugin/index.js:659:12
    at <anonymous>
    at process._tickDomainCallback (internal/process/next_tick.js:228:7)
```
- If you configured your local through `yarn install`, execute `npm i`
  - https://github.com/mzgoddard/hard-source-webpack-plugin/issues/316

- When in doubt, `rm -rf node_modules; npm i`
