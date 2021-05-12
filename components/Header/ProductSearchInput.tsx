import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { head, isEmpty, isUndefined, map } from 'lodash';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { RetailerProductFragment } from '../../@types/generated';
import { useMonitoredProduct } from '../../hooks/useMonitoredProduct';
import { useProductSearch } from '../../hooks/useProductSearch';
import formatAmount from '../../utils/formatAmount';
import { TextLink } from '../TextLink';
import { ProductSearchResult } from './ProductSearchResult';
import { ProductSearchResults } from './ProductSearchResults';

export interface Item {
  label: string;
  value: string;
}

export const ProductSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isInputFocussed, setIsInputFocussed] = useState<boolean>(false);
  const toast = useToast();
  const [addMonitoredProduct] = useMonitoredProduct();
  const { products, error } = useProductSearch({
    searchTerm,
    queryArgs: {
      skip: isUndefined(searchTerm),
    },
  });

  const onSearchChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent?.target?.value;
    setSearchTerm(value);
  }

  useEffect(() => {
    setIsMenuOpen(!!products);
  }, [products]);

  const onOutsideClick = () => {
    if (!isInputFocussed) {
      setIsMenuOpen(false);
    }
  };

  const onInputFocus = () => {
    setIsInputFocussed(true);
    setIsMenuOpen(!!products);
  };

  const onInputBlur = () => {
    setIsInputFocussed(false);
  };

  const onProductSelect = (product: RetailerProductFragment) => {
    addMonitoredProduct({
      productPages: [{
        retailer: product.retailer,
        url: product.productPageUrl,
      }]
    }).then((result) => {
      const price = formatAmount(product.latestPrice?.value || 0);

      toast({
        status: 'success',
        isClosable: true,
        title: 'Product added',
        description: (<span>{`${product.name} ${price}`}.</span>)
      });
    });

    setTimeout(() => {
      setIsMenuOpen(false);
    }, 100);
  };

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input placeholder="Search for products" backgroundColor="gray.700" onChange={onSearchChange} aria-haspopup={true} aria-expanded={isMenuOpen} onFocus={onInputFocus} onBlur={onInputBlur} />
      <ProductSearchResults products={isEmpty(searchTerm) ? [] : products} isOpen={isMenuOpen} onOutsideClick={onOutsideClick} onProductSelect={onProductSelect} />
    </InputGroup>
  );
};
