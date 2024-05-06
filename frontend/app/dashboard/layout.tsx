import { CaseProvider } from "@/context/case-context";
import { DashboardProvider } from "@/context/dashboard-context";

export default function PriorAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProvider>
            <CaseProvider>
                <div className="w-full max-w-6xl mx-auto">{children}</div>
            </CaseProvider>
        </DashboardProvider>
    );
}
