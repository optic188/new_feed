"use client";
import { useRouter } from 'next/navigation';
import {useState, useEffect} from "react";

export const LanguageSwitcher = () => {
    const router = useRouter();
    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'EN')
    const onChange = (e) => {
        setLanguage(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('language', language);
        router.push(`/?lang=${language}`);
    }, [language]);
    return(
        <>
        <label htmlFor="language" className="mr-2">Choose language:</label>
        <select id="language" onChange={onChange} value={language}>
            <option value="EN">EN</option>
            <option vakue="RU">RU</option>
            <option value="PL">PL</option>
        </select>
        </>
    )
};