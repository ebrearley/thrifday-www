import React from 'react';
import Head from 'next/head';

import { ProductListing } from '../components/ProductListing';


export default function Specials() {
  return (
    <>
      <Head>
        <title>Thrifday | Sign up</title>
      </Head>
      <ProductListing isSpecialOnly />
    </>
  )
}
