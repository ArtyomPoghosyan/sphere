import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from 'dayjs';
import { t } from "i18next";
import Cookies from 'universal-cookie';
import { Button, Textarea } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCurrentSupportThunk, handleSupportState, sendMessageThunk } from "@/store";

import { MainValidation } from "@/helpers";
import { AlertMessageEnum, DateFormat } from "@/constants/enum";
import { AlertMessage } from "@/helpers/alert/alert-message";
import { handleMainValidationError, handelValidationError } from "@/helpers/validation-error/validation-error";

import { ICommonState, ISupportAnswerData, ISupportMessageForm } from "@/models/table";

import pageStyle from "../page.module.css"

export const SupportMessage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISupportMessageForm>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cookies = new Cookies();
    const { currentData, answerLoading, answerSuccess, answerError } = useAppSelector((state:ICommonState) => state.support) ;
    const formattedDate = dayjs(currentData?.data?.createdAt).format(DateFormat.SUPPORTDATE);
    const user: string = cookies.get("user");
    const { id } = useParams();
    const [answer, setAnswer] = useState<string>("");
    const [isTrue, setIsTrue] = useState<boolean>(false);
    const [userFrstLetter, setUserFrstLetter] = useState<string>("");

    useEffect(() => {
        nameConverter()
    }, [user])

    const nameConverter = () => {
        setUserFrstLetter(user?.[0].toUpperCase())
    }

    useEffect(() => {
        dispatch(getCurrentSupportThunk(Number(id)))
    }, [])

    useEffect(() => {
        if (answerSuccess) {
            dispatch(handleSupportState.resetAnswerSuccess());
            navigate(-1)
        }
    }, [answerSuccess])

    const onSubmit = (answer: ISupportAnswerData): void => {
        if (answer) {
            const answerText:string = answer?.answer.trim();
            
            dispatch(sendMessageThunk({ id, answer:answerText }))
            setTimeout(() => {
                dispatch(handleSupportState.resetAnswerLoading())
            }, 1000)
            setAnswer("")
        }
        else {
            setIsTrue(true)
        }
    }

    return (
        <>
            <h1 onClick={() => navigate(-1)} className={pageStyle.support_answer_page_title}>{t("PAGETITLE.ANSWER_QUESTION")}</h1>
            <div className={pageStyle.support_message_container}>
                {answerSuccess && <AlertMessage status={AlertMessageEnum.SUCCESS_STATUS} text={AlertMessageEnum.SUCCESS_TEXT} />}
                <div className={pageStyle.support_main_container}>
                    <div className={pageStyle.message_container}>
                        <section className={pageStyle.message_section}>
                            <h1>{t("SUPPORT.MESSAGE")}:</h1>
                            {answerError && handleMainValidationError(answerError as any)}
                            <p className={pageStyle.message_text}>{currentData?.data?.message}</p>
                        </section>
                        <section className={pageStyle.support_info_container}>
                            <div><label className={pageStyle.info_label}>{t("SUPPORT.NAME")}:</label><span className={pageStyle.info_data}>{currentData?.data?.name}</span></div>
                            <div><label className={pageStyle.info_label}>{t("SUPPORT.DATE")}:</label><span>{formattedDate}</span></div>
                        </section>
                        <section className={pageStyle.message_block}>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "680px" }}>
                                <div className={pageStyle.message_error_container}>
                                    <span className={pageStyle.support_message_avatar}>{userFrstLetter}</span>
                                    <Textarea  {...register("answer", MainValidation.answer)} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => { setAnswer(event.target.value) }} value={answer}
                                        onFocus={() => setIsTrue(false)}
                                        focusBorderColor='rgba(4, 179, 88, 1)'
                                        className={pageStyle.textarea} placeholder={t("SUPPORT.TEXT_PLACEHOLDER")} />

                                </div>
                                <div className={pageStyle.error_answer_container}>
                                    {handelValidationError('answer', errors.answer?.type)}
                                </div>
                                <section className={pageStyle.support_btn_container}>
                                    <Button onClick={() => { navigate(-1) }} className={pageStyle.support_btn}
                                        bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{
                                            bg: 'white',
                                            color: "black",
                                            border: '1px solid rgba(4, 179, 88, 1)'
                                        }}

                                        loadingText='Login'
                                        colorScheme='teal'
                                        variant='outline'
                                        spinnerPlacement='end'>{t("COMMON.BACK")}</Button>
                                    <Button
                                        className={pageStyle.support_btn}
                                        bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{
                                            bg: 'white',
                                            color: "black",
                                            border: '1px solid rgba(4, 179, 88, 1)'
                                        }}
                                        type="submit"
                                        loadingText='Login'
                                        colorScheme='teal'
                                        variant='outline'
                                        spinnerPlacement='end'
                                        isLoading={answerLoading}>{t("COMMON.SEND")}</Button>
                                </section>
                            </form>

                            {isTrue && (
                                <p className={pageStyle.error_answer_text}>{t("SUPPORT.TEXTAREAMESSAGE")}</p>
                            )}

                        </section>

                    </div>
                    <div>
                        <section className={pageStyle.email_container}>
                            <div><label className={pageStyle.email_info_label}>{t("SUPPORT.EMAIL")} : </label><span>{currentData?.data?.email}</span></div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}