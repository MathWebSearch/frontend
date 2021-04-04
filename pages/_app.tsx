import App, { AppContext } from 'next/app';
import * as React from 'react';
import { Footer } from '../src/components/Footer';
import { Header } from '../src/components/Header';
import { ReportError } from '../src/components/ReportError';
import { BRANDING_TITLE, BRANDING_URL, THEME_NUMBER } from '../src/config/';
import { StoreProvider } from '../src/store/Store';
import styles from "./_app.module.css";

export default class MyApp extends App {
    /** disable automatic pre-rendering because of runtime config */
    static async getInitialProps(context: AppContext) {
        return App.getInitialProps(context);
    }

    render() {
        const { Component, pageProps } = this.props;

        const theme = THEME_NUMBER ?? "1";

        return (
            <div className={`${styles.body} ${styles[`theme${theme}`]}`}>
                <StoreProvider>
                    <ReportError />
                    <Header brandingTitle={BRANDING_TITLE} brandingLink={BRANDING_URL} />
                    <br />
                    <div className={styles.App}>
                        <Component {...pageProps} />
                    </div>
                    <br />
                    <Footer />
                </StoreProvider>
            </div>
        )
    }
}