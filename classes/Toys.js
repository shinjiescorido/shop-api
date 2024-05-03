/**
 * Represents a toy with a name, ID, and price.
 */
export class Toys {
    /**
     * Creates a new Toy object.
     * 
     * @param {string} name - The name of the toy.
     * @param {string} id - The unique identifier for the toy.
     * @param {number} price - The price of the toy.
     */
    constructor(name, id, price) {
      this.name = name;
      this.id = id;
      this.price = price;
    }
  }