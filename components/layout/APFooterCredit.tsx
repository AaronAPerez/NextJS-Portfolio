import Link from "next/link";
import Image from "next/image";

interface APFooterCreditProps {
  iconSrc?: string;     // geometric blocks icon
  className?: string;   // optional styling overrides
  utmSource?: string;   // track which site the click came from
}

export function APFooterCredit({
  iconSrc = "/images/logo/ap-designs-mark.svg",
  className = "",
  utmSource = "footer",
}: APFooterCreditProps) {
  return (
    <footer className={`py-6 text-center ${className}`}>
      <div className="inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">

        {/* LEFT: Logo Icon */}
        <Image
          src={iconSrc}
          alt="AP Designs Logo Icon"
          width={32}
          height={32}
          className="h-8 w-auto opacity-90"
        />

        {/* RIGHT: Text */}
        <div className="flex flex-col items-start leading-tight text-xs">
          <span className="text-[var(--text-secondary,theme(colors.gray.500))]">
            Designed & Built by
          </span>

          <Link
            href={`https://www.aaronaperez.dev/?utm_source=${utmSource}`}
            target="_blank"
            className="font-semibold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent"
          >
            AP Designs – Web Development
          </Link>
        </div>

      </div>
    </footer>
  );
}