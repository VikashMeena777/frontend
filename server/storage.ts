import { type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
  
  // Orders
  getOrders(userId?: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<Order>): Promise<Order | undefined>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.bookings = new Map();
    
    // Initialize with some sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Product[] = [
      {
        id: "1",
        title: "Premium Mega Reels Bundle",
        description: "Massive collection of high-converting reels templates with trending styles and effects",
        price: 149,
        thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        downloadUrl: "https://example.com/download/reels-bundle",
        featured: true,
        category: "templates",
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Instagram Growth Course",
        description: "Complete course to grow your Instagram organically with proven strategies",
        price: 299,
        thumbnail: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        downloadUrl: "https://example.com/download/ig-course",
        featured: true,
        category: "courses",
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "YouTube Thumbnail Pack",
        description: "High-converting thumbnail templates for YouTube content creators",
        price: 99,
        thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        downloadUrl: "https://example.com/download/thumbnails",
        featured: true,
        category: "design",
        createdAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      role: "user",
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date(),
      description: insertProduct.description || null,
      thumbnail: insertProduct.thumbnail || null,
      downloadUrl: insertProduct.downloadUrl || null,
      featured: insertProduct.featured || false,
      category: insertProduct.category || null,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, productUpdate: Partial<Product>): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { ...existing, ...productUpdate };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Orders
  async getOrders(userId?: string): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    return userId ? orders.filter(order => order.userId === userId) : orders;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date(),
      status: insertOrder.status || "pending",
      userId: insertOrder.userId || null,
      razorpayOrderId: insertOrder.razorpayOrderId || null,
      razorpayPaymentId: insertOrder.razorpayPaymentId || null,
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, orderUpdate: Partial<Order>): Promise<Order | undefined> {
    const existing = this.orders.get(id);
    if (!existing) return undefined;
    
    const updated: Order = { ...existing, ...orderUpdate };
    this.orders.set(id, updated);
    return updated;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date(),
      status: insertBooking.status || "pending",
      notes: insertBooking.notes || null,
    };
    this.bookings.set(id, booking);
    return booking;
  }
}

export const storage = new MemStorage();
