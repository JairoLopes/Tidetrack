// src/App.tsx
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import MarineWeather from "./component/MarineWeather";
import Info from "./component/Info";
import Donate from "./component/Donate";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="overflow-x-hidden bg-gray-900 min-h-screen">
      <Navbar />
      <Home />
      <MarineWeather />
      <Info />
      <Donate />
      <Footer />
    </div>
  );
}

export default App;
