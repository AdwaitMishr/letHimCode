import type { Metadata } from "next";
import { Oswald, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { dark, shadesOfPurple, neobrutalism } from "@clerk/themes";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Let Him Code",
  description: "Jesse, we need to cook.",
  icons:{
    icon: "/Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
  <ClerkProvider
  appearance={{
    baseTheme: dark,
    variables: {
      colorPrimary: "#36B37E", 
      colorText: "#F0F6FC", 
      colorBackground: "#0D1117", 
      colorInputBackground: "#161B22", 
      colorInputText: "#36B37E", 
    },
    layout: {
      socialButtonsPlacement: "bottom",
      socialButtonsVariant: "iconButton",
    },
    elements: {
      card: "border border-[#36B37E] shadow-[0_0_15px_rgba(54,179,126,0.3)]", 
      headerTitle: "text-[#36B37E] font-sans tracking-wide",
      headerSubtitle: "text-gray-400",
      formButtonPrimary: 
        "bg-[#36B37E] hover:bg-[#2E996B] text-black font-bold uppercase tracking-wider",
      formFieldInput: 
        "border-gray-700 focus:border-[#00BFFF] transition-colors", // Focus turns Crystal Blue
      footerActionLink: "text-[#00BFFF] hover:text-[#36B37E]",
    }
  }}
>

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${oswald.variable} ${chakraPetch.variable} antialiased`}
      >
        <ThemeProvider
        attribute = "class"
        defaultTheme = "system"
        enableSystem
        disableTransitionOnChange
        >
      {children}
      <Toaster position="bottom-right" />
      </ThemeProvider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
