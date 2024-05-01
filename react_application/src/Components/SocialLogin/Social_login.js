import React, { useState, useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin } from '@leecheuk/react-google-login'
import { InstagramLogin } from '@amraneze/react-instagram-login';
import FontAwesome from "react-fontawesome";
import Google from '../../Assets/google.png'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router-dom"
import config from "../../config/index"


function SocilLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/signup") {
            setIsSignup(true)
        }
    }, [])

    const handleSocialLogin = async (socialLoginFunction, navigatePath) => {
        console.log(navigatePath, "/home");
        console.log(socialLoginFunction, "function social login");
        const SocialLoginResponse = await socialLoginFunction();
        if (SocialLoginResponse) {
            navigate(navigatePath);
        }
    };

    // ------------------------------------------------ Google Login -------------------------------------
    const responseGoogle = async (res) => {
        const GoogleLogin = await dispatch.Auth.loginGoogle(res);
        handleSocialLogin(() => GoogleLogin, '/home');
    };

    // ----------------------------------------------- Facebook Login --------------------------------------

    const responseFacebook = (res) => {
        const facebookLogin = dispatch.Auth.fbLogin({ userId: res.userID, accessToken: res.accessToken })
        handleSocialLogin(() => facebookLogin, '/home');
    };
    // -------------------------------------Instagram Login --------------------------------------------------
    const responseInstagram = (res) => {
        const instagramLogin = dispatch.Auth.InstaLogin({ code: res })
        handleSocialLogin(() => instagramLogin, '/home');
    };

    return (
        <div className={isSignup ? 'flex flex-row space-x-2' : "space-y-4"}>
            <div>
                <GoogleLogin
                    clientId={config.google_client_id}
                    redirectUri={config.redirect_URI}
                    onSuccess={responseGoogle}
                    icon={false}
                    className={isSignup ? "!bg-black text-white !rounded-full !h-[40px] !w-[110px]" : "!bg-black text-white  !px-[35px] py-2 !rounded-full !h-[40px] !w-[300px]"}
                    cookiePolicy={'single_host_origin'}>
                    <div className={isSignup ? 'flex items-center' : "flex items-center px-4"}>
                        <img src={Google} className="h-[20px] w-[20px] " />
                        <p className="p-2">{isSignup ? 'Google' : 'Login with Google'}</p>
                    </div>
                </GoogleLogin>
            </div>

            <div>
                <FacebookLogin
                    appId={config.fb_app_id}
                    autoLoad={false}
                    size="small"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon="fa-facebook p-2 "
                    cssClass={isSignup ? 'bg-blue-500 text-white w-[100px] rounded-full h-[40px] hover:bg-blue-600' : 'bg-blue-500 text-white w-[300px] rounded-full h-[40px] hover:bg-blue-600'}
                    textButton={isSignup ? 'facebook' : "Login with facebook"}
                >
                </FacebookLogin>
            </div>
            <div>
                <InstagramLogin
                    clientId={config.instagram_client_id}
                    redirectUri={config.redirect_URI}
                    response_type="code"
                    clientSecret={config.client_secret}
                    onSuccess={responseInstagram}
                    onFailure={responseInstagram}

                    cssClass={isSignup ? 'rounded-full !bg-red-500 text-white w-[110px] h-[40px] hover:bg-red-700' : 'rounded-full bg-red-500 text-white w-[300px] h-[40px] hover:bg-red-700'}>
                    <FontAwesome name="instagram" />
                    <span>{isSignup ? ' Instagram' : 'Login with Instagram'}</span>
                </InstagramLogin>
            </div>
        </div>
    )
}

export default SocilLogin



