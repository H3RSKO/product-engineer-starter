"use client";

import React, { useState } from "react";

interface Props {
    reasoning: string;
}

export default function Reasoning({ reasoning }: { reasoning: string }) {
    const [expanded, setExpanded] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
        setShowMore(!showMore);
    };

    return (
        <div className="my-3 indent-6">
            <p className="italic">
                {expanded ? reasoning : `${reasoning.slice(0, 300)}...`}
                <span onClick={handleToggle} className="text-blue-500 cursor-pointer">
                    {showMore ? "Show less" : "Show more"}
                </span>
            </p>
        </div>
    );
}
