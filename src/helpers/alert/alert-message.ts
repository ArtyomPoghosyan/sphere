import { IAlert } from "@/models";
import { useToast } from "@chakra-ui/react";

export const AlertMessage = (props:IAlert) => {
    const {status,text} = props;
    const toast = useToast()
    return (
        toast({
            title: text,
            position:"top",
            status: status,
            duration:3000,
            isClosable: true,
          })
    )
}