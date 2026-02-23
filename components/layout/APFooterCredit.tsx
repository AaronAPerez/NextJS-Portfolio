import React from "react";
import Link from "next/link";

interface APFooterCreditProps {
  iconSrc?: string;     // geometric blocks icon
  className?: string;   // optional styling overrides
  utmSource?: string;   // track which site the click came from
}

export const APFooterCredit: React.FC<APFooterCreditProps> = ({
  iconSrc = "/favicon-48x48.svg", // export just the blocks as a separate file
  className = "",
  utmSource = "footer",
}) => {
  return (
    <footer className={`py-8 text-center ${className}`}>
      <div className="inline-flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">

        {/* LEFT: Logo Icon */}
        <img
          src={iconSrc}
          alt="AP Designs Logo Icon"
          className="h-8 w-auto opacity-90"
        />

        {/* RIGHT: Text */}
        <div className="flex flex-col items-start leading-tight text-sm">
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
};