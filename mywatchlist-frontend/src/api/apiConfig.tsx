const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '5221e1317dbf91f51363a72bc6c98904',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;