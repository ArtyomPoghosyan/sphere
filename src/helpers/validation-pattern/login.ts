export const loginValidation = {
    email: {
        required: true,
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
        patternText: "Invalid email address",
        text: "Please enter your email"

    },
    password: {
        required: true,
        minLenText: "Password must contain min 4 symbols",
        text: "Please enter your password",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_=+@$!%*#?&,.])[A-Za-z\d@_=+$!%*#?&,.]{8,50}$/,
        patternText: "Must containe letter,number,symbol"
    },
}

export const AuthBackEndValidation = {
    err_admin_password_is_wrong:{
        text:"Password is wrong"
    },
    err_user_not_exists:{
        text:"User is not found"
    },
    err_manager_password_is_wrong:{
        text:"Password is wrong"
    }
}

