import "@/styles/globals.css";
import { Inter } from "next/font/google";

interface IRootLayoutProps {
    children: React.ReactNode;
}

const inter = Inter({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "swap"
});

export default function RootLayout(props: IRootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en" className={inter.className}>
            {/* <html lang="en"> */}
            <head></head>
            <body>
                {children}
                <div id="modal" />
            </body>
        </html>
    );
}
