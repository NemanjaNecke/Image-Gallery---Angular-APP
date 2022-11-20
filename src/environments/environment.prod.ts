
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
  baseUrl: 'https://nemanjacone.pythonanywhere.com/', 
  apiKey: 'c4af9c51-c99e-49ab-96e4-092c66e37a82',
  apipaths: ApiPaths,
  registrationpaths: RegistrationPaths,
  loginpaths: LoginPaths
};
