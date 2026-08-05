"use client";

import NextLink from "next/link";
import { useLocale } from "next-intl";
import type { ComponentProps } from "react";
import { localizeInternalHref } from "@/lib/locale-href";

type LocalizedLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
};

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const locale = useLocale();

  return (
    <NextLink href={localizeInternalHref(href, locale)} {...props} />
  );
}
