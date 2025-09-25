import FuelCalculator from "./components/Calculator/FuelCalculator";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-6 sm:py-8 lg:py-12">
          <FuelCalculator />
        </main>
      </div>
    </div>
  );
}

export default App;
