export default function BrandMark({ light = false }) {
  return (
    <a className={`inline-flex items-center gap-2.5 font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`} href="/" aria-label="Downbot home">
      <span className={`grid h-8 w-8 place-items-center rounded-xl ${light ? "bg-white/15" : "bg-accent"} `}>
        <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M5 8.5 12 4l7 4.5v7L12 20l-7-4.5v-7Z" stroke="white" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M9 12h6M12 9v6" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      <span className="text-[17px]">downbot</span>
    </a>
  );
}
