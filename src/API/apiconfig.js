const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: 'fe20e689123b4418f7c51de6dda8db5c', // key để cho phép truy cập vào các api
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}
export default apiConfig

//tạo api config để chứa những thông tin cần thiết.