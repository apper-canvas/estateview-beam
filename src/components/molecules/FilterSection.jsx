import React from "react";
import { motion } from "framer-motion";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSection = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen = true 
}) => {
  const handleInputChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value
    });
  };

  const handlePropertyTypeChange = (type) => {
    const currentTypes = filters.propertyTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    onFilterChange({
      ...filters,
      propertyTypes: newTypes
    });
  };

  const propertyTypes = ["House", "Apartment", "Condo", "Townhouse", "Villa"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          Filter Properties
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-secondary hover:text-secondary/80"
        >
          <ApperIcon name="X" size={16} className="mr-1" />
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div>
        <Label>Price Range</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ""}
              onChange={(e) => handleInputChange("minPrice", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ""}
              onChange={(e) => handleInputChange("maxPrice", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <Label>Minimum Bedrooms</Label>
        <Select
          value={filters.minBeds || ""}
          onChange={(e) => handleInputChange("minBeds", e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Any</option>
          <option value="1">1+ Bedrooms</option>
          <option value="2">2+ Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
          <option value="5">5+ Bedrooms</option>
        </Select>
      </div>

      {/* Bathrooms */}
      <div>
        <Label>Minimum Bathrooms</Label>
        <Select
          value={filters.minBaths || ""}
          onChange={(e) => handleInputChange("minBaths", e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Any</option>
          <option value="1">1+ Bathrooms</option>
          <option value="2">2+ Bathrooms</option>
          <option value="3">3+ Bathrooms</option>
          <option value="4">4+ Bathrooms</option>
        </Select>
      </div>

      {/* Property Types */}
      <div>
        <Label>Property Type</Label>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.propertyTypes?.includes(type) || false}
                onChange={() => handlePropertyTypeChange(type)}
                className="mr-3 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Square Footage */}
      <div>
        <Label>Minimum Square Feet</Label>
        <Select
          value={filters.minSquareFeet || ""}
          onChange={(e) => handleInputChange("minSquareFeet", e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Any Size</option>
          <option value="500">500+ sq ft</option>
          <option value="1000">1,000+ sq ft</option>
          <option value="1500">1,500+ sq ft</option>
          <option value="2000">2,000+ sq ft</option>
          <option value="2500">2,500+ sq ft</option>
          <option value="3000">3,000+ sq ft</option>
        </Select>
      </div>
    </motion.div>
  );
};

export default FilterSection;