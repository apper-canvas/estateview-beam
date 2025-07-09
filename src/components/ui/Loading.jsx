import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer" />
          
          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded-lg" />
            
            {/* Address */}
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-3/4" />
            
            {/* Property Details */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-16" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-16" />
              </div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-20" />
            </div>
            
            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-20" />
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 shimmer rounded w-24" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;