import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { satoshi } from '@/lib/fonts';
import ConditionalMobileHeader from '@/components/layout/conditional-mobile-header';
import ConditionalFooter from '@/components/layout/conditional-footer';
import { AuthModal } from '@/components/auth';
import { AiChatModal } from '@/components/shared';
import { AuthProvider } from '@/providers/auth-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { FeatureFlagProvider } from '@/providers/feature-flag-provider';
import { LoadingScreen } from '@/components/shared/loading-screen';
import Script from 'next/script';
import { HEADER_LINKS } from '@/lib/constants/common';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/**
 * Metadata
 */
export const metadata: Metadata = {
  title: 'Trustfin - Quick Personal Loans',
  description:
    'Get instant access to personal loans with Trustfin. Quick approval, minimal documentation, and competitive rates.',
};

/**
 * Viewport (moved out of metadata)
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Resize layout viewport when the virtual keyboard opens (Chrome/Android).
  interactiveWidget: 'resizes-content',
};

/**
 * Root layout component that fetches global data from Strapi
 *
 * Auth Flow (PDF Step 1):
 * AuthProvider validates existing token on app mount
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="overscroll-y-none">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {/* TODO: GTM script for Trustfin */}
        </Script>
      </head>
      <body
        className={`${satoshi.variable} ${geistMono.variable} ${satoshi.className} antialiased min-h-screen flex flex-col`}
      >
        {/* <noscript>
          <iframe
            // TODO: GTM iframe for Trustfin
            src="https://www.googletagmanager.com/ns.html?id=GTM-TMJBLB7R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        {/* FeatureFlagProvider must wrap everything for dev tools */}
        <FeatureFlagProvider>
          {/* AuthProvider validates token on mount (PDF Step 1) */}
          <Suspense fallback={null}>
            <AuthProvider>
              <ToastProvider />
              <ConditionalMobileHeader
                headerLinks={HEADER_LINKS}
                logo={null}
                siteName="Trustfin"
              />
              <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
              <ConditionalFooter />
              <AuthModal />
              <AiChatModal />
              <LoadingScreen />
            </AuthProvider>
          </Suspense>
        </FeatureFlagProvider>
      </body>
    </html>
  );
}