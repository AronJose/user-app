
const env = {

    development: {
        api: "http://localhost:8080/api",
        google_client_id: "864826191326-oe772clsl3e4929sem84gr0a3jq68nvq.apps.googleusercontent.com",
        fb_app_id: "866107041888313",
        instagram_client_id: "334705815815196",
        redirect_URI: "https://localhost:3000/",
        client_secret: "61e4fc32c9b8307dbffd4ca814cdda0a"
    },
};

const all = {
    routes: {
        users: "users",
        login: "users/login",
        fileUpload: "users/img",
        google: "users/googleLogin",
        fb: "users/facebookLogin",
        instagram: "users/instagramLogin"
    }
}
console.log("process.env.NODE_ENV", process.env.REACT_APP_ENV)
const config = {
    ...all,
    ...env[process.env.REACT_APP_ENV || "development"],
}


export default config;
