import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BugForm } from "../components/BugForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearSelectedBug, fetchBug, updateBug } from "../redux/bugsSlice";
import type { Bug, BugDraft } from "../types/bug";

export function BugEditPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedBug, loading, saving, error } = useAppSelector(
    (state) => state.bugs
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchBug(Number(id)));
    }
    return () => {
      dispatch(clearSelectedBug());
    };
  }, [dispatch, id]);

  function handleSubmit(values: BugDraft) {
    const payload = {
      title: values.title,
      description: values.description,
      severity: values.severity,
      status: values.status,
    } as Bug;

    dispatch(updateBug(payload));
    navigate("/");
  }

  if (loading && !selectedBug) {
    return <div className="banner">Chargement du bogue…</div>;
  }

  if (!selectedBug) {
    return (
      <div className="empty-state">
        <p>Ce bogue est introuvable.</p>
        <button type="button" className="btn" onClick={() => navigate("/")}>
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <section className="stack narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Ticket #{id}</p>
          <h2>Modifier le bogue</h2>
          <p className="lede">{selectedBug.title}</p>
        </div>
      </div>
      {error && <div className="banner banner-error">{error}</div>}
      <div className="panel">
        <BugForm
          initialValues={{
            title: selectedBug.title,
            description: selectedBug.description,
            severity: selectedBug.severity,
            status: selectedBug.status,
          }}
          submitLabel="Enregistrer"
          busy={saving}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </div>
    </section>
  );
}
