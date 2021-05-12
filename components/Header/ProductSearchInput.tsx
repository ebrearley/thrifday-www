import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { isUndefined, map } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useProductSearch } from '../../hooks/useProductSearch';
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
  const { products, error } = useProductSearch({
    searchTerm,
    queryArgs: {
      skip: isUndefined(searchTerm),
    },
  });

  const onSearchChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent?.target?.value;
    if (value) {
      setSearchTerm(value);
    }
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

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
      <Input placeholder="Search for products" backgroundColor="gray.700" onChange={onSearchChange} aria-haspopup={true} aria-expanded={isMenuOpen} onFocus={onInputFocus} onBlur={onInputBlur} />
      <ProductSearchResults products={products} isOpen={isMenuOpen} onOutsideClick={onOutsideClick} />
    </InputGroup>
  );
};
