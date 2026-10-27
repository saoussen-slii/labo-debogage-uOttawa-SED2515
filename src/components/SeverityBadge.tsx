import type { BugSeverity } from "../types/bug";

const labels: Record<BugSeverity, string> = {
  Low: "Faible",
  Medium: "Moyenne",
  High: "Élevée",
};

export function SeverityBadge({ severity }: { severity: BugSeverity }) {
  return (
    <span className={`badge badge-severity-${severity.toLowerCase()}`}>
      {labels[severity]}
    </span>
  );
}
