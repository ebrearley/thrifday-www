import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  DrawerHeader,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Sidebar } from '../Sidebar';

export const Hamburger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    setTimeout(onClose, 100);
  }, [router.route]);

  return (
    <>
      <IconButton aria-label="Open menu" icon={<HamburgerIcon />} onClick={onOpen} />
      <Drawer
          isOpen={isOpen}
          size="xs"
          placement="right"
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Thrifday
            </DrawerHeader>
            <Sidebar width="100%" height="calc(100% - 4rem)" />
          </DrawerContent>
        </Drawer>
    </>
  );
};
