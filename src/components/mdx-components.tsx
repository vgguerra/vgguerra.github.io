import type { AnchorHTMLAttributes } from "react";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

function ExternalAwareLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal =
    typeof href === "string" && /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXRemoteProps["components"] = {
  a: ExternalAwareLink,
};
