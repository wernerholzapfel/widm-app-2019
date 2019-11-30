// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyCUxv__-yh5Od8WKj-gELaL8LXPNlxhUzk',
        authDomain: 'molloot-8de9b.firebaseapp.com',
        databaseURL: 'https://molloot-8de9b.firebaseio.com',
        projectId: 'molloot-8de9b',
        storageBucket: 'molloot-8de9b.appspot.com',
        messagingSenderId: '663216627263'
    },
    api: 'http://localhost:3000/api/v1',
    api_domain: 'localhost:3000',
    oneSignal: {
        appId: 'c9e91d07-f6c6-480b-a9ac-8322418085f8',
        // tslint:disable-next-line:max-line-length
        googleProjectNumber: 'molloot-8de9b'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
