import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
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
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </ErrorBoundary>
  );
}
