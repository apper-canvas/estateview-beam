import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyDetailsHeader from "@/components/molecules/PropertyDetailsHeader";
import ImageGallery from "@/components/molecules/ImageGallery";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { propertyService } from "@/services/api/propertyService";
import { format } from "date-fns";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getById(parseInt(id));
      setProperty(data);
    } catch (err) {
      setError("Failed to load property details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperty} />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message="Property not found" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PropertyDetailsHeader property={property} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <ImageGallery images={property.images} title={property.title} />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                About This Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </Card>
          </motion.div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <ApperIcon name="Check" size={16} className="text-success mr-3" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Property Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Property Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lot Size</span>
                  <span className="font-medium">{property.squareFeet.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed</span>
                  <span className="font-medium">
                    {format(new Date(property.listingDate), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per sq ft</span>
                  <span className="font-medium">
                    ${Math.round(property.price / property.squareFeet)}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Contact Agent
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-surface rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <ApperIcon name="User" size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Licensed Real Estate Agent</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="primary" className="flex-1">
                    <ApperIcon name="Phone" size={16} className="mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ApperIcon name="Mail" size={16} className="mr-2" />
                    Email
                  </Button>
                </div>
                
                <Button variant="secondary" className="w-full">
                  <ApperIcon name="Calendar" size={16} className="mr-2" />
                  Schedule Tour
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                Location
              </h3>
              <div className="aspect-video bg-gradient-to-br from-surface/50 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <ApperIcon name="Map" size={48} className="text-primary mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <ApperIcon name="MapPin" size={16} className="mr-2" />
                  <span className="text-sm">{property.address}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ApperIcon name="Navigation" size={16} className="mr-2" />
                  <span className="text-sm">{property.city}, {property.state} {property.zipCode}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;