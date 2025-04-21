import React from "react";
import { SettingsProvider } from "./context/SettingsProvider";
import SettingsPanel from "./components/SettingsPanel";
import PostsContainer from "./components/PostsContainer";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Mirror App</h1>
        </header>

        <main className="app-content">
          <aside className="settings-sidebar">
            <SettingsPanel />
          </aside>
          <section className="posts-section">
            <PostsContainer />
          </section>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default App;
