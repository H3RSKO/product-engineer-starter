"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Interface for individual evidence items
interface Evidence {
    content: string;
    page_number: number;
    pdf_name: string;
    event_datetime: string | null;
}

// Interface for options within a question
interface Option {
    key: string;
    text: string;
    selected: boolean;
}

// Interface for logic rules associated with options
interface LogicRule {
    text: string;
    selected: boolean;
}

// Interface for individual steps in the decision tree
export interface Step {
    key: string;
    question: string;
    options: Option[];
    logic?: LogicRule[]; // Optional for steps with logic rules
    reasoning: string;
    decision: string;
    next_step: string;
    is_met: boolean;
    is_final: boolean;
    evidence: Evidence[];
}

// Main interface for the entire case data
interface CaseData {
    case_id: string;
    status: string;
    procedure_name: string;
    cpt_codes: string[];
    summary: string;
    is_met: boolean;
    is_complete: boolean;
    steps: Step[];
    created_at: string;
}

interface ICaseContext {
    caseData: CaseData | null;
    setCaseData: (data: CaseData | null) => void;
}

const INITIAL_STATE: ICaseContext = {
    caseData: null,
    setCaseData: () => {}
};

export const CaseContext = createContext(INITIAL_STATE);

export function CaseProvider({ children }: { children: ReactNode }) {
    const [caseData, setCaseData] = useState<CaseData | null>(null);
    const value = { caseData, setCaseData };

    return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

export function useCase() {
    const context = useContext(CaseContext);
    return context;
}
