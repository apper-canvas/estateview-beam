import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const PropertyDetailsHeader = ({ property }) => {
  const handleSave = () => {
    toast.success("Property saved to favorites!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-4">
            <ApperIcon name="MapPin" size={18} className="mr-2" />
            <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
          </div>
          <div className="flex items-center gap-6 text-gray-700">
            <div className="flex items-center">
              <ApperIcon name="Bed" size={18} className="mr-2 text-secondary" />
              <span className="font-medium">{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Bath" size={18} className="mr-2 text-secondary" />
              <span className="font-medium">{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Square" size={18} className="mr-2 text-accent" />
              <span className="font-medium">{property.squareFeet.toLocaleString()} sq ft</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-primary mb-1">
              ${property.price.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              ${Math.round(property.price / property.squareFeet)} per sq ft
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <ApperIcon name="Share" size={16} className="mr-2" />
              Share
            </Button>
            <Button variant="secondary" size="sm" onClick={handleSave}>
              <ApperIcon name="Heart" size={16} className="mr-2" />
              Save
            </Button>
            <Button variant="primary" size="sm">
              <ApperIcon name="Phone" size={16} className="mr-2" />
              Contact Agent
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetailsHeader;