const Toys = require('./Toys'); // Import Toys 
const { v4: uuidv4 } = require('uuid');

  // Define the Shop class
  /**
   * Represents a shop with a name and a collection of toys.
   */
  export class Shop {
    /**
     * Creates a new Shop object with a generated unique ID and a given name.
     * 
     * @param {string} name - The name of the shop.
     */
    constructor(name) {
      this.id = uuidv4(); // Assuming uuidv4 generates a unique ID
      this.name = name;
      /**
       * An array containing all the toys in the shop.
       */
      this.toys = []; // Initialize toys as an empty array
    }
  
    /**
     * Adds a new toy to the shop's collection.
     * 
     * @param {string} name - The name of the toy to add.
     * @param {string} id - The unique identifier for the toy.
     * @param {number} price - The price of the toy.
     */
    addToy(name, id, price) {
      const newToy = new Toys(name, id, price);
      this.toys.push(newToy);
    }
  
    /**
     * Retrieves all toys currently in the shop's collection.
     * 
     * @returns {Toys[]} An array containing all the `Toys` objects in the shop.
     */
    getToys() {
      return this.toys;
    }
  }