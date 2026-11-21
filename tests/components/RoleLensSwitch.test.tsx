import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RoleLensSwitch, type RoleLensCaseItem } from "@/components/hiring/RoleLensSwitch";

const replaceMock = vi.fn();
let currentRoleParam: string | null = null;

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "role" ? currentRoleParam : null),
    toString: () => (currentRoleParam ? `role=${currentRoleParam}` : ""),
  }),
  useRouter: () => ({ replace: replaceMock }),
  usePathname: () => "/en/hire",
}));

vi.mock("@/components/LocalizedLink", () => ({
  LocalizedLink: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const sampleCases: RoleLensCaseItem[] = [
  {
    slug: "walkie",
    title: "Walkie",
    kicker: "Physical AI Agent",
    sub: "Wrist voice remote for Claude Code",
    metrics: ["Dual-boot S3", "AES-256-GCM", "3 gates"],
    roleTracks: ["interaction", "design-eng", "ai-ux"],
  },
  {
    slug: "connect",
    title: "UQ Connect",
    kicker: "Product IA",
    sub: "Task-first student platform",
    metrics: ["71 records", "19 screens", "3 rounds"],
    roleTracks: ["product", "interaction"],
  },
];

describe("RoleLensSwitch", () => {
  it("renders all cases by default when no role query param is present", () => {
    currentRoleParam = null;
    render(<RoleLensSwitch cases={sampleCases} locale="en" />);
    expect(screen.getByText("Walkie")).toBeInTheDocument();
    expect(screen.getByText("UQ Connect")).toBeInTheDocument();
  });

  it("filters cases according to ?role=design-eng", () => {
    currentRoleParam = "design-eng";
    render(<RoleLensSwitch cases={sampleCases} locale="en" />);
    expect(screen.getByText("Walkie")).toBeInTheDocument();
    expect(screen.queryByText("UQ Connect")).not.toBeInTheDocument();
  });

  it("updates URL query when clicking a role tab", () => {
    currentRoleParam = null;
    replaceMock.mockClear();
    render(<RoleLensSwitch cases={sampleCases} locale="en" />);
    fireEvent.click(screen.getByRole("tab", { name: "AI UX & Trust" }));
    expect(replaceMock).toHaveBeenCalledWith("/en/hire?role=ai-ux", { scroll: false });
  });
});
