export class Product {
    id: number;
    title: string;
    image?: string;
    price: number;
    details?: string;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(
      id: number,
      title: string,
      price: number,
      image?: string,
      details?: string,
      createdAt?: Date,
      updatedAt?: Date
    ) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.image = image;
      this.details = details;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  