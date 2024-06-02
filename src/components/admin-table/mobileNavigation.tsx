import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

import Cookies from 'universal-cookie';
import {IconButton, Flex, HStack, useColorModeValue,Text, Menu, MenuButton} from '@chakra-ui/react';

import compony_logo from "@assets/icons/sphere_pons_light_logo.svg";
import { MobileProps } from "@/models/table";

import tableStyle from "./table.module.css";

export const MobileNavigation = ({ onOpen, ...rest }: MobileProps) => {
  const cookies = new Cookies();
  const user: string = cookies.get("user");
  const [userFrstLetter, setUserFrstLetter] = useState<string>("");
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    nameConverter()
  }, [user])

  const nameConverter = () => {
    setUserFrstLetter(user?.[0].toUpperCase())
    setUserName(user?.split("@")[0])
  }

  return (
    <Flex ml={{ base: 0, md: 60 }} px={{ base: 4, md: 4 }} style={{ height: "60px" }} alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        <img style={{ width: "118px", }} src={compony_logo} />
      </Text>

      <HStack spacing={{ base: '0', md: '6' }} >
        <Flex alignItems={'center'} style={{ marginRight: "14px", marginTop: "3px" }} >
          <div className={tableStyle.avatar_name} >
            {userName}
          </div>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <div className={tableStyle.avatar}>
                  {userFrstLetter}
                </div>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}