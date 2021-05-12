import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  HStack,
  Divider,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import React, { useEffect } from 'react';
import { MonitoredProductFragment } from '../@types/generated';
import { useRemoveMonitoredProduct } from '../hooks/useRemoveMonitoredProduct';
import { PriceHistoryGraph } from './PriceHistoryGraph';
import { SimilarProuctsListing } from './SimilarProductsListing';

interface MonitoredProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  monitoredProduct: MonitoredProductFragment;
}

interface FormProps {
  productName?: string;
}

export const MonitoredProductDrawer = ({ isOpen, onClose, monitoredProduct }: MonitoredProductDrawerProps) => {
  const [removeMonitoredProduct] = useRemoveMonitoredProduct()
  const toast = useToast();
  
  useEffect(() => {
    if (!monitoredProduct) {
      onClose();
    }
  }, [monitoredProduct, isOpen]);


  const onSubmit = (values: FormProps) => {

  }

  const onRemoveClick = () => {
    removeMonitoredProduct({
      monitoredProductId: monitoredProduct.id,
    }).then(() => {
      toast({
        status: 'success',
        title: 'Product removed',
        description: monitoredProduct.name,
      });
      onClose();
    });
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="lg"
    >
      <DrawerOverlay />
      <Formik<FormProps>
          initialValues={{ productName: monitoredProduct?.name }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
          <Form>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {monitoredProduct?.name}
          </DrawerHeader>
            <DrawerBody>
              <Stack spacing="1.5rem">
                <PriceHistoryGraph monitoredProduct={monitoredProduct} />

                <SimilarProuctsListing monitoredProduct={monitoredProduct} />

                <Box>
                  <FormLabel htmlFor="productName">Name (or nickname)</FormLabel>
                  <InputControl
                    id="productName"
                    name="productName"
                    placeholder="A nickname for this product"
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="url">Monitor this product at another retailer</FormLabel>
                  <HStack>
                    <InputGroup>
                      <InputLeftAddon>http://</InputLeftAddon>
                      <Input
                        type="url"
                        id="url"
                        placeholder="Product page URL of this product at a different retailer"
                      />
                    </InputGroup>
                    <Button>Add</Button>
                  </HStack>
                </Box>

                <Box>
                  <Divider marginBottom="1rem" />
                  <Button colorScheme="red" onClick={onRemoveClick}>Remove product</Button>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <SubmitButton colorScheme="blue" disabled={isSubmitting}>Save</SubmitButton>
            </DrawerFooter>
        </DrawerContent>
        </Form>
        )}
      </Formik>
    </Drawer>
  );
};
