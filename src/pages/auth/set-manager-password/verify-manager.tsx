import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { t } from "i18next";
import Cookies from 'universal-cookie';
import { logOutState, setPasswordThunk } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

import { IChangePassForm } from "@/models";
import { whiteColor } from "@/helpers/colors";
import { AlertMessageEnum, CommonEnum } from "@/constants";
import { AlertMessage, MainValidation, handleMainValidationError, handelValidationError } from "@/helpers";

import set_password_pic from "@assets/pictures/set-password.png";
import compony_logo from "@assets/icons/sphere_pons_light_logo.svg";
import hide_eye from "@assets/icons/eye_hide.png";
import show_eye from "@assets/icons/eye_show.png";

import loginStyle from "../../auth/login.module.css";
import verifyStyle from "./verify-manager.module.css";

export const VerifyManager = () => {
    const cookies = new Cookies();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IChangePassForm>();
    const { setPasswordIsLoading, setPasswordIsSuccess, setPasswordError } = useAppSelector(state => state.login);
    const [show, setShow] = useState(false);
    const [newPasshow, setNewPassShow] = useState(false);
    const [matchshow, setMatchShow] = useState(false);
    const [password, confirm] = watch(['newPassword', 'confirm']);

    const onSubmit = (data: IChangePassForm): void => {
        console.log(data)
        const { newPassword, currentPassword } = data;
        dispatch(setPasswordThunk({ currentPassword, newPassword } as any)).then(() => {
            cookies.remove(CommonEnum.ISTEMPORARY);
            dispatch(logOutState.resetIsTemprorary())
            dispatch(logOutState.setPasswordLoading())
            dispatch(logOutState.setPasswordSuccess())
        })
    }

    useEffect(() => {
        dispatch(logOutState.setPasswordLoading());
        dispatch(logOutState.setPasswordSuccess());

    }, [setPasswordIsSuccess, setPasswordError])

    useEffect(() => {
        return () => {
            dispatch(logOutState.resetErrorSetPassword())
        }
    }, [])

    return (
        <div className={loginStyle.login_container}>
            <div className={loginStyle.mian_container}>
                <div className={loginStyle.main_block}>
                    <div className={loginStyle.right_block_container}>
                        <img className={loginStyle.login_picture} src={set_password_pic} />
                    </div>
                    <div className={loginStyle.main_form_container}>
                        <div className={loginStyle.logo_container}>
                            <img src={compony_logo} />
                        </div>
                        <div className={loginStyle.text_container}>
                            <p className={loginStyle.short_desc}>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                        </div>
                        <div className={loginStyle.form_container}>
                            {setPasswordError ? handleMainValidationError(setPasswordError) : null}
                            <p className={verifyStyle.set_password_text}>{t("VERIFY_PASSWORD.SET_PASSWORD")}</p>
                            <hr></hr>
                            <div className={verifyStyle.set_pass_container}>
                                {setPasswordIsSuccess && <AlertMessage status={AlertMessageEnum.SUCCESS_STATUS} text={AlertMessageEnum.SUCCESS_TEXT} />}
                                <form onSubmit={handleSubmit(onSubmit)} className={verifyStyle.form_container}>
                                    {/* {changePasswordError && <p className={pageStyle.add_error_message}>{t(`BACKVALIDATION.${changePasswordError}`)}</p>} */}
                                    <FormControl id="currentPassword" className={verifyStyle.title_input_block}>
                                        <InputGroup className={loginStyle.password_container}>
                                            <Input placeholder={t("MANAGER.CURRENTPASSWORD")} type={show ? 'text' : 'password'}{...register("currentPassword", MainValidation.currentPassword)}
                                                focusBorderColor='rgba(4, 179, 88, 1)'
                                                onPaste={e => {
                                                    e.preventDefault()
                                                    return false
                                                }} />
                                            <div className={verifyStyle.pass_error_message_container}>
                                                {handelValidationError('currentPassword', errors.currentPassword?.type)}
                                            </div>
                                            <InputRightElement width={12} >
                                                <Button className={loginStyle.eye_block_current_pass} onClick={()=>setShow(!show)}>
                                                    {show ? <img src={show_eye} /> : <img src={hide_eye} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="newPassword" className={verifyStyle.title_input_block}>
                                        <InputGroup className={loginStyle.password_container}>
                                            <Input className={verifyStyle.password_input} placeholder={t("MANAGER.PASSWORD")} type={newPasshow ? 'text' : 'password'}{...register("newPassword", MainValidation.password)}
                                                focusBorderColor='rgba(4, 179, 88, 1)'
                                                onPaste={e => {
                                                    e.preventDefault()
                                                    return false
                                                }} />
                                            <div className={verifyStyle.error_message_container}>
                                                {handelValidationError('newPassword', errors.newPassword?.type)}
                                            </div>
                                            <InputRightElement width={12} className={verifyStyle.new_pass_eye} >
                                                <Button className={loginStyle.eye_block_new_pass} onClick={() => setNewPassShow(!newPasshow)}>
                                                    {show ? <img src={show_eye} /> : <img src={hide_eye} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>

                                    <FormControl id="Confirm_password" className={verifyStyle.title_input_block} style={{ marginTop: "25px" }}>
                                        <InputGroup className={loginStyle.password_container}>
                                            <Input className={verifyStyle.password_input} placeholder={t("MANAGER.CONFIRM_PASS")} type={matchshow ? 'text' : 'password'}{...register("confirm", {
                                                validate: (value) => value === watch('newPassword', '') || 'Passwords do not match'
                                            })}
                                                focusBorderColor='rgba(4, 179, 88, 1)'
                                                onPaste={e => {
                                                    e.preventDefault()
                                                    return false
                                                }} />
                                            <div className={verifyStyle.error_message_container}>
                                                {handelValidationError('confirm', errors.confirm?.message, { password: password, confirm: confirm })}
                                            </div>
                                            <InputRightElement width={12} className={verifyStyle.match_pass_eye} >
                                                <Button className={loginStyle.eye_block_match_pass} onClick={() => setMatchShow(!matchshow)}>
                                                    {show ? <img src={show_eye} /> : <img src={hide_eye} />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Button className={loginStyle.login_btn}
                                        bg={'rgba(4, 179, 88, 1)'} color={whiteColor} _hover={{
                                            bg: 'white',
                                            color: "#04B358;",
                                            border: '1px solid rgba(4, 179, 88, 1)'
                                        }}
                                        type="submit"
                                        isLoading={setPasswordIsLoading}
                                        loadingText='Login'
                                        colorScheme='teal'
                                        variant='outline'
                                        spinnerPlacement='end'>
                                        {t("LOGIN.RESET-PASSWORD")}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}