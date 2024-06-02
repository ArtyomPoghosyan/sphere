import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { changePasswordThunk, handleManagerstate } from "@/store";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import { AlertMessageEnum } from "@/constants";
import { MainValidation } from "@/helpers";
import { AlertMessage } from "@/helpers/alert/alert-message";
import { handelValidationError } from "@/helpers/validation-error/validation-error";
import { IChangePassForm, ICommonState, IManagerState } from "@/models/table";

import pageStyle from "../page.module.css"

export const ChangePassword: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<IChangePassForm>();
    const { changePasswordSuccess, changePasswordLoading,changePasswordError }: IManagerState = useAppSelector((state: ICommonState) => state.manager)
    const [password, confirm] = watch(['password', 'confirm'])

    useEffect(() => {
        dispatch(handleManagerstate.setChangeSuccess())
        dispatch(handleManagerstate.setChangePassLoading())
    }, [changePasswordSuccess,changePasswordError])

    useEffect(() => {
        dispatch(handleManagerstate.setUpdateError())
    }, [])

    const onSubmit = (data: IChangePassForm): void => {
        if (password == confirm) {
            const password = data.password
            dispatch(changePasswordThunk({ id, password }))
            reset()
        }
    }

    useEffect(()=>{
        return ()=>{
            dispatch(handleManagerstate.setChangePassLoading())
            dispatch(handleManagerstate.setChangePassError())
        }
    },[])

    return (
        <div className={pageStyle.change_pass_container}>
           {changePasswordSuccess  && <AlertMessage status={AlertMessageEnum.SUCCESS_STATUS  } text={AlertMessageEnum.SUCCESS_TEXT}/>}
            <form onSubmit={handleSubmit(onSubmit)} className={pageStyle.form_container}>
                {changePasswordError && <p className={pageStyle.add_error_message}>{t(`BACKVALIDATION.${changePasswordError}`)}</p>}
                <FormControl id="password">
                    <FormLabel className={pageStyle.change_pass_labels}> {t("MANAGER.PASSWORD")} *</FormLabel>
                    <Input autoComplete='off' placeholder={t("MANAGER.PASSWORD")} type='text'{...register("password", MainValidation.password)}
                        focusBorderColor='rgba(4, 179, 88, 1)' onPaste={e => {
                            e.preventDefault()
                            return false
                        }} />
                    <div className={pageStyle.pass_error_message_container}>
                        {handelValidationError('password', errors.password?.type)}
                    </div>
                </FormControl>

                <FormControl id="Confirm_password">
                    <FormLabel className={pageStyle.change_pass_labels}>{t("MANAGER.CONFIRM_PASS")} *</FormLabel>
                    <Input autoComplete='off' placeholder={t("MANAGER.CONFIRM_PASS")} type='text'{...register("confirm", {
                        validate: (value) => value === watch('password', '') || 'Passwords do not match'
                    })}
                    onPaste={e => {
                        e.preventDefault()
                        return false
                    }} focusBorderColor='rgba(4, 179, 88, 1)' />
                    <div className={pageStyle.error_message_container}>
                        {handelValidationError('confirm', errors.confirm?.message, { password: password, confirm: confirm })}
                    </div>
                </FormControl>
                <Button className={pageStyle.add_btn}
                    bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{
                        bg: 'white',
                        color: "green",
                        border: '1px solid rgba(4, 179, 88, 1)'
                    }}
                    type="submit"
                    loadingText='Update'
                    colorScheme='teal'
                    variant='outline'
                    spinnerPlacement='end'
                    isLoading={changePasswordLoading}>
                    {t("MANAGER.UPDATE")}
                </Button>
            </form>
        </div>
    )
}