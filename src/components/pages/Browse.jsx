import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyGrid from "@/components/organisms/PropertyGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { propertyService } from "@/services/api/propertyService";

const Browse = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    minBeds: null,
    minBaths: null,
    propertyTypes: [],
    minSquareFeet: null,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      minBeds: null,
      minBaths: null,
      propertyTypes: [],
      minSquareFeet: null,
    });
  };

  const filteredProperties = properties.filter((property) => {
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.minBeds && property.bedrooms < filters.minBeds) return false;
    if (filters.minBaths && property.bathrooms < filters.minBaths) return false;
    if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) return false;
    if (filters.minSquareFeet && property.squareFeet < filters.minSquareFeet) return false;
    
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Browse Properties
            </h1>
            <p className="text-gray-600">
              Discover your dream home from our premium collection
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <ApperIcon name="Grid3X3" size={18} />
            </Button>
            <Button
              variant={viewMode === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <ApperIcon name="List" size={18} />
            </Button>
          </div>
        </div>

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
              </span>
              <div className="flex items-center gap-4">
                <span>Sort by:</span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Square Feet</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <PropertyGrid
            properties={filteredProperties}
            loading={loading}
            error={error}
            onRetry={loadProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default Browse;