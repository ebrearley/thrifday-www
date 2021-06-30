import React from 'react';
import NextDocument, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../utils/theme';

class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await NextDocument.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta title="Thrifday | Stay up to date with the cheapest prices at aussie retailers." />
                    {/* <link rel="icon" sizes="96x96" href="/favicons/favicon.ico" /> */}
                    <meta name="theme-color" content="#319795"></meta>
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
