import propertyData from "@/services/mockData/properties.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyService = {
  async getAll() {
    await delay(300);
    return [...propertyData];
  },

  async getById(id) {
    await delay(250);
    const property = propertyData.find(p => p.Id === id);
    if (!property) {
      throw new Error("Property not found");
    }
    return { ...property };
  },

  async create(property) {
    await delay(400);
    const newProperty = {
      ...property,
      Id: Math.max(...propertyData.map(p => p.Id)) + 1,
      listingDate: new Date().toISOString(),
    };
    propertyData.push(newProperty);
    return { ...newProperty };
  },

  async update(id, updates) {
    await delay(350);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    const updatedProperty = { ...propertyData[index], ...updates };
    propertyData[index] = updatedProperty;
    return { ...updatedProperty };
  },

  async delete(id) {
    await delay(300);
    const index = propertyData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }
    const deletedProperty = propertyData.splice(index, 1)[0];
    return { ...deletedProperty };
  },
};