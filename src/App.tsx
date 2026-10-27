import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BugListPage } from "./pages/BugListPage";
import { BugCreatePage } from "./pages/BugCreatePage";
import { BugEditPage } from "./pages/BugEditPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BugListPage />} />
        <Route path="/bugs/new" element={<BugCreatePage />} />
        <Route path="/bugs/:id/edit" element={<BugEditPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
