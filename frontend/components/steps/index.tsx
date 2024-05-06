import Checkbox from "@/components/checkbox";
import Reasoning from "../reasoning";
import Evidence from "../evidence";
import Skeleton from "../skeleton";
import { Step } from "@/context/case-context";

export default function Steps({ steps }: { steps: Step[] }) {
    return (
        <div className="border-t-2 border-dashed">
            <h1 className="mx-5 mt-5 text-2xl italic font-medium underline">
                {!!steps.length ? "Steps Followed" : "Calculating..."}
            </h1>
            {!!steps.length ? (
                steps.map(
                    ({
                        evidence = [],
                        is_final = false,
                        key = "",
                        options = [],
                        question = "",
                        reasoning = ""
                    }) => {
                        return (
                            <div key={key}>
                                <div className="mx-4 mt-4 border-2 rounded-lg shadow-lg relative p-2">
                                    <span className="font-semibold">{question}:</span>
                                    <ul className="">
                                        {options.map(({ key, text, selected }) => (
                                            <li key={key} className="ml-5">
                                                <Checkbox text={text} default_selected={selected} />
                                            </li>
                                        ))}
                                    </ul>
                                    {reasoning && <Reasoning reasoning={reasoning} />}
                                    <div>
                                        <Evidence evidence={evidence} />
                                    </div>
                                </div>
                                {!is_final ? (
                                    <div className="flex justify-center h-12">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10rem"
                                            height="4rem"
                                            preserveAspectRatio="none"
                                            viewBox="0 0 24 24">
                                            <path
                                                fill="#4f46e5"
                                                d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"></path>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="h-20" />
                                )}
                            </div>
                        );
                    }
                )
            ) : (
                <Skeleton />
            )}
        </div>
    );
}
