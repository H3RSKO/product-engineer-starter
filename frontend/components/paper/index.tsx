"use client";

import React, { useState } from "react";

interface PaperProps {
    children: React.ReactNode;
    is_met: boolean;
    status: string;
}

export default function Paper({ children, is_met = false, status = "pending" }: PaperProps) {
    const borderData =
        status === "complete"
            ? is_met
                ? { color: "border-green-500", text: "Probable Approval" }
                : { color: "border-red-500", text: "Probable Denial" }
            : { color: "border-pablo-200", text: "Pending" };

    return (
        <div className={`m-4 border-2 ${borderData.color} rounded-lg shadow-lg relative`}>
            <span
                className={`absolute top-0 left-24 -translate-y-1/2 -translate-x-1/2 bg-white px-2.5 rounded-full text-md ${borderData.color} border-2`}>
                {borderData.text}
            </span>
            {children}
            <span
                className={`absolute bottom-0 right-24 translate-y-1/2 translate-x-1/2 bg-white px-2.5 rounded-full text-md ${borderData.color} border-2`}>
                {borderData.text}
            </span>
        </div>
    );
}
