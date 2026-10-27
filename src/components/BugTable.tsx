import { Link } from "react-router-dom";
import type { Bug } from "../types/bug";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

interface BugTableProps {
  bugs: Bug[];
  onDelete: (id: number) => void;
}

export function BugTable({ bugs, onDelete }: BugTableProps) {
  if (bugs.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucun bogue ne correspond aux filtres actuels.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="bugs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Sévérité</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id}>
              <td className="mono">#{bug.id}</td>
              <td>
                <strong>{bug.title}</strong>
                <p className="muted">{bug.description}</p>
              </td>
              <td>
                <SeverityBadge severity={bug.severity} />
              </td>
              <td>
                <StatusBadge status={bug.status} />
              </td>
              <td className="actions">
                <Link className="btn btn-small" to={`/bugs/${bug.id}/edit`}>
                  Modifier
                </Link>
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={() => onDelete(bug.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
