import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  LEGAL_POLICIES,
  type PolicyInline,
} from "@/config/legalPolicies";

function PolicyText({ parts }: { parts: PolicyInline[] }) {
  return (
    <>
      {parts.map((part, index) => {
        if (typeof part === "string") {
          return <React.Fragment key={index}>{part}</React.Fragment>;
        }
        if (part.external) {
          return (
            <a
              key={index}
              href={part.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F5F5] underline underline-offset-4"
            >
              {part.text}
            </a>
          );
        }
        return (
          <Link
            key={index}
            href={part.href}
            className="text-[#F5F5F5] underline underline-offset-4"
          >
            {part.text}
          </Link>
        );
      })}
    </>
  );
}

export default async function PolicyUtilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = LEGAL_POLICIES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="mb-8 flex items-center justify-between border-b border-[#BDBDBD]/15 pb-4">
            <Link
              href="/"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#F5F5F5]"
            >
              ← Back to Homepage
            </Link>
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A8A8A8]">
              LEGAL POLICY UTILITY
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-light text-[#F5F5F5]">
            {policy.title}
          </h1>
          {policy.updated && (
            <p className="mt-2 font-sans text-xs text-[#A8A8A8]">
              {policy.updated}
            </p>
          )}

          <div className="mt-10 space-y-8 border-t border-[#BDBDBD]/15 pt-8">
            {policy.sections.map((sec, i) => (
              <div key={i} className="space-y-4">
                {sec.heading && (
                  <h2 className="font-serif text-2xl font-normal text-[#F5F5F5]">
                    {sec.heading}
                  </h2>
                )}
                {sec.blocks.map((block, j) =>
                  block.type === "table" ? (
                    <div key={j} className="overflow-x-auto border border-[#BDBDBD]/20">
                      <table className="w-full min-w-[36rem] border-collapse text-left font-sans text-xs leading-relaxed text-[#F5F5F5]/85">
                        <thead className="bg-[#141414] text-[#A8A8A8]">
                          <tr>
                            {block.headers.map((header) => (
                              <th
                                key={header}
                                className="border-b border-[#BDBDBD]/20 px-4 py-3 font-medium uppercase tracking-[0.12em]"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row) => (
                            <tr key={row[0]} className="align-top">
                              {row.map((cell) => (
                                <td
                                  key={cell}
                                  className="border-b border-[#BDBDBD]/15 px-4 py-3"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p
                      key={j}
                      className="font-sans text-sm leading-[1.85] text-[#F5F5F5]/85"
                    >
                      <PolicyText parts={block.parts} />
                    </p>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 border border-[#BDBDBD]/20 bg-[#141414] p-6">
            <p className="font-sans text-xs text-[#A8A8A8]">
              View the canonical Shopify policy document at{" "}
              <a
                href={`https://tjvodka.co.uk/policies/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5] underline underline-offset-4"
              >
                tjvodka.co.uk/policies/{slug} ↗
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer compact />
    </div>
  );
}
