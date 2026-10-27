import { useState, type FormEvent } from "react";
import type { BugDraft, BugSeverity, BugStatus } from "../types/bug";
import { SEVERITY_OPTIONS, STATUS_OPTIONS } from "../types/bug";

interface BugFormProps {
  initialValues: BugDraft;
  submitLabel: string;
  busy?: boolean;
  onSubmit: (values: BugDraft) => void;
  onCancel: () => void;
}

export function BugForm({
  initialValues,
  submitLabel,
  busy = false,
  onSubmit,
  onCancel,
}: BugFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [severity, setSeverity] = useState<BugSeverity>(initialValues.severity);
  const [status, setStatus] = useState<BugStatus>(initialValues.status);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      severity,
      status,
    });
  }

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Titre</label>
        <input
          id="title"
          required
          maxLength={80}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Résumé court du problème"
        />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          required
          rows={5}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Étapes pour reproduire, résultat observé, résultat attendu"
        />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="severity">Sévérité</label>
          <select
            id="severity"
            value={severity}
            onChange={(event) =>
              setSeverity(event.target.value as BugSeverity)
            }
          >
            {SEVERITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="status">Statut</label>
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as BugStatus)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Enregistrement…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
