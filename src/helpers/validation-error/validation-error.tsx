import { ValidationEnum } from "@/constants/enum";

import { AuthBackEndValidation } from "../validation-pattern/login";
import { MainBackValidationError, MainValidation } from "../validation-pattern/main";

import pageStyle from "../../pages/admin/page.module.css";
import loginStyle from "../../pages/auth/login.module.css";
import { IValidationPasswrod } from "@/models";

type AuthErrorType = keyof typeof AuthBackEndValidation;
type MainErrorType = keyof typeof MainBackValidationError;

// export enum BackValidationEnum {
//   AUTHPASSWORD = "err_admin_password_is_wrong",
//   AUTHEMAIL = "err_user_not_exists",
//   PHONE_VALIDATION = "ValidationError"
// }

export const handelValidationError = (
  name: string,
  type: "required" | "pattern" | "minLength" | "language" | undefined | string,
  password?: IValidationPasswrod) => {
  return (
    <>
      {
        type === ValidationEnum.LANGUAGE && (
          <p className={pageStyle.error_message}>{MainValidation[name].language}</p>)
      }
      {
        type === ValidationEnum.REQUIRED && (
          <p className={pageStyle.error_message}>{MainValidation[name]?.requiredText}</p>)
      }
      {type === ValidationEnum.PATTERN && (
        <p className={pageStyle.error_message}>{MainValidation[name].patternText}</p>)}
      {type === ValidationEnum.MINLENGTH && (
        <p className={pageStyle.error_message}>{MainValidation[name].minLenText}</p>)}
      {password && type && (
        <p className={pageStyle.match_error_message}>{MainValidation.confirm.matchText}</p>)}
    </>
  );
}

export const handleBackValidationError = (message: AuthErrorType) => {
  return (
    <>
      {message && AuthBackEndValidation[message] && (
        <div>
          <p className={loginStyle.not_found}>{AuthBackEndValidation[message].text}</p>
        </div>
      )}
    </>
  );
};

export const handleMainValidationError = ((message: MainErrorType) => {
  return (
    <>
      {message && MainBackValidationError[message] && (
        <p className={loginStyle.not_found}>{MainBackValidationError[message].text}</p>
      )}
    </>
  )
})



