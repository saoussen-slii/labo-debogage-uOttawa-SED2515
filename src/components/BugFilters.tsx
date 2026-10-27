import type { BugSeverity, BugStatus } from "../types/bug";
import { SEVERITY_OPTIONS, STATUS_OPTIONS } from "../types/bug";

interface BugFiltersProps {
  search: string;
  severity: "All" | BugSeverity;
  status: "All" | BugStatus;
  onSearchChange: (value: string) => void;
  onSeverityChange: (value: "All" | BugSeverity) => void;
  onStatusChange: (value: "All" | BugStatus) => void;
  onReset: () => void;
}

export function BugFilters({
  search,
  severity,
  status,
  onSearchChange,
  onSeverityChange,
  onStatusChange,
  onReset,
}: BugFiltersProps) {
  return (
    <section className="filters-card">
      <div className="field">
        <label htmlFor="search">Recherche</label>
        <input
          id="search"
          type="search"
          placeholder="Titre ou description…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="severity-filter">Sévérité</label>
        <select
          id="severity-filter"
          value={severity}
          onChange={(event) =>
            onSeverityChange(event.target.value as "All" | BugSeverity)
          }
        >
          <option value="All">Toutes</option>
          {SEVERITY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="status-filter">Statut</label>
        <select
          id="status-filter"
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as "All" | BugStatus)
          }
        >
          <option value="All">Tous</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="btn btn-ghost" onClick={onReset}>
        Réinitialiser
      </button>
    </section>
  );
}
