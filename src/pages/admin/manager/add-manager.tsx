import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { t } from 'i18next';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { addManagerThunk, handleManagerstate } from '@/store/slices/manager';

import { AlertMessage } from '@/helpers/alert/alert-message';
import { MainValidation } from '@/helpers/validation-pattern/main';
import { ICommonState, IManagerFormData, IManagerState } from '@/models/table';
import { handleMainValidationError, handelValidationError } from '@/helpers/validation-error/validation-error';

import pageStyle from "../page.module.css";
import { AlertMessageEnum } from '@/constants';

export const AddManager: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<IManagerFormData>();
    const { addManagerError, addManagerLoading, addManagerSuccess }: IManagerState = useAppSelector((state: ICommonState) => state.manager);


    const onSubmit = (data: IManagerFormData): void => {
        dispatch(addManagerThunk(data))
    }

    useEffect(() => {
        if (addManagerSuccess) {
            navigate(-1)
            dispatch(handleManagerstate.setAddSuccess())
        }
    }, [addManagerSuccess])

    useEffect(() => {
        dispatch(handleManagerstate.setAddError())
        dispatch(handleManagerstate.setLoadingError())
    }, [])

    return (
        <>
        
            {addManagerSuccess && <AlertMessage status={AlertMessageEnum.SUCCESS_STATUS} text={AlertMessageEnum.SUCCESS_TEXT} />}
            <h1 onClick={() => navigate(-1)} className={pageStyle.add_manager_page_title}>{t("PAGETITLE.ADD_MANAGER")}</h1>
            <div className={pageStyle.add_manager_main_container}>
                <form onSubmit={handleSubmit(onSubmit)} className={pageStyle.form_container}>
                    {addManagerError?.message && <p className={pageStyle.add_error_message}>
                        {t(`BACKVALIDATION.${addManagerError?.errors?.[0].message ? addManagerError?.errors?.[0].message : addManagerError.message}`)}</p>}
                    {/* {t(`BACKVALIDATION.${addManagerError?.errors?.[0].message?handleMainValidationError("err_password_matches") :addManagerError.message}`)}</p>}  */}
                    {addManagerError && handleMainValidationError(addManagerError satisfies IManagerState)}
                    <FormControl id="first_name" >
                        <FormLabel className={pageStyle.input_label}>{t("MANAGER.FIRST_NAME")} *</FormLabel>
                        <Input autoComplete='off' placeholder={t("MANAGER.FIRST_NAME")} type='text'{...register("name", MainValidation.name)}
                            focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setAddError())} />
                        <div className={pageStyle.error_message_container}>
                            {handelValidationError('name', errors.name?.type)}
                        </div>
                    </FormControl>
                    <FormControl id="LAST_name">
                        <FormLabel className={pageStyle.input_label}>{t("MANAGER.LAST_NAME")} *</FormLabel>
                        <Input autoComplete='off' placeholder={t("MANAGER.LAST_NAME")} type='text'{...register("lastName", MainValidation.lastName)}
                            focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setAddError())} />
                        <div className={pageStyle.error_message_container}>
                            {handelValidationError('lastName', errors.lastName?.type)}
                        </div>
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel className={pageStyle.input_label}>{t("MANAGER.EMAIL")} *</FormLabel >
                        <Input autoComplete='off' placeholder={t("MANAGER.EMAIL")} type='email'{...register("email", MainValidation.email)}
                            focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setAddError())} />
                        <div className={pageStyle.error_message_container}>
                            {handelValidationError('email', errors.email?.type)}
                        </div>
                    </FormControl>
                    <FormControl id="phone">
                        <FormLabel className={pageStyle.input_label}>{t("MANAGER.PHONE")} *</FormLabel>
                        <Input autoComplete='off' placeholder={t("MANAGER.PHONE_NUMBER")} type='text'{...register("phone", MainValidation.phone)}
                            focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setAddError())} />
                        <div className={pageStyle.error_message_container}>
                            {handelValidationError('phone', errors.phone?.type)}
                        </div>
                    </FormControl>
                    <FormControl >
                        <FormLabel className={pageStyle.input_label}>{t("MANAGER.PASSWORD")} *</FormLabel>
                        <Input autoComplete='off' placeholder={t("MANAGER.PASSWORD")} type='text'{...register("password", MainValidation.password)}
                            focusBorderColor='rgba(4, 179, 88, 1)' onPaste={e => {
                                e.preventDefault()
                                return false
                            }} />
                        <div className={pageStyle.error_message_container}>
                            {handelValidationError('password', errors.password?.type)}
                        </div>
                    </FormControl>
                    <Button className={pageStyle.add_manager_btn}
                        bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{
                            bg: 'white',
                            color: "green",
                            border: '1px solid rgba(4, 179, 88, 1)'
                        }}
                        type="submit"
                        isLoading={addManagerLoading}
                        loadingText='Submit'
                        colorScheme='teal'
                        variant='outline'
                        spinnerPlacement='end'>
                        {t("COMMON.SUBMIT")}
                    </Button>
                </form>
            </div>
        </>
    )
}