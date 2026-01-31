import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getCurrentDictionary } from "@/lib/i18n-server";

export default function NotFound() {
  const { dict } = getCurrentDictionary();

  return (
    <section className="min-h-[70vh] flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 className="text-[150px] sm:text-[200px] font-bold text-muted/20 select-none leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl animate-bounce">🔍</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {dict.notFound.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            {dict.notFound.description}
          </p>

          {/* Main Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button href="/">{dict.notFound.goHome}</Button>
            <Button href="/projects" variant="secondary">
              {dict.notFound.viewProjects}
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Or try these popular pages:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
                { href: "/resume", label: "Resume" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
