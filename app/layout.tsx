import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BricketX Pakistan - Operational & Innovation Hub",
  description: "The Karachi engine room powering the global BricketX network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MBFL3ZLP');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Global Opera Video Pop-out & Lucid Mode Suppressor */}
        <Script id="disable-opera-video-decorations" strategy="afterInteractive">
          {`
            (function() {
              const operaSelectors = [
                '#detach-button-host',
                '#lucid-mode-button',
                'div[id*="lucid-mode"]',
                'div[id*="detach-button"]',
                'div[class*="lucid-mode"]',
                'div[class*="video-popout"]'
              ];

              const purgeOperaWidgets = () => {
                operaSelectors.forEach(selector => {
                  document.querySelectorAll(selector).forEach(el => el.remove());
                });

                document.querySelectorAll('video').forEach(v => {
                  if (!v.hasAttribute('controls') && !v.classList.contains('interactive-video')) {
                    v.disablePictureInPicture = true;
                    v.setAttribute('disablepictureinpicture', '');
                    v.setAttribute('controlslist', 'nodownload nofullscreen noremoteplayback');
                  }
                });
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', purgeOperaWidgets);
              } else {
                purgeOperaWidgets();
              }

              const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                  for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                      const id = node.id || '';
                      const className = typeof node.className === 'string' ? node.className : '';
                      
                      if (
                        id.includes('lucid-mode') ||
                        id.includes('detach-button') ||
                        className.includes('lucid-mode') ||
                        className.includes('video-popout')
                      ) {
                        node.remove();
                      } else if (node.tagName === 'VIDEO') {
                        node.disablePictureInPicture = true;
                        node.setAttribute('disablepictureinpicture', '');
                      }
                    }
                  }
                }
              });

              observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
              });
            })();
          `}
        </Script>
      </head>

      <body className="bg-[#0a0a0b] text-white flex flex-col min-h-screen selection:bg-bricket-gold/30 selection:text-white">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MBFL3ZLP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}