import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";


const CTASection = () => {
  return (
    <section
      id="contact"
      className="bg-white py-20 dark:bg-gray-950 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Open to work
        </p>
        <h2
          id="cta-heading"
          className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl"
        >
          Let's build something real
        </h2>
        <p className="mb-10 text-base leading-relaxed text-gray-500 dark:text-gray-400 sm:text-lg">
          Full-time, contract, or freelance — remote-first, available in the Central
          Valley. Let's talk about your project or open role.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a> */}

          <a
            href="https://aaronaperez.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            aaronaperez.dev
          </a>
        </div>

        {/* Social links */}
        <div className="mt-10 flex items-center justify-center gap-6">
          {/* {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              {link.name}
            </a>
          ))} */}
        </div>
      </div>
    </section>
  );
}

export default CTASection;