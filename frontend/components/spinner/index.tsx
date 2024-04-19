"use client";

import Lottie from "lottie-react";
import spinner from "@/animations/spinner.json";
import { useEffect } from "react";

interface SpinnerProps {
    setIsLoading: (isLoading: boolean) => void;
}

export default function Spinner({ setIsLoading }: SpinnerProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return <Lottie animationData={spinner} loop={true} />;
}
