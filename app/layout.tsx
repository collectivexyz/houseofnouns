import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import { AnalyticsWrapper } from "components/AnalyticsWrapper";
import { DynamicProvider } from "libs/user/DynamicProvider";
import { UserProvider } from "libs/user/UserProvider";

import "styles/globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const techigh = localFont({
  src: "../styles/Techigh-MorseCodeMedium.otf",
  variable: "--font-techigh",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
      </head>
      <body
        className={`bg-hon-gray min-h-screen overscroll-none font-sans ${dmSans.variable} ${techigh.variable}`}
      >
        <DynamicProvider>
          <UserProvider>{children}</UserProvider>
        </DynamicProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
