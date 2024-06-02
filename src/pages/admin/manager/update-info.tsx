import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { currentManagerThunk, handleManagerstate, updateManagerThunk } from "@/store";

import { MainValidation } from "@/helpers";
import { AlertMessage } from "@/helpers/alert/alert-message";
import { getChangedValues } from "@/helpers/change-field/changed-fields";
import { handelValidationError } from "@/helpers/validation-error/validation-error";
import { ICommonState, IManagerData, IManagerFormData, IManagerState } from "@/models/table";

import pageStyle from "../page.module.css"
import { AlertMessageEnum } from "@/constants";

export const UpdateInfo: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate=useNavigate()
    const [isDisabled, setISDisabled] = useState(true);
    const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, setValue } = useForm<IManagerFormData>();
    const { editManagerData, updateManagerError,
        updateManagerSuccess, updateManagerLoading }: IManagerState = useAppSelector((state: ICommonState) => state.manager)

    useEffect(() => {
        isDirty ? setISDisabled(false) : setISDisabled(true)
    }, [isDirty])

    useEffect(() => {
        if (!editManagerData.length && !updateManagerError.errors?.length) {
            dispatch(currentManagerThunk(id))
        }
    }, []);

    useEffect(() => {
        if (updateManagerSuccess) {
            navigate("/managers")
            dispatch(handleManagerstate.setUpdateSuccess())
            dispatch(handleManagerstate.setUpdateError())
        }
    }, [updateManagerSuccess]);

    useEffect(() => {
        if (editManagerData && !updateManagerError.errors?.length) {
            const { name, lastName, email, phone } = editManagerData satisfies IManagerData;
            setValue("name", name)
            setValue("lastName", lastName)
            setValue("email", email)
            setValue("phone", phone)
        }
    }, [editManagerData])

    const onSubmit = (data: IManagerFormData): void => {
        const changedVals = getChangedValues(dirtyFields, data);
        console.log(changedVals, "changedVals")
        dispatch(updateManagerThunk({ id, changedVals } as any));
    }

    useEffect(() => {
        if (updateManagerError) {
            dispatch(handleManagerstate.setUpdateError())
        }
        return () => {
            dispatch(handleManagerstate.setUpdateError())
        }
    }, [])

    return (
        <div className={pageStyle.update_container}>
            {updateManagerSuccess && <AlertMessage status={AlertMessageEnum.SUCCESS_STATUS} text={AlertMessageEnum.SUCCESS_TEXT} />}
            <form onSubmit={handleSubmit(onSubmit)} className={pageStyle.form_container}>
                {updateManagerError?.errors?.[0] && <p className={pageStyle.add_error_message}>{t(`BACKVALIDATION.${updateManagerError?.errors?.[0].message}`)}</p>}
                <FormControl id="first_name" >
                    <FormLabel className={pageStyle.update_info_lables}>{t("MANAGER.FIRST_NAME")} *</FormLabel>
                    <Input autoComplete='off' placeholder={t("MANAGER.FIRST_NAME")} type='text'{...register("name", MainValidation.name)}
                        focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setUpdateError())} />
                    <div className={pageStyle.error_message_container}>
                        {handelValidationError('name', errors.name?.type)}
                    </div>
                </FormControl>
                <FormControl id="LAST_name">
                    <FormLabel className={pageStyle.update_info_lables}>{t("MANAGER.LAST_NAME")} *</FormLabel>
                    <Input autoComplete='off' placeholder={t("MANAGER.LAST_NAME")} type='text'{...register("lastName", MainValidation.lastName)}
                        focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setUpdateError())} />
                    <div className={pageStyle.error_message_container}>
                        {handelValidationError('lastName', errors.lastName?.type)}
                    </div>
                </FormControl>
                <FormControl id="email">
                    <FormLabel className={pageStyle.update_info_lables}>{t("MANAGER.EMAIL")} *</FormLabel >
                    <Input autoComplete='off' placeholder={t("MANAGER.EMAIL")} type='email'{...register("email", MainValidation.email)}
                        focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setUpdateError())} />
                    <div className={pageStyle.error_message_container}>
                        {handelValidationError('email', errors.email?.type)}
                    </div>
                </FormControl>
                <FormControl id="phone">
                    <FormLabel className={pageStyle.update_info_lables}>{t("MANAGER.PHONE")} *</FormLabel>
                    <Input autoComplete='off' placeholder={t("MANAGER.PHONE_NUMBER")} type='text'{...register("phone", MainValidation.phone)}
                        focusBorderColor='rgba(4, 179, 88, 1)' onFocus={() => dispatch(handleManagerstate.setUpdateError())} />
                    <div className={pageStyle.error_message_container}>
                        {handelValidationError('phone', errors.phone?.type)}
                    </div>
                </FormControl>
                <Button className={pageStyle.update_info_add_btn}
                    bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{
                        bg: 'white',
                        color: "green",
                        border: '1px solid rgba(4, 179, 88, 1)'
                    }}
                    type="submit"
                    loadingText='Login'
                    colorScheme='teal'
                    variant='outline'
                    spinnerPlacement='end'
                    isLoading={updateManagerLoading}
                    isDisabled={isDisabled}
                >
                    {t("MANAGER.UPDATE")}
                </Button>
            </form>
        </div>
    )
}