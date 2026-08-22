import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { BackToTop } from "../ui/BackToTop";
import { ErrorBoundary } from "../ErrorBoundary";

export function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change for a proper page-navigation feel.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start">
          <Sidebar />
          <main className="flex-1 min-w-0 w-full pb-10">
            <Outlet />
          </main>
        </div>
        <Footer />
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}
