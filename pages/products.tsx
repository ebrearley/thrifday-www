import Head from 'next/head';
import React from 'react';

import { ProductListing } from '../components/ProductListing';


export default function Products() {
  return (
    <>
      <Head>
        <title>Thrifday | Products</title>
      </Head>
      <ProductListing />
    </>
  )
}
