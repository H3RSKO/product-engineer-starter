"use client";

import { useState } from "react";

interface EvidenceItem {
    content: string;
    page_number: number;
    pdf_name: string;
    event_datetime: string | null;
}

interface EvidenceProps {
    evidence: EvidenceItem[];
}

export default function Evidence({ evidence }: EvidenceProps) {
    const [showEvidence, setShowEvidence] = useState(false);

    return showEvidence ? (
        <div className="hover:border-indigo-600 hover:border-2 border-2">
            {evidence.map(({ content, page_number, pdf_name, event_datetime }, index) => (
                <div
                    key={index}
                    className={`${
                        index % 2 === 0 ? "bg-[#f0f0f0]" : "bg-[#e0e0e0]"
                    } p-4 border-b-2`}
                    onClick={() => setShowEvidence(!showEvidence)}>
                    <p>
                        <strong>Content:</strong> {content}
                    </p>
                    <p>
                        <strong>Page Number:</strong> {page_number}
                    </p>
                    <p>
                        <strong>Pdf Name:</strong> {pdf_name}
                    </p>
                    <p>
                        <strong>Event Datetime:</strong> {event_datetime || "N/A"}
                    </p>
                </div>
            ))}
        </div>
    ) : (
        <div
            className="text-indigo-600 font-bold hover:bg-indigo-600 center hover:text-white inline-flex  p-1 rounded-lg m-1"
            onClick={() => setShowEvidence(!showEvidence)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.5em"
                viewBox="0 0 256 256">
                <path
                    fill="currentColor"
                    d="m220.49 59.51l-40-40A12 12 0 0 0 172 16H92a20 20 0 0 0-20 20v20H56a20 20 0 0 0-20 20v140a20 20 0 0 0 20 20h108a20 20 0 0 0 20-20v-20h20a20 20 0 0 0 20-20V68a12 12 0 0 0-3.51-8.49M160 212H60V80h67l33 33Zm40-40h-16v-64a12 12 0 0 0-3.51-8.49l-40-40A12 12 0 0 0 132 56H96V40h71l33 33Zm-56-28a12 12 0 0 1-12 12H88a12 12 0 0 1 0-24h44a12 12 0 0 1 12 12m0 40a12 12 0 0 1-12 12H88a12 12 0 0 1 0-24h44a12 12 0 0 1 12 12"></path>
            </svg>
            Show evidence
        </div>
    );
}
