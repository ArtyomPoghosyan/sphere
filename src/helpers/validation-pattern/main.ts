import * as yup from 'yup';

export const MainValidation: any = {
    name: {
        required: true,
        minLength: 3,
        requiredText: "First name is required",
        minLenText: "First name must contain min 3 symbols",
        patternText: "Please use letters,with no leading,trailing spaces.",
        // pattern: /^(?<![\s-])[^\s-]+(?:[ -]+[^\s-]+)*(?![\s-])$/
        pattern: /^[a-zA-Z]+(-?[a-zA-Z]+)*[a-zA-Z]*$/
    },
    lastName: {
        required: true,
        minLength: 3,
        requiredText: "Last name is required",
        minLenText: "Last name must contain min 3 symbols",
        patternText: "Please use letters,with no leading,trailing spaces.",
        pattern: /^[a-zA-Z]+(-?[a-zA-Z]+)*[a-zA-Z]*$/
    },
    email: {
        required: true,
        // pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.) +[a-zA-Z]{2,}))$/i,
        pattern: /^[\w-\.]+@([a-zA-Z]+\.)+[a-zA-Z]{2,4}$/i,
        patternText: "Invalid email address",
        requiredText: "Email is required",
    },
    phone: {
        required: true,
        // pattern: /^\+[0-9]{1,3}([0-9]{10})$/i,
        pattern: /^\+374[0-9]{8}$/,
        requiredText: "Phone number is required",
        patternText: "Invalid phone number"
    },
    password: {
        required: true,
        requiredText: "Password is required",
        minLenText: "Password must contain min 4 symbols",
        text: "Please enter your password",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_=+@$!%*#?&,.])[A-Za-z\d@_=+$!%*#?&,.]{8,50}$/,
        patternText: "Must containe min 8 charachters,only english uppercase,lowercase letters,number and symbol"
    },
    currentPassword: {
        required: true,
        requiredText: "Current password is required",
        minLenText: "Current password must contain min 4 symbols",
        text: "Please enter your password",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_=+@$!%*#?&,.])[A-Za-z\d-@_=+$!%*#?&,.]{8,50}$/,
        patternText: "Must containe min 8 charachters,only english uppercase,lowercase letters,number and symbol"
    },
    newPassword: {
        required: true,
        requiredText: "New password is required",
        minLenText: "New password must contain min 4 symbols",
        text: "Please enter your password",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_=+@$!%*#?&,.])[A-Za-z\d-@_=+$!%*#?&,.]{8,50}$/,
        patternText: "Must containe min 8 charachters,only english uppercase,lowercase letters,number and symbol"
    },
    confirm: {
        required: true,
        requiredText: "Confirm-password is required",
        matchText: "Passwords do not match",
    },
    answer: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    title: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    enTitle: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    rusTitle: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    armContent: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    rusContent: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    enContent: {
        required: true,
        requiredText: "This field is required",
        pattern: /^[^\s].*$/i,
        patternText: "Please enter text without leading spaces"
    },
    file: {
        required: true,
        requiredText: "Image is required",
    }
}

export const MainBackValidationError = {
    ValidationError: {
        text: "Something went wrong"
    },
    err_manager_already_exists: {
        text: "Manager already exist"
    },
    "Internal server error": {
        text: "Something went wrong"
    },
    "err_phone_is_phone":{
        text:"Phone number is invalid"
    },
    err_password_matches:{
        text:"Password"
    },
    err_manager_password_is_wrong:{
        text:"Current password is invalid"
    },
    err_password_is_equal_previous:{
        text:"New password matches current password"
    }
}

 export const titleValidationRules = {
    required: 'This field is required',
    pattern: {
      value: /^[^\s].*$/i,
      message: 'Please enter text without leading spaces',
    },
  };

export  const validationSchema = yup.object().shape({
    title: yup.string().required(titleValidationRules.required).matches(titleValidationRules.pattern.value, titleValidationRules.pattern.message),
    content: yup.string().required(titleValidationRules.required).matches(titleValidationRules.pattern.value, titleValidationRules.pattern.message),
        
        
  });
