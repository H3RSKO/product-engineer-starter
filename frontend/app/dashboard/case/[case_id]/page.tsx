"use client";

import { useCase } from "@/context/case-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Paper from "@/components/paper";
import Title from "@/components/title";
import Steps from "@/components/steps";
import Skeleton from "@/components/skeleton";

export default function CaseResult() {
    const { caseData, setCaseData } = useCase();
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const caseId = usePathname().split("/")[3];

    const {
        is_met = false,
        status = "processing",
        procedure_name = "",
        cpt_codes = [],
        created_at = "",
        summary = "",
        steps = []
    } = caseData || {};

    useEffect(() => {
        let fetchStatus = "processing";
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/cases/${caseId}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                fetchStatus = jsonData.status;
                setCaseData(jsonData);
                setLoading(false);
            } catch {
                router.push("/not-found");
            }
        };

        fetchData();

        const intervalId = setInterval(async () => {
            await fetchData();
            if (fetchStatus == "complete") {
                clearInterval(intervalId);
            }
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [caseId]);

    return (
        <div className="my-8">
            {!isLoading ? (
                <Paper status={status} is_met={is_met}>
                    <Title
                        procedure_name={procedure_name}
                        cpt_codes={cpt_codes}
                        created_at={created_at as ""}
                    />
                    {summary ? <div className="m-5 pb-6 indent-8">{summary}</div> : <Skeleton />}
                    <Steps steps={steps} />
                </Paper>
            ) : (
                <></>
            )}
        </div>
    );
}
