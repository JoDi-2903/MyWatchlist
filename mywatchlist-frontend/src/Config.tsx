export const backendURL = 'https://mywatchlist-backend.server-welt.com/api/v1/mywatchlist'
//export const backendURL = 'http://localhost:8080/api/v1/mywatchlist'

export const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '5221e1317dbf91f51363a72bc6c98904',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    trailer: (vidPath) => `https://www.youtube.com/watch?v=${vidPath}`
}
