import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropertyCard from "@/components/molecules/PropertyCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { propertyService } from "@/services/api/propertyService";

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isListOpen, setIsListOpen] = useState(true);

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

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Error message={error} onRetry={loadProperties} />
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* Map Container */}
      <div className={`flex-1 relative ${isListOpen ? "lg:w-2/3" : "w-full"}`}>
        <div className="h-full bg-gradient-to-br from-surface/50 to-accent/20 flex items-center justify-center">
          {/* Placeholder Map */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Map" size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
              Interactive Map View
            </h3>
            <p className="text-gray-600 mb-4">
              Explore properties on an interactive map
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {properties.slice(0, 4).map((property) => (
                <motion.div
                  key={property.Id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-lg p-4 cursor-pointer"
                  onClick={() => handlePropertySelect(property)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <ApperIcon name="MapPin" size={16} className="text-primary mb-1" />
                      <p className="text-sm font-medium text-gray-900">
                        {property.city}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${property.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <ApperIcon name="Home" size={16} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsListOpen(!isListOpen)}
            className="bg-white shadow-lg"
          >
            <ApperIcon name={isListOpen ? "ChevronRight" : "ChevronLeft"} size={18} />
          </Button>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <ApperIcon name="Plus" size={18} />
          </Button>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <ApperIcon name="Minus" size={18} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-xs text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary rounded-full"></div>
              <span className="text-xs text-gray-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <span className="text-xs text-gray-600">Sold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property List Sidebar */}
      <motion.div
        initial={{ x: isListOpen ? 0 : 400 }}
        animate={{ x: isListOpen ? 0 : 400 }}
        transition={{ duration: 0.3 }}
        className={`${isListOpen ? "lg:w-1/3" : "w-0"} bg-white shadow-xl overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  Properties
                </h2>
                <p className="text-sm text-gray-600">
                  {properties.length} properties found
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsListOpen(false)}
                className="lg:hidden"
              >
                <ApperIcon name="X" size={18} />
              </Button>
            </div>
          </div>

          {/* Property List */}
          <div className="flex-1 overflow-y-auto p-4">
            {properties.length === 0 ? (
              <Empty />
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <motion.div
                    key={property.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedProperty?.Id === property.Id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => handlePropertySelect(property)}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapView;