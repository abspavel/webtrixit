import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">পেজটি খুঁজে পাওয়া যায়নি</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরানো হয়েছে।
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          এই পেজটি লোড হয়নি
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          আমাদের প্রান্তে কিছু সমস্যা হয়েছে। রিফ্রেশ করে দেখুন অথবা হোমে ফিরে যান।
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            আবার চেষ্টা করুন
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            হোমে ফিরে যান
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Webtrix IT Solution — ওয়েবসাইট, সফটওয়্যার ও ডিজিটাল মার্কেটিং" },
      { name: "description", content: "Webtrix IT Solution ডিজাইন করে প্রিমিয়াম ওয়েবসাইট, ই-কমার্স, LMS প্ল্যাটফর্ম ও কাস্টম সফটওয়্যার — সাথে AI ভিডিও অ্যাড ও সোশ্যাল মিডিয়া ক্রিয়েটিভ।" },
      { name: "author", content: "Webtrix IT Solution" },
      { property: "og:title", content: "Webtrix IT Solution — ওয়েবসাইট, সফটওয়্যার ও ডিজিটাল মার্কেটিং" },
      { property: "og:description", content: "Webtrix IT Solution ডিজাইন করে প্রিমিয়াম ওয়েবসাইট, ই-কমার্স, LMS প্ল্যাটফর্ম ও কাস্টম সফটওয়্যার — সাথে AI ভিডিও অ্যাড ও সোশ্যাল মিডিয়া ক্রিয়েটিভ।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Webtrix IT Solution — ওয়েবসাইট, সফটওয়্যার ও ডিজিটাল মার্কেটিং" },
      { name: "twitter:description", content: "Webtrix IT Solution ডিজাইন করে প্রিমিয়াম ওয়েবসাইট, ই-কমার্স, LMS প্ল্যাটফর্ম ও কাস্টম সফটওয়্যার — সাথে AI ভিডিও অ্যাড ও সোশ্যাল মিডিয়া ক্রিয়েটিভ।" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/XoKKKE5uTDWSw8MRim4BZzbm9YF3/social-images/social-1784358296797-Screenshot_20260716-231015.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/XoKKKE5uTDWSw8MRim4BZzbm9YF3/social-images/social-1784358296797-Screenshot_20260716-231015.webp" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const supabaseConfig = {
    url: process.env.MY_SUPABASE_URL ?? "",
    anonKey: process.env.MY_SUPABASE_ANON_KEY ?? "",
  };
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          media="all"
        />
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__SUPABASE_CONFIG=${JSON.stringify(supabaseConfig)};`,
          }}
        />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
