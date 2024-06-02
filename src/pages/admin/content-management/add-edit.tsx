import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNewsThunk, getAllNewsThunk, getLanguageThunk, handleNewsState, updateNewsThunk } from '@/store';

import { t } from "i18next";
import { ImageModal } from "@/components/modal/image-modal";
import { LanguageSelector } from '@/components/language-selector';
import { Button, FormLabel, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import { ICommonState, IFormData, ILanguageId, ILanguageInfo, INewFormData } from '@/models';
import { greenColor, whiteColor } from "@/helpers/colors";
import { currentDate } from "@/helpers/date-formater/dateFormater";
import { AlertMessageEnum, CommonEnum, ContentEnum, NumberCount, PdfEnum } from "@/constants";
import {
    AlertMessage, ImagePreviewer, allowedFileTypes, genereateFormData, handleMainValidationError,
    handelValidationError, imagePath, validationSchema, titleValidationRules
} from "@/helpers";

import pageStyle from "../page.module.css";
import pdf_image from "@assets/pictures/pdf.png";
import no_image from "@assets/pictures/no_image.jpg";
import arrow from "@assets/icons/arrow.svg";
import download from "@assets/icons/FiShare.svg";

export const AddEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { addContentLoading, addContentSuccess, addContentError, language, updateContentLoading,
        updateContentSuccess, allLanguageData }: any = useAppSelector((state: ICommonState) => state.content);
    const [languages, setLanguages] = useState<string>("");
    const [shouldValidateForm, setShouldValidateForm] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDisabled, setISDisabled] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const [publishedDates, setPublishedDates] = useState<string | undefined>(undefined);
    const [radiovalue, setRadioValue] = useState<string>(CommonEnum.PUBLISH_DATE_NOW);
    const [file, setFile] = useState<any>();
    const [languageOptions, setLanguageOptions] = useState<string[]>([]);
    const [isChangeButtonName, setIsChangeButtonName] = useState<boolean>(false);
    const [isFormValueSuccess, setIsFormValueSuccess] = useState<boolean>(false);
    const [languageChangeCount, setLanguageChangeCount] = useState(0);
    const [formData, setFormData] = useState<any>({});
    const { register, handleSubmit, control, formState: { errors, isDirty, }, getValues,
        setValue: setValueSecondInstance, reset, trigger: triggerValidations }: any = useForm({
            defaultValues: formData[languages]
        });

    const showModal = () => {
        setIsOpen((prev: boolean) => !prev);
    }

    const { trigger, setValue } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handlePublishedDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedDate: string = e.target.value;
        setPublishedDates(selectedDate);
    };

    const handleLanguageChange = (newLanguage: string, shouldValidate?: boolean): void => {
        const currentFormData: any = getValues();
        setLanguageChangeCount((prevCount) => prevCount + 1);
        onFormChange(currentFormData);
        setLanguages(newLanguage);
        reset(formData[newLanguage]);
        if (shouldValidate) {
            setShouldValidateForm(true);
        }
        if (languageChangeCount == NumberCount.NUMBERONE) {
            setIsChangeButtonName(true)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file: any = e.target.files?.[0];
        if (file) {
            setFile(file);
            const imageURL = URL.createObjectURL(file);
            const fileType = file?.name?.toLowerCase().split(".").pop() ?? ""
            if (allowedFileTypes.includes(fileType)) {
                if (fileType === PdfEnum.PDF) {
                    setImagePreview(pdf_image);
                } else {
                    setImagePreview(imageURL);
                }
            } else {
                setImagePreview(no_image);
            }
        }
    };

    const onSubmit: SubmitHandler<IFormData> = async (data: INewFormData) => {
        onFormChange(data);
        let shouldStopValidating = false;
        let currentValidatedLanguage = '';
        if (!id) {
            for (let i = 0; i < languageOptions.length; i++) {
                if (i == 2) {
                    setIsChangeButtonName(true)
                }
                const currentLanguage = languageOptions[i];
                if (currentLanguage !== languages) {
                    currentValidatedLanguage = currentLanguage;
                    setValue('title', formData[currentLanguage]?.title);
                    setValue('content', formData[currentLanguage]?.content);
                    const output = await trigger();
                    if (!output) {
                        shouldStopValidating = true;
                    }
                }
                if (shouldStopValidating) {
                    handleLanguageChange(currentValidatedLanguage, true);
                    break;
                }
            }
            if (!shouldStopValidating) {
                setIsFormValueSuccess(true)
            }
        }
        else {
            setIsFormValueSuccess(true)
        }
    };

    const onFormChange = (newFormData: INewFormData): void => {
        const { file, publishedDate, ...formDataWithoutFileAndDate } = newFormData;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [languages]: formDataWithoutFileAndDate,
        }));
    };

    useEffect(() => {
        if (language?.length) {
            setLanguageOptions(language.map((item: ILanguageId) => item.name))
            setLanguages(language.map((item: ILanguageId) => item?.name)[0])
        }
    }, [language])

    useEffect(() => {
        if (!id) {
            if (languageOptions?.length && language) {
                setFormData(languageOptions.reduce((acc: any, lang: string) => {
                    const currentLanguage = language.find((language: ILanguageId) => language.name === lang);
                    const languageId: number = currentLanguage ? currentLanguage.id : 1;
                    return { ...acc, [lang]: { title: '', content: '', languageId } };
                }, {}))
            }
        }
    }, [languageOptions, language])

    useEffect(() => {
        if (addContentSuccess) {
            dispatch(handleNewsState.setAddSuccess())
            navigate(`/${ContentEnum.CONTENT}`)
        }
    }, [addContentSuccess])

    useEffect(() => {
        if (updateContentSuccess) {
            navigate(`/${ContentEnum.CONTENT}`)
            dispatch(handleNewsState.setUpdateSuccess())
        }
    }, [updateContentSuccess])

    useEffect(() => {
        if (id) {
            isDirty ? setISDisabled(false) : setISDisabled(true)
        }
    }, [isDirty]);

    useEffect(() => {
        dispatch(getLanguageThunk());
        if (!id) {
            dispatch(handleNewsState.resetAllLanguageNewsData());
            dispatch(handleNewsState.setAddError()),
                dispatch(handleNewsState.setAddLoading())
        }
        else {
            language &&
                dispatch(getAllNewsThunk(id))
            dispatch(handleNewsState.setAddError())
            dispatch(handleNewsState.setUpdateLoading())
            dispatch(handleNewsState.setUpdateError())
        }

        return () => {
            setImagePreview(null)
            dispatch(handleNewsState.resetCurrentData())
            dispatch(handleNewsState.setUpdateError())
            dispatch(handleNewsState.resetAllLanguageNewsData());
        }
    }, []);

    console.log(allLanguageData?.data?.publishedDate)

    useEffect(() => {
        if (shouldValidateForm) {
            triggerValidations();
            setShouldValidateForm(false);
        }
    }, [shouldValidateForm]);

    useEffect(() => {
        if (id) {
            const currentLanguageData = allLanguageData?.data?.contents.find((item: ILanguageInfo) => item?.language.name === languages);
            if (currentLanguageData) {
                const { title, content } = currentLanguageData;
                setValueSecondInstance("title", title);
                setValueSecondInstance("content", content);
                setValueSecondInstance("publishedDate", allLanguageData?.data?.publishedDate?.slice(0, -1));
                setValueSecondInstance("file", allLanguageData?.data?.image);
                setValueSecondInstance("languageId", currentLanguageData?.language?.id);
            }
        }
        if (allLanguageData?.data?.publishedDate) {
            allLanguageData?.data?.publishedDate ? setRadioValue(CommonEnum.PUBLISH_DATE_SHEDULE) :
                setRadioValue(CommonEnum.PUBLISHDATA)
        }

    }, [allLanguageData, languages,]);

    useEffect(() => {
        let isoPublishedDate: string = "";
        const flattenedFormData = Object.values(formData).map((languageData) => {
            const { title, content, languageId }: any = languageData;
            return { title, content, languageId: languageId == undefined ? language[0]?.id : languageId };
        });
        publishedDates ? isoPublishedDate = new Date(publishedDates as string)?.toISOString() : "";
        const languageFormData: any = genereateFormData({ data: [flattenedFormData], file, publishedDate: isoPublishedDate });
        if (isFormValueSuccess) {
            id ? dispatch(updateNewsThunk({ id, formData: languageFormData })) : dispatch(addNewsThunk(languageFormData));
        }
    }, [isFormValueSuccess])

    return (
        <div>
            {isOpen && (<ImageModal src={image} onClose={() => setIsOpen(false)} />)}
            {addContentSuccess && <AlertMessage status={AlertMessageEnum.SUCCESS_STATUS} text={AlertMessageEnum.SUCCESS_TEXT} />}
            <div className={pageStyle.content_managment_edit_container}>
                {
                    !id ? <h1 onClick={() => navigate(-1)} className={pageStyle.add_contnet_title}>{t("MANAGER.ADD_MANAGER_TITLE")}</h1> :
                        <h1 onClick={() => navigate(-1)} className={pageStyle.add_contnet_title}>{t("CONTENT.CONTENT_MANAGMENT_EDIT")}</h1>
                }
                <Button className={pageStyle.content_back_btn} onClick={() => navigate(-1)}
                    colorScheme={whiteColor} variant='solid'>
                    <div className={pageStyle.content_back_btn_inside_container}>
                        <img className={pageStyle.content_arrow_img} src={arrow} alt="Archive Icon" />
                        <span>{t("COMMON.BACK")}</span>
                    </div>
                </Button>
            </div>
            <div className={pageStyle.add_news_container}>
                <div className={pageStyle.language_selector}>
                    <p className={pageStyle.language_name}>{languages}</p>
                    <div className={pageStyle.selector_container}>
                        <LanguageSelector languageOptions={languageOptions} language={languages} handleLanguageChange={handleLanguageChange} />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={pageStyle.add_news_form_container}>
                    {addContentError && <p className={pageStyle.add_error_message}>{t(`BACKVALIDATION.${addContentError?.message}`)}</p>}
                    {addContentError && handleMainValidationError(addContentError)}
                    <div className={pageStyle.title_input_field_container}>
                        <label className={pageStyle.input_title}>{t("NEWS.NEW_TITLE")} *</label>
                        <Controller
                            name="title"
                            control={control}
                            rules={titleValidationRules}
                            render={({ field }) => <input {...field} className={pageStyle.add_news_input}
                                value={getValues()?.title || ""} placeholder={t("NEWS.NEW_TITLE")} />} />
                        {errors.title && <p className={pageStyle.error_text}>{errors.title.message}</p>}
                    </div>
                    <div className={pageStyle.content_input_field_container}>
                        <label className={pageStyle.content_title}>{t("NEWS.NEWS_CONTENT")} *</label>
                        <Controller
                            name="content"
                            control={control}
                            rules={titleValidationRules}
                            render={({ field }) => <textarea  {...field} className={pageStyle.add_news_textarea}
                                value={getValues()?.content || ""} placeholder={t("SUPPORT.TEXT_PLACEHOLDER")} />} />
                        {errors.content && <p className={pageStyle.error_text}>{errors.content.message}</p>}
                    </div>
                    <div>
                        <FormLabel className={pageStyle.radio_btn_title}>{t("NEWS.PUBLISHED")}</FormLabel>
                        <RadioGroup className={pageStyle.radio_btn} onChange={(value) => { setRadioValue(value); setISDisabled(false) }}
                            value={radiovalue}>
                            <Stack direction='row' className={pageStyle.radioButton_container}>
                                <Radio colorScheme={greenColor} value="1" ><p className={pageStyle.radio_text}>{t("NEWS.NOW")}</p></Radio>
                                <Radio colorScheme={greenColor} value='2'><p className={pageStyle.radio_text}>{t("NEWS.SHEDULE")}</p></Radio>
                            </Stack>
                        </RadioGroup>
                    </div>
                    {radiovalue == CommonEnum.PUBLISH_DATE_SHEDULE ?
                        <div className={pageStyle.calendar_container}>
                            <FormLabel className={pageStyle.publish_date_title}>{t("NEWS.NEW_PUBLISH_DATE")}</FormLabel>
                            <Input className={pageStyle.calendar} {...register("publishedDate")}
                                placeholder={t("NEWS.SELECT_DATA")}
                                focusBorderColor='rgba(4, 179, 88, 1)'
                                type="datetime-local"
                                min={currentDate}
                                onChange={handlePublishedDateChange} />
                        </div> : null}
                    {
                        !id ?
                            <div className={pageStyle.upload_btn_container}>
                                <label htmlFor="fileInput" className={pageStyle.upload_label}> {t("NEWS.CHOOSE_FILE")} </label>
                                <div className={pageStyle.add_news_pic}>
                                    <div className={pageStyle.error_image_container}>
                                        {handelValidationError('file', errors?.file?.type as any)}
                                    </div>
                                    <ImagePreviewer imagePreview={imagePreview} />
                                </div>
                                <Input {...register("file", file ? { required: false } : { required: true })}
                                    type="file"
                                    id="fileInput"
                                    className={pageStyle.upload_input}
                                    accept="image/*"
                                    border="1px solid red"
                                    onChange={handleFileChange} />
                            </div>
                            : <div className={pageStyle.edit_pic_container}>
                                {imagePreview ? (<ImagePreviewer imagePreview={imagePreview} showModal={showModal} setImage={setImage} />) :
                                    (<div >
                                        {allowedFileTypes.includes(allLanguageData.data?.image?.path?.toLowerCase().split(".").pop()) ?
                                            <>{
                                                (allLanguageData?.data?.image?.path?.toLowerCase().split(".").pop() == PdfEnum.PDF ?
                                                    <img className={pageStyle.edit_pic} src={pdf_image} />
                                                    : <img onClick={() => {
                                                        showModal()
                                                        setImage(`${imagePath}${allLanguageData?.data?.image?.path}`)
                                                    }} className={pageStyle.edit_pic} src={`${imagePath}${allLanguageData?.data?.image?.path}`} />)
                                            }
                                            </> : <img className={pageStyle.edit_pic} src={no_image} />
                                        }
                                    </div>
                                    )}
                                <label htmlFor="fileInput" className={pageStyle.edit_upload_label}>
                                    <div className={radiovalue == CommonEnum.PUBLISH_DATE_SHEDULE ? pageStyle.download_img : pageStyle.download_now_img}>
                                        <img onClick={() => handleFileChange} src={download} alt="download" />
                                    </div>
                                </label>
                                <Input {...register("file")}
                                    type="file"
                                    id="fileInput"
                                    className={pageStyle.upload_input}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                    }
                    <Button className={pageStyle.create_news_btn}
                        bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{ bg: 'white', color: "green", border: '1px solid rgba(4, 179, 88, 1)' }}
                        isLoading={addContentLoading || updateContentLoading}
                        isDisabled={isDisabled}
                        type='submit'
                        loadingText='Submit'
                        colorScheme='teal'
                        variant='outline'
                        spinnerPlacement='end'>
                        {id ? t("MANAGER.EDIT") : (isChangeButtonName && !id ? t("COMMON.CREATE") : t("COMMON.NEXT"))}
                    </Button>
                </form>
            </div>
        </div>
    );
};


