import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BugFilters } from "../components/BugFilters";
import { BugTable } from "../components/BugTable";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteBug, fetchBugs } from "../redux/bugsSlice";
import type { BugSeverity, BugStatus } from "../types/bug";

export function BugListPage() {
  const dispatch = useAppDispatch();
  const { bugs, loading, error } = useAppSelector((state) => state.bugs);

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<"All" | BugSeverity>("All");
  const [status, setStatus] = useState<"All" | BugStatus>("All");

  useEffect(() => {
    dispatch(fetchBugs);
  }, [dispatch, bugs]);

  const visibleBugs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bugs.filter((bug) => {
      const matchesSearch =
        query.length === 0 ||
        bug.title.toLowerCase().includes(query) ||
        bug.description.toLowerCase().includes(query);
      const matchesSeverity = severity === "All" || bug.severity === severity;
      const matchesStatus = status === "All" || bug.status === status;
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [bugs, search, severity, status]);

  const openCount = bugs.filter((bug) => bug.status !== "Closed").length;

  return (
    <section className="stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Registre des incidents</p>
          <h2>Bogues actifs</h2>
          <p className="lede">
            {bugs.length} entrée{bugs.length > 1 ? "s" : ""} · {openCount} encore
            ouverte{openCount > 1 ? "s" : ""}
          </p>
        </div>
        <Link className="btn btn-primary" to="/bugs/new">
          Signaler un bogue
        </Link>
      </div>

      <BugFilters
        search={search}
        severity={severity}
        status={status}
        onSearchChange={setSearch}
        onSeverityChange={setSeverity}
        onStatusChange={setStatus}
        onReset={() => {
          setSearch("");
          setSeverity("All");
          setStatus("All");
        }}
      />

      {error && <div className="banner banner-error">{error}</div>}
      {loading && <div className="banner">Chargement des bogues…</div>}

      <BugTable
        bugs={visibleBugs}
        onDelete={(id) => {
          dispatch(deleteBug(id));
        }}
      />
    </section>
  );
}
