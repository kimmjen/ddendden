'use client';
import {Layout} from "@/components/layout/Layout";
import {useLanguageStore} from "@/store/languageStore";
import React, {useEffect} from "react";
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';

function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useLanguageStore(state => state.language);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return children;
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>뜬뜬 (DDen DDen)</title>
        </head>
        <body>
        <LanguageProvider>
            <Layout>
                {children}
                <SpeedInsights/>
            </Layout>
        </LanguageProvider>

        </body>
        </html>
    );
}