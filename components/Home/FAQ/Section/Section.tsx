/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

function Section({ faq }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-start justify-between text-left text-gray-900 cursor-pointer"
      >
        <span
          className={
            open
              ? "text-base/7 font-semibold text-blue"
              : "text-base/7 font-semibold"
          }
        >
          {faq.question}
        </span>
        <span className="ml-6 flex h-7 items-center">
          {open ? (
            <MinusSmallIcon aria-hidden="true" className="size-6" />
          ) : (
            <PlusSmallIcon aria-hidden="true" className="size-6" />
          )}
        </span>
      </button>
      <div className={open ? "mt-2 pr-12" : "hidden"}>
        <p className="text-base/7 text-gray-600">{faq.answer}</p>
      </div>
    </div>
  );
}

export default Section;
