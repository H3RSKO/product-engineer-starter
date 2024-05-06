"use client";

import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import cpt from "./cpt.json";

interface TitleProps {
    procedure_name: string;
    cpt_codes: string[];
    created_at: "";
}

export default function Title({
    procedure_name = "",
    cpt_codes = [],
    created_at = ""
}: TitleProps) {
    dayjs.extend(relativeTime);

    const [selectedCode, setSelectedCode] = useState("");

    const cpt_handler = ({ target: { innerHTML: code } }: { target: { innerHTML: string } }) => {
        if (code in cpt) setSelectedCode(code);
    };

    return (
        <div>
            <div className="flex h-28">
                <span className="shrink-0">
                    <h1 className="mx-5 mt-5 text-3xl italic font-medium underline  ">
                        {procedure_name}
                    </h1>
                    <div className="ml-5">Case Initialized: {dayjs(created_at).fromNow()}</div>
                </span>
                {cpt_codes &&
                    (selectedCode ? (
                        <div
                            className="flex-column rounded-md self-center  text-md italic overflow-hidden"
                            onClick={() => setSelectedCode("")}>
                            <h3 className="text-indigo-600">{selectedCode}:</h3> {cpt[selectedCode]}
                        </div>
                    ) : (
                        cpt_codes.map((code) => (
                            <div
                                key={code}
                                className={`text-xs self-center p-1 border-2 rounded-lg relative bg-indigo-600 hover:bg-indigo-500 text-white`}
                                onClick={cpt_handler}
                                value={code}>
                                {code}
                            </div>
                        ))
                    ))}
            </div>
        </div>
    );
}
