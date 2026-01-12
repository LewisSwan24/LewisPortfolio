import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getCurrentDictionary } from "@/lib/i18n-server";

export default function NotFound() {
  const { dict } = getCurrentDictionary();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <p className="text-sm font-medium text-accent">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {dict.notFound.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
            {dict.notFound.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button href="/">{dict.notFound.goHome}</Button>
            <Button href="/projects" variant="secondary">
              {dict.notFound.viewProjects}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
