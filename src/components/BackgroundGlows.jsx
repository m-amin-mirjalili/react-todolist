export default function BackgroundGlows() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute top-[-12%] right-[-10%] size-[480px] animate-drift rounded-full bg-flame-500/25 blur-[120px]" />
      <div className="absolute bottom-[-22%] left-[-12%] size-[540px] animate-drift-slow rounded-full bg-flame-700/30 blur-[130px]" />
      <div className="absolute top-1/3 left-1/2 size-[380px] -translate-x-1/2 rounded-full bg-flame-400/10 blur-[110px]" />
    </div>
  );
}
