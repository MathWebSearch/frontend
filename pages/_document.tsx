import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div style={{margin: '0 auto', width:'fit-content', fontSize:'small'}}>
                        <script src="https://privacy.kwarc.info/legal.js"></script>
                    </div>
                </body>
            </Html>
        )
    }
}
