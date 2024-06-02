import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import { LoginThunk, logOutState } from "@/store/slices/auth";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { t } from "i18next";
import { FormControl, Input, Button, Stack, InputGroup, InputRightElement } from '@chakra-ui/react'

import { ILogin } from "@/models/login";
import { loginValidation } from "@/helpers";
import { whiteColor } from "@/helpers/colors";
import { handleBackValidationError, handelValidationError } from "@/helpers/validation-error/validation-error";

import compony_logo from "@assets/icons/sphere_pons_light_logo.svg";
import login_pic from "@assets/pictures/login_pic.png";
import hide_eye from "@assets/icons/eye_hide.png";
import show_eye from "@assets/icons/eye_show.png";
import loginStyle from "./login.module.css";

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ILogin>();
    const { isLoading, isSuccess, validationError } = useAppSelector(state => state.login);

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const onSubmit = (data: ILogin): void => {
        dispatch(LoginThunk(data))
        dispatch(logOutState.clearError())
    }

    useEffect(() => {
        isSuccess && reset()
    }, [isSuccess])

    return (
        <div className={loginStyle.login_container}>
            <div className={loginStyle.mian_container}>
                <div className={loginStyle.main_block}>
                    <div className={loginStyle.right_block_container}>
                        <img className={loginStyle.login_picture} src={login_pic} />
                    </div>
                    <div className={loginStyle.main_form_container}>
                        <div className={loginStyle.logo_container}>
                            <img src={compony_logo} />
                        </div>
                        <div className={loginStyle.text_container}>
                            <p className={loginStyle.short_desc}>Duis tellus aenean id tellus eu ut sit magna magna. At ornare iaculis feugiat nullam morbi ut interdum. </p>
                        </div>
                        <div className={loginStyle.form_container}>

                            {validationError ? handleBackValidationError(validationError) : null}
                            <form onSubmit={handleSubmit(onSubmit)} className={loginStyle.form_container}>
                                <FormControl id="email">
                                    <Input placeholder="Email" type='text'{...register("email", loginValidation.email)} focusBorderColor='rgba(4, 179, 88, 1)' />
                                    <div className={loginStyle.error_message_container}>
                                        <p className={loginStyle.validation_error}>{handelValidationError('email', errors.email?.type)}</p>
                                    </div>
                                </FormControl>
                                <FormControl >
                                    <InputGroup className={loginStyle.password_container}>
                                        <Input placeholder="Password" type={show ? 'text' : 'password'}{...register("password", loginValidation.password)} focusBorderColor='rgba(4, 179, 88, 1)' />
                                        <div className={loginStyle.error_message_container}>
                                            <p className={loginStyle.validation_error}>{handelValidationError('password', errors.password?.type)}</p>
                                        </div>
                                        <InputRightElement width={12} >
                                            <Button className={loginStyle.eye_block} onClick={handleClick}>
                                                {show ? <img src={show_eye} /> : <img src={hide_eye} />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>


                                <Stack direction='row' spacing={4}>
                                    <Button className={loginStyle.login_btn}
                                        bg={'rgba(4, 179, 88, 1)'} color={whiteColor} _hover={{
                                            bg: 'white',
                                            color: "#04B358;",
                                            border: '1px solid rgba(4, 179, 88, 1)'
                                        }}
                                        type="submit"
                                        isLoading={isLoading}
                                        loadingText='Login'
                                        colorScheme='teal'
                                        variant='outline'
                                        spinnerPlacement='end'>
                                        {t("LOGIN.LOGIN")}
                                    </Button>
                                </Stack>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}