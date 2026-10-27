export type BugStatus = "Open" | "In Progress" | "Closed";

export type BugSeverity = "Low" | "Medium" | "High";

export interface Bug {
  id: number;
  title: string;
  description: string;
  severity: string;
  status: BugStatus;
}

export interface BugDraft {
  title: string;
  description: string;
  severity: BugSeverity;
  status: BugStatus;
}

export const SEVERITY_OPTIONS: BugSeverity[] = ["Low", "Medium", "High"];

export const STATUS_OPTIONS: BugStatus[] = ["Open", "In Progress", "Closed"];
