import NextLink from "next/link";
import { getLocale } from "next-intl/server";
import type { ComponentProps } from "react";
import { localizeInternalHref } from "@/lib/locale-href";

type LocalizedServerLinkProps = Omit<
  ComponentProps<typeof NextLink>,
  "href"
> & {
  href: string;
};

export async function LocalizedServerLink({
  href,
  ...props
}: LocalizedServerLinkProps) {
  const locale = await getLocale();

  return (
    <NextLink href={localizeInternalHref(href, locale)} {...props} />
  );
}
