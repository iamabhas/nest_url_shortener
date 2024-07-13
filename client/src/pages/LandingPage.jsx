import AuthComponent from "../components/AuthComponent";
function LandingPage() {
  return (
    <main className="landing-container">
      <h1 className="heading">URL Shortener</h1>

      <div className="auth-container">
        <AuthComponent />
      </div>
    </main>
  );
}

export default LandingPage;
