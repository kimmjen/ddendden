'use client';
import {Layout} from "@/components/layout/Layout";
import {useLanguageStore} from "@/store/languageStore";
import React, {useEffect} from "react";
import './globals.css'

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
        <body>
        <LanguageProvider>
            <Layout>
                {children}
            </Layout>
        </LanguageProvider>
        </body>
        </html>
    );
}