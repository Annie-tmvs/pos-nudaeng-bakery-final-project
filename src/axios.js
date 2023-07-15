import axios from "axios"


axios.defaults.baseURL = 'https://2767-115-84-114-134.ngrok-free.app/api/';
// console.log('here axios')
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

// axios.defaults.headers.common['ngrok-skip-browser-warning'] = true
// axios.defaults.headers.common =  "ngrok-skip-browser-warning": true
// const options = ;
// axios.defaults.headers.common =    {
    // axios.request.common( {
    //     headers: {"ngrok-skip-browser-warning": true}
    // })
//     "ngrok-skip-browser-warning" :  true
// }

// console.log(localStorage.getItem('token'))

