"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import type { ComponentProps, MouseEvent } from "react";
import { localizeInternalHref } from "@/lib/locale-href";
import { navigateWithViewTransition } from "@/lib/motion/view-transitions";

type TransitionLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
};

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function TransitionLink({
  href,
  onClick,
  target,
  ...props
}: TransitionLinkProps) {
  const locale = useLocale();
  const router = useRouter();
  const localizedHref = localizeInternalHref(href, locale);
  const isExternal = localizedHref.startsWith("http") || target === "_blank";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || isExternal || !isPlainLeftClick(event)) {
      return;
    }

    event.preventDefault();
    const triggerEl = event.currentTarget;
    navigateWithViewTransition({
      href: localizedHref,
      triggerEl,
      navigate: (nextHref) => {
        router.push(nextHref);
      },
    });
  };

  return (
    <NextLink
      href={localizedHref}
      target={target}
      onClick={handleClick}
      {...props}
    />
  );
}
