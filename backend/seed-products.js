import mongoose from 'mongoose';

const MONGODB_URL = "mongodb+srv://vdevwork1906_db_user:x8ZINl0wtXvT5IxP@cluster0.yhgvoic.mongodb.net/V-Cart";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        image3: { type: String, required: true },
        image4: { type: String, required: true },
        category: { type: String, required: true },
        subCategory: { type: String, required: true },
        sizes: { type: Array, required: true },
        bestseller: { type: Boolean, default: false },
        date: { type: Number, required: true },
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

const products = [
  {
    name: "Classic Denim Jacket",
    description: "A premium classic denim jacket featuring high-quality cotton construction, button closure, and chest pockets. Perfect for smart-casual wear.",
    price: 129,
    image1: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Oversized Knit Sweater",
    description: "Cozy knit sweater made with soft wool blend. Features a comfortable oversized fit and ribbed neck cuffs. Ideal for layering in colder months.",
    price: 89,
    image1: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Casual Cotton Cargo Pants",
    description: "Highly durable ripstop cotton cargo pants with multiple utility pockets, relaxed fit, and adjustable waistband cords.",
    price: 110,
    image1: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "BottomWear",
    sizes: ["M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Waterproof Winter Parka",
    description: "Insulated winter parka jacket with down-feather padding, a detachable faux-fur hood, and full weatherproofing elements.",
    price: 249,
    image1: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  },
  {
    name: "Relaxed Linen Shirt",
    description: "Breathable pure linen shirt, perfect for warm days. Features a soft collar, standard chest pocket, and a clean structured drape.",
    price: 79,
    image1: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "High-Waist Tailored Trousers",
    description: "Minimalist structured trousers featuring clean pressed pleats, dual side pockets, and a tapered elegant silhouette.",
    price: 135,
    image1: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "BottomWear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Structured Denim Vest",
    description: "Classic sleeveless jacket vest crafted from premium Indigo denim cotton. Features double chest-pockets and raw metal button snaps.",
    price: 95,
    image1: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now()
  },
  {
    name: "Premium Wool Trench Coat",
    description: "Timeless heavy wool blend double-breasted coat. Fully lined interior, deep lapels, waist tie belt, and premium structural drape.",
    price: 320,
    image1: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now()
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URL);
    console.log("Connected successfully!");

    console.log("Clearing existing products...");
    await Product.deleteMany({});
    
    console.log("Seeding products...");
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.connect(MONGODB_URL);
    await mongoose.disconnect();
    console.log("Disconnected!");
  }
}

seed();
