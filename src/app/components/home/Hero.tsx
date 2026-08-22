import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#050810]">
      {/* Abstract dark tech background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -top-[30%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#38bdf8]/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              SMART TECH.<br />
              <span className="bg-gradient-to-r from-primary to-[#38bdf8] bg-clip-text text-transparent">
                GREAT PRICES.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Premium Quality Products<br />At Affordable Prices.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/20">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                100% Original<br/>Products
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/20">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                Best Prices<br/>Guaranteed
              </div>
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/20">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                Fast & Safe<br/>Delivery
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary to-[#10b981] px-8 py-3.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(0,230,118,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,230,118,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  SHOP NOW <ChevronRight className="size-4" />
                </span>
                <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            {/* Using a placeholder for the gadget composition shown in mockup */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=1000&auto=format&fit=crop" 
                 alt="Premium tech gadgets"
                 className="h-full w-full object-cover object-center mix-blend-lighten opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-transparent to-transparent lg:block hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
