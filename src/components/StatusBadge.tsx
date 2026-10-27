import type { BugStatus } from "../types/bug";

const labels: Record<BugStatus, string> = {
  Open: "Ouvert",
  "In Progress": "En cours",
  Closed: "Fermé",
};

export function StatusBadge({ status }: { status: BugStatus }) {
  const slug = status.toLowerCase().replace(" ", "-");
  return <span className={`badge badge-status-${slug}`}>{labels[status]}</span>;
}
