import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No properties found", 
  description = "Try adjusting your search criteria or browse all available properties.",
  showBrowseButton = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Home" size={36} className="text-accent" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {showBrowseButton && (
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="inline-flex items-center"
            >
              <ApperIcon name="RotateCcw" size={18} className="mr-2" />
              Refresh
            </Button>
            <Link to="/browse">
              <Button variant="primary" className="inline-flex items-center">
                <ApperIcon name="Search" size={18} className="mr-2" />
                Browse All
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;