import HeroTour from "@/components/home/HeroTour";

/**
 * Browser-chrome frame around the animated product tour. Shared by the home
 * hero and the solution pages so the product shot looks the same everywhere.
 */
export default function TourFrame() {
  return (
    <div className="dot-grid border-b border-line px-3 sm:px-8 lg:px-12">
      <figure className="overflow-hidden rounded-t-xl border border-b-0 border-line-strong bg-white shadow-[0_-2px_0_4px_rgba(27,27,61,0.04),0_30px_60px_-30px_rgba(30,27,54,0.35)]">
        <div aria-hidden="true" className="flex h-10 items-center gap-4 bg-navy px-4">
          <div className="flex shrink-0 gap-[7px]">
            <span className="block size-2.5 rounded-full bg-navy-border" />
            <span className="block size-2.5 rounded-full bg-navy-border" />
            <span className="block size-2.5 rounded-full bg-navy-border" />
          </div>
          <div className="flex min-w-0 flex-1 justify-center">
            <span className="flex h-6 max-w-full items-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-navy-line px-3.5 font-mono text-[11px] font-medium leading-none tracking-[0.04em] text-navy-text">
              <svg width="9" height="11" viewBox="0 0 9 11" className="shrink-0" fill="none" stroke="currentColor">
                <rect x=".5" y="4.5" width="8" height="6" rx="1" />
                <path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" />
              </svg>
              app.navable.com
            </span>
          </div>
          <span className="shrink-0 rounded-[4px] border border-navy-border px-2 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.12em] text-orange">
            Product tour
          </span>
        </div>
        <HeroTour />
      </figure>
    </div>
  );
}
