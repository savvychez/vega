'use client'


import { useEffect, useState } from "react";
import { SelectOption } from "./MultiSelect";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import ReactLoading from 'react-loading';
import 'react-international-phone/style.css';
import { CountryIso2, CountrySelector, DialCodePreview, ParsedCountry, PhoneInput } from 'react-international-phone';


interface CustomPhoneInputProps {
    onValid: (isValid: boolean) => void;
    onChange: (value: string) => void;
    value: string;
}   


export default function CustomPhoneInput({ onValid, value, onChange }: CustomPhoneInputProps) {

    const [dialCode, setDialCode] = useState<string>("1")
    const [country, setCountry] = useState<CountryIso2>("us")
    const handleCountrySelect = ( iso2 : ParsedCountry) => {
        // console.log(iso2)
        // const dialCode = getCountryCallingCode(iso2.toString() as CountryCode);
        setCountry(iso2.iso2)
        setDialCode(iso2.dialCode)
        // You can also set the dial code in your component's state here if needed
      };
    return (
        <div className="flex">
            <CountrySelector
            selectedCountry={country}
            className="rounded-2xl"
            buttonStyle={{ backgroundColor: '#F3F4F6', padding: '1rem', borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem', height: '2.5rem', marginTop: '0.25rem' }}
            onSelect={(handleCountrySelect)}
            
            />
            <DialCodePreview dialCode={dialCode} prefix={"+"} style={{ height: '2.5rem', marginTop: '0.25rem', paddingInline: '1em'}}/>
            <Input className="mt-1 h-10 rounded-2xl text-[1em] rounded-tl-none rounded-bl-none bg-white text-zinc-800" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}
