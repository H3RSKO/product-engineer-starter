"use client";

import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useDashboard } from "@/context/dashboard-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export const revalidate = 0;

export default function DashboardRoot() {
    const { guidelinesFile, setMedicalRecord, setGuidelinesFile } = useDashboard();
    const router = useRouter();

    useEffect(() => {
        // resets buttons on page load
        setMedicalRecord(null);
        setGuidelinesFile(null);
    }, []);

    const handleContinue = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cases` as string, {
                method: "post"
            });
            const { id } = await response.json();
            router.push(`/dashboard/case/${id}`);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <Toaster position="bottom-right" />
            <div className="w-full flex flex-row gap-2 items-center">
                <MedicalRecordUpload />
                <GuidelinesUpload />
            </div>
            <div className="w-full py-4 flex flex-row justify-center">
                {guidelinesFile ? (
                    <button
                        className="bg-green-600 font-medium text-white py-2 px-4 rounded"
                        onClick={handleContinue}>
                        Continue
                    </button>
                ) : (
                    // stops the elements from shifting when the button is rendered
                    <span className="h-[40px]" />
                )}
            </div>
        </div>
    );
}
