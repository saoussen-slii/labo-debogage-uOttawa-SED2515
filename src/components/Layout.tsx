import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-brand">
          <span className="logo-mark">BT</span>
          <div>
            <p className="eyebrow">Outil interne · v1.2.0</p>
            <h1>Bug Tracker</h1>
          </div>
        </div>
        <nav className="topbar-nav">
          <NavLink to="/" end>
            Bogues
          </NavLink>
          <NavLink to="/bugs/new">Nouveau bogue</NavLink>
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>Équipe plateforme · build 2024.11</span>
        <span>json-server · port 3001</span>
      </footer>
    </div>
  );
}
