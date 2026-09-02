import Chat from "./components/Chat";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>AI Study Assistant</h1>

        <p>
          Your personal workspace for learning, practice, and AI-powered study.
        </p>
      </section>

      <section className="cards">
        <div className="card">
          <h2>AI Assistant</h2>
          <p>
            Ask questions and get help with your studies.
          </p>

          <a href="/dashboard">
            <button>Open AI Assistant</button>
          </a>
        </div>

        <div className="card">
          <h2>Study Materials</h2>
          <p>
            Access your notes, resources, and learning materials.
          </p>

          <a href="/dashboard">
            <button>View Materials</button>
          </a>
        </div>

        <div className="card">
          <h2>Practice</h2>
          <p>
            Practice questions and improve your preparation.
          </p>

          <a href="/dashboard">
            <button>Start Practice</button>
          </a>
        </div>

        <div className="card">
          <h2>Progress</h2>
          <p>
            View your learning progress and study activity.
          </p>

          <a href="/dashboard">
            <button>View Progress</button>
          </a>
        </div>
      </section>

      {/* Streaming AI Chat */}
      <section className="chat-section">
        <Chat />
      </section>
    </main>
  );
}