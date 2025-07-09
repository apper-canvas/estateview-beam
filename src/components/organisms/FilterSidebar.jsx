import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FilterSection from "@/components/molecules/FilterSection";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle,
  className = "" 
}) => {
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <ApperIcon name="Filter" size={18} className="mr-2" />
            Filters
          </div>
          <ApperIcon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={18} 
          />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${className}`}>
        <FilterSection
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          isOpen={isOpen}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50"
              onClick={onToggle}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto p-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-gray-900">
                  Filter Properties
                </h2>
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>
              
              <FilterSection
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
                isOpen={isOpen}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;