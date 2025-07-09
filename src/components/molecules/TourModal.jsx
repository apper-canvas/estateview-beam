import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, startOfToday, isBefore, isToday } from "date-fns";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { tourService } from "@/services/api/tourService";
import { toast } from "react-toastify";

const TourModal = ({ isOpen, onClose, property }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = startOfToday();
    
    for (let i = 0; i < 45; i++) {
      const date = addDays(today, i);
      const dayOfWeek = date.getDay();
      
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(date);
      }
      
      // Stop when we have 30 business days
      if (dates.length >= 30) break;
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Load available time slots when date changes
  useEffect(() => {
    if (selectedDate && property) {
      loadAvailableTimeSlots();
    }
  }, [selectedDate, property]);

  const loadAvailableTimeSlots = async () => {
    try {
      setLoadingTimeSlots(true);
      const slots = await tourService.getAvailableTimeSlots(property.Id, selectedDate);
      setAvailableTimeSlots(slots);
      setSelectedTime(""); // Reset selected time
    } catch (error) {
      toast.error("Failed to load available time slots");
      setAvailableTimeSlots([]);
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedDate || !selectedTime || !formData.customerName || !formData.customerEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      
      const tourData = {
        propertyId: property.Id,
        tourDate: selectedDate,
        tourTime: selectedTime,
        ...formData
      };

      await tourService.create(tourData);
      
      toast.success("Tour scheduled successfully! We'll contact you soon to confirm.");
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to schedule tour. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedDate("");
    setSelectedTime("");
    setAvailableTimeSlots([]);
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      message: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-900">
                  Schedule Property Tour
                </h2>
                <p className="text-gray-600 mt-1">
                  {property?.title}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-8 w-8 p-0"
              >
                <ApperIcon name="X" size={16} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tour-date">
                    Preferred Date <span className="text-error">*</span>
                  </Label>
                  <Select
                    id="tour-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  >
                    <option value="">Select a date</option>
                    {availableDates.map((date) => (
                      <option key={date.toISOString()} value={format(date, "yyyy-MM-dd")}>
                        {format(date, "EEEE, MMMM d, yyyy")}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tour-time">
                    Preferred Time <span className="text-error">*</span>
                  </Label>
                  <Select
                    id="tour-time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    disabled={!selectedDate || loadingTimeSlots}
                    required
                  >
                    <option value="">
                      {loadingTimeSlots ? "Loading times..." : "Select a time"}
                    </option>
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Select>
                  {selectedDate && availableTimeSlots.length === 0 && !loadingTimeSlots && (
                    <p className="text-sm text-warning mt-1">
                      No available time slots for this date
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customer-name">
                    Full Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="customer-name"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customer-email">
                    Email Address <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="customer-email"
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="customer-phone">
                  Phone Number
                </Label>
                <Input
                  id="customer-phone"
                  name="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">
                  Additional Message
                </Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any specific requests or questions?"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !selectedDate || !selectedTime || !formData.customerName || !formData.customerEmail}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Calendar" size={16} className="mr-2" />
                      Schedule Tour
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-surface rounded-lg border border-gray-200">
              <div className="flex items-start">
                <ApperIcon name="Info" size={16} className="text-info mr-3 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Tour Information:</p>
                  <ul className="space-y-1">
                    <li>• Tours are available Monday-Friday, 9 AM - 5 PM</li>
                    <li>• A licensed agent will accompany you during the tour</li>
                    <li>• Please arrive 5 minutes early</li>
                    <li>• We'll send a confirmation email with details</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourModal;