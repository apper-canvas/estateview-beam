import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast.success("Property saved to favorites!");
    } else {
      toast.info("Property removed from favorites");
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="property-card cursor-pointer group"
      onClick={handleCardClick}
    >
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                  <ApperIcon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                  <ApperIcon name="ChevronRight" size={16} />
                </button>
              </>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              className="absolute top-3 right-3 bg-white/90 rounded-full p-2 transition-all duration-200 hover:bg-white shadow-lg"
            >
              <ApperIcon 
                name="Heart" 
                size={18} 
                className={isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}
              />
            </motion.button>

            {/* Price Badge */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
              <span className="text-lg font-bold text-primary">
                ${property.price.toLocaleString()}
              </span>
            </div>

            {/* Image Indicators */}
            {property.images.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-2">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-4">
            <ApperIcon name="MapPin" size={16} className="mr-2" />
            <span className="text-sm">{property.address}, {property.city}, {property.state}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={16} className="mr-1 text-secondary" />
                <span className="text-sm font-medium">{property.bedrooms} bed</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={16} className="mr-1 text-secondary" />
                <span className="text-sm font-medium">{property.bathrooms} bath</span>
              </div>
            </div>
            <div className="flex items-center text-accent">
              <ApperIcon name="Square" size={16} className="mr-1" />
              <span className="text-sm font-medium">{property.squareFeet.toLocaleString()} sq ft</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 bg-surface px-3 py-1 rounded-full">
              {property.propertyType}
            </span>
            <Button size="sm" variant="outline" className="text-sm">
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;