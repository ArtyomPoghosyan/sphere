import { t } from "i18next";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/react";

import pageStyle from "../admin-table/table.module.css";
import { IpopUp } from "@/models";

export const DeleteModal = (props: IpopUp) => {
    const { isOpen, onClose, handleDeleteItem, deleteId } = props;

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered size={"xl"} >
                <ModalOverlay />
                <ModalContent style={{padding:"25px 0 25px 0"}}>
                    <ModalBody pb={6}>
                        <p className={pageStyle.pop_up_text}>{t("POPUP.TEXT")}</p>
                    </ModalBody>
                    <ModalFooter className={pageStyle.pop_up_footer}>
                        <div className={pageStyle.pop_up_btn_container}>
                            <Button bg={'white'} border={"1px solid rgba(4, 179, 88, 1)"} color={'balck'}  _hover={{
                                bg: 'white',
                                color: "green",
                                border: '1px solid rgba(4, 179, 88, 1)'
                            }} className={pageStyle.pop_up_btn} onClick={onClose}>{t("POPUP.CANCEL")}</Button>
                            <Button bg={'rgba(4, 179, 88, 1)'} color={'white'} _hover={{
                                bg: 'white',
                                color: "green",
                                border: '1px solid rgba(4, 179, 88, 1)'
                            }} className={pageStyle.pop_up_btn} onClick={() => handleDeleteItem(deleteId)}>
                                {t("POPUP.DELETE")}
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}