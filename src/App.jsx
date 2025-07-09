import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Browse from "@/components/pages/Browse";
import MapView from "@/components/pages/MapView";
import PropertyDetails from "@/components/pages/PropertyDetails";
import SavedProperties from "@/components/pages/SavedProperties";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-white via-surface/30 to-white">
        <Layout>
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/saved" element={<SavedProperties />} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;