"use client";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Spinner from "@/components/spinner";
import toast from "react-hot-toast";

export default function GuidelinesUpload() {
    const { guidelinesFile, setGuidelinesFile, medicalRecord } = useDashboard();
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        if (medicalRecord == null) {
            toast.error("Please upload your Medical Record ");
        } else {
            setGuidelinesFile({ url: "/assets/guidelines.pdf" });
        }
    };

    return (
        <div className="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border-2",
                    guidelinesFile === null
                        ? "bg-orange-500 border-orange-500"
                        : "border-transparent text-green-600"
                )}
                onClick={handleClick}>
                {guidelinesFile === null && <span>Simulate Guidelines Upload</span>}
                {guidelinesFile !== null && isLoading && <Spinner setIsLoading={setIsLoading} />}
                {guidelinesFile !== null && !isLoading && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Guidelines File Uploaded</span>
                    </span>
                )}
            </button>
        </div>
    );
}
