const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock tour bookings data
let tourBookings = [
  {
    Id: 1,
    propertyId: 1,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "555-0123",
    tourDate: "2024-01-15",
    tourTime: "10:00 AM",
    message: "Looking forward to viewing this property",
    status: "confirmed",
    createdAt: new Date().toISOString()
  },
  {
    Id: 2,
    propertyId: 2,
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "555-0456",
    tourDate: "2024-01-16",
    tourTime: "2:00 PM",
    message: "Interested in scheduling a tour",
    status: "pending",
    createdAt: new Date().toISOString()
  }
];

// Generate next available ID
const getNextId = () => {
  return tourBookings.length > 0 ? Math.max(...tourBookings.map(t => t.Id)) + 1 : 1;
};

// Available time slots for tours
const getAvailableTimeSlots = () => [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM"
];

export const tourService = {
  async getAll() {
    await delay(300);
    return [...tourBookings];
  },

  async getById(id) {
    await delay(250);
    const tour = tourBookings.find(t => t.Id === id);
    if (!tour) {
      throw new Error("Tour booking not found");
    }
    return { ...tour };
  },

  async getByPropertyId(propertyId) {
    await delay(300);
    return tourBookings.filter(t => t.propertyId === propertyId);
  },

  async create(tourData) {
    await delay(400);
    
    // Validate required fields
    if (!tourData.propertyId || !tourData.customerName || !tourData.customerEmail || 
        !tourData.tourDate || !tourData.tourTime) {
      throw new Error("Missing required fields");
    }

    // Check if time slot is already booked for the same property and date
    const existingBooking = tourBookings.find(
      t => t.propertyId === tourData.propertyId && 
           t.tourDate === tourData.tourDate && 
           t.tourTime === tourData.tourTime &&
           t.status !== "cancelled"
    );

    if (existingBooking) {
      throw new Error("This time slot is already booked");
    }

    const newTour = {
      Id: getNextId(),
      propertyId: parseInt(tourData.propertyId),
      customerName: tourData.customerName,
      customerEmail: tourData.customerEmail,
      customerPhone: tourData.customerPhone || "",
      tourDate: tourData.tourDate,
      tourTime: tourData.tourTime,
      message: tourData.message || "",
      status: "pending",
      createdAt: new Date().toISOString()
    };

    tourBookings.push(newTour);
    return { ...newTour };
  },

  async update(id, updates) {
    await delay(350);
    const index = tourBookings.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Tour booking not found");
    }

    const updatedTour = { 
      ...tourBookings[index], 
      ...updates,
      Id: tourBookings[index].Id // Prevent ID changes
    };
    
    tourBookings[index] = updatedTour;
    return { ...updatedTour };
  },

  async delete(id) {
    await delay(300);
    const index = tourBookings.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Tour booking not found");
    }
    
    const deletedTour = tourBookings.splice(index, 1)[0];
    return { ...deletedTour };
  },

  async getAvailableTimeSlots(propertyId, date) {
    await delay(200);
    const allSlots = getAvailableTimeSlots();
    
    // Get booked slots for the specific property and date
    const bookedSlots = tourBookings
      .filter(t => 
        t.propertyId === propertyId && 
        t.tourDate === date && 
        t.status !== "cancelled"
      )
      .map(t => t.tourTime);

    // Return available slots (not booked)
    return allSlots.filter(slot => !bookedSlots.includes(slot));
  }
};