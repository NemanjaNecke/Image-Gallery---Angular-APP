// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export enum ApiPaths {
  Getall = 'images/',
  Getcategory = 'categories/',
  GetImagesByCategory = 'category-image/',
  Getuser = 'users/',
  Getprofile = 'profiles/',
  Getprofilepic = 'profile-pic/',
  Getprofilepicprof = 'profile-pic-profile/',
}

export enum RegistrationPaths {
  registration = 'auth/registration/'
}

export enum LoginPaths {
  login = 'auth/login/',
  logout = 'auth/logout/',
  verifyToken = 'auth/token/verify/',
  refreshToken = 'auth/token/refresh/',
  refreshPass = 'auth/password/change/'
}
export const environment = {
  production: true,
  baseUrl: 'http://127.0.0.1:8000/' , 
  apiKey: 'c4af9c51-c99e-49ab-96e4-092c66e37a82',
  apipaths: ApiPaths,
  registrationpaths: RegistrationPaths,
  loginpaths: LoginPaths
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
