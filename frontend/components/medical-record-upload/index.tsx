"use client";

import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Spinner from "@/components/spinner";

export default function MedicalRecordUpload() {
    const { medicalRecord, setMedicalRecord } = useDashboard();
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        setMedicalRecord({ url: "/assets/medical-record.pdf" });
    };

    return (
        <div className="w-1/2 h-64 border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border-2",
                    medicalRecord === null
                        ? "bg-blue-500 border-blue-500"
                        : "border-transparent text-green-600"
                )}
                onClick={handleClick}>
                {medicalRecord === null && <span>Simulate Medical Record Upload</span>}
                {medicalRecord !== null && isLoading && <Spinner setIsLoading={setIsLoading} />}
                {medicalRecord !== null && !isLoading && (
                    <span className="text-green-600 flex flex-row gap-1 items-center">
                        <FaCheck />
                        <span>Medical Record Uploaded</span>
                    </span>
                )}
            </button>
        </div>
    );
}
