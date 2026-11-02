import { useNavigate } from "react-router-dom";
import { BugForm } from "../components/BugForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createBug } from "../redux/bugsSlice";
import type { BugDraft } from "../types/bug";

const emptyBug: BugDraft = {
  title: "",
  description: "",
  severity: "Medium",
  status: "Open",
};

export function BugCreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { saving, error } = useAppSelector((state) => state.bugs);

  async function handleSubmit(values: BugDraft) {
    try {
      await dispatch(createBug(values)).unwrap();
      navigate("/");
    } catch {
      // L'erreur est déjà affichée via le store Redux.
    }
  }

  return (
    <section className="stack narrow">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Nouveau ticket</p>
          <h2>Signaler un bogue</h2>
          <p className="lede">
            Décrivez le problème avec assez de détail pour qu’un autre développeur
            puisse le reproduire.
          </p>
        </div>
      </div>
      {error && <div className="banner banner-error">{error}</div>}
      <div className="panel">
        <BugForm
          initialValues={emptyBug}
          submitLabel="Créer le bogue"
          busy={saving}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </div>
    </section>
  );
}
