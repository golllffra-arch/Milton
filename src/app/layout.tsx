import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { DynamicNavbar } from "@/components/layout/dynamic-navbar"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { prisma } from "@/lib/prisma"

async function getSettings() {
  try {
    return await prisma.siteSettings.findFirst()
  } catch {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: {
      default: settings?.metaTitle || "Milton International College | TU Affiliated | New Baneshwor, Kathmandu",
      template: `%s | ${settings?.collegeName || "Milton International College"}`,
    },
    description: settings?.metaDescription || "Milton International College, affiliated with Tribhuvan University, offers BCA, BBM, BBS, and BASW programs in New Baneshwor, Kathmandu.",
    keywords: settings?.metaKeywords?.split(",") || [],
    openGraph: {
      title: settings?.metaTitle || "Milton International College",
      description: settings?.metaDescription || "",
      url: "https://milton.edu.com",
      siteName: settings?.collegeName || "Milton International College",
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  const headingFontFamily = settings?.fontHeading || "Playfair Display"
  const bodyFontFamily = settings?.fontBody || "Inter"
  const primaryColor = settings?.primaryColor || "#1c3557"
  const secondaryColor = settings?.secondaryColor || "#e31c23"
  const accentColor = settings?.accentColor || "#c9a84c"
  const bgColor = settings?.backgroundColor || "#ffffff"

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=${headingFontFamily.replace(" ", "+")}:wght@400;500;600;700;900&family=${bodyFontFamily.replace(" ", "+")}:wght@300;400;500;600;700&display=swap`}
          rel="stylesheet"
        />
        <style>{`
          :root {
            --primary: ${primaryColor};
            --secondary: ${secondaryColor};
            --accent: ${accentColor};
            --bg-color: ${bgColor};
            --font-heading: "${headingFontFamily}", serif;
            --font-body: "${bodyFontFamily}", sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased" style={{ fontFamily: `"${bodyFontFamily}", sans-serif`, backgroundColor: bgColor }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <DynamicNavbar
              variantSlug={settings?.navbarVariantId || "navbar-default"}
              settings={settings}
            />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
