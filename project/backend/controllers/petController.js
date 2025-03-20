import Pet from '../models/Pet.js';

// Register a new pet
export const registerPet = async (req, res) => {
  try {
    const { name, type, breed, age, gender, description, price, forSale } = req.body;

    const pet = await Pet.create({
      name,
      type,
      breed,
      age,
      gender,
      description: description || '',
      price: price || 0,
      forSale: forSale || false,
      ownerId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Pet registered successfully',
      pet
    });
  } catch (error) {
    console.error('Pet registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during pet registration'
    });
  }
};

// Get user's pets
export const getUserPets = async (req, res) => {
  try {
    const pets = await Pet.find({ ownerId: req.user.id });
    res.json({
      success: true,
      pets
    });
  } catch (error) {
    console.error('Error getting user pets:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all pets
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('ownerId', 'name email');
    res.json({
      success: true,
      pets
    });
  } catch (error) {
    console.error('Error getting pets:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};