import React from "react";
import { SettingsProvider } from "./context/SettingsProvider";
import SettingsPanel from "./components/SettingsPanel";
import PostsContainer from "./components/PostsContainer";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <div className="max-w-screen min-h-full mx-auto p-4">
        <header className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold font-serif">Mirror App</h1>
        </header>

        <main className="grid lg:grid-cols-[300px_1fr] grid-cols-1 gap-8">
          <aside className="sticky top-4 h-fit lg:mb-0 mb-8">
            <SettingsPanel />
          </aside>
          <section className="min-w-0">
            <PostsContainer />
          </section>
        </main>
      </div>
    </SettingsProvider>
  );
};

export default App;
