import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import { propertyService } from "@/services/api/propertyService";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulate saved properties - in real app, this would come from user's saved list
      const allProperties = await propertyService.getAll();
      // For demo, show first 3 properties as "saved"
      const saved = allProperties.slice(0, 3);
      setSavedProperties(saved);
    } catch (err) {
      setError("Failed to load saved properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const handleClearAll = () => {
    setSavedProperties([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              Your favorite properties in one place
            </p>
          </div>
          
          {savedProperties.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-error border-error hover:bg-error hover:text-white"
            >
              <ApperIcon name="Trash2" size={18} className="mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {savedProperties.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {savedProperties.length} {savedProperties.length === 1 ? "property" : "properties"} saved
              </span>
              <div className="flex items-center gap-4">
                <span>Sort by:</span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>Recently Saved</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Square Feet</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {savedProperties.length === 0 && !loading && !error ? (
        <Empty 
          title="No saved properties yet"
          description="Start browsing properties and save your favorites to see them here."
          showBrowseButton={true}
        />
      ) : (
        <PropertyGrid
          properties={savedProperties}
          loading={loading}
          error={error}
          onRetry={loadSavedProperties}
        />
      )}
    </div>
  );
};

export default SavedProperties;