
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";

export interface DurationsSelectProps {
    initVal?: string;
    onChange: (value: string) => void;
}

export function DurationsSelect({ initVal, onChange }: DurationsSelectProps) {
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (value: string) => {
        console.log(value); 
        setSelectedValue(value);
        onChange(value); // Pass the selected value to the parent component or perform any other action
    };

    return (
        <Select onValueChange={handleChange} value={initVal}>
            <SelectTrigger className="w-[120px] bg-white text-zinc-700 rounded-2xl">
                <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent className="bg-white text-zinc-700">
                <SelectGroup className="">
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="15"
                    >
                        15 minutes
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="30"
                    >
                        30 minutes
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="45"
                    >
                        45 minutes
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="60"
                    >
                        1 hour
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="90"
                    >
                        1.5 hours
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="120"
                    >
                        2 hours
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="180"
                    >
                        3 hours
                    </SelectItem>
                    <SelectItem
                        className="hover:bg-zinc-100 transition rounded cursor-pointer"
                        value="240"
                    >
                        4 hours
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

// export function DurationsSelect() {
//     const [selectedValue, setSelectedValue] = useState('');

//     const handleChange = (value: string) => {
//         setSelectedValue(value);
//         // Pass the selected value to the parent component or perform any other action
//     };

//     return (
//         <Select>
//             <SelectTrigger className="w-[120px] bg-white text-zinc-700 rounded-2xl">
//                 <SelectValue placeholder="Duration" />
//             </SelectTrigger>
//             <SelectContent className="bg-white text-zinc-700">
//                 <SelectGroup className="">
//                     <SelectLabel>Duration</SelectLabel>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="15">15 minutes</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="30">30 minutes</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="45">45 minutes</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="60">1 hour</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="90">1.5 hours</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="120">2 hours</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="180">3 hours</SelectItem>
//                     <SelectItem className="hover:bg-zinc-100 transition rounded cursor-pointer" value="240">4 hours</SelectItem>
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     )
// }
