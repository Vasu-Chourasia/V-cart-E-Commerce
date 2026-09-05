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
    price: 1099,
    image1: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now() - 10000
  },
  {
    name: "Oversized Knit Sweater",
    description: "Cozy knit sweater made with soft wool blend. Features a comfortable oversized fit and ribbed neck cuffs. Ideal for layering in colder months.",
    price: 1299,
    image1: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 9000
  },
  {
    name: "Casual Cotton Cargo Pants",
    description: "Highly durable ripstop cotton cargo pants with multiple utility pockets, relaxed fit, and adjustable waistband cords.",
    price: 679,
    image1: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "BottomWear",
    sizes: ["M", "L", "XL"],
    bestseller: false,
    date: Date.now() - 8000
  },
  {
    name: "Waterproof Winter Parka",
    description: "Insulated winter parka jacket with down-feather padding, a detachable faux-fur hood, and full weatherproofing elements.",
    price: 889,
    image1: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "WinterWear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    date: Date.now() - 7000
  },
  {
    name: "Relaxed Linen Shirt",
    description: "Breathable pure linen shirt, perfect for warm days. Features a soft collar, standard chest pocket, and a clean structured drape.",
    price: 1599,
    image1: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now() - 6000
  },
  {
    name: "High-Waist Tailored Trousers",
    description: "Minimalist structured trousers featuring clean pressed pleats, dual side pockets, and a tapered elegant silhouette.",
    price: 1899,
    image1: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "BottomWear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now() - 5000
  },
  {
    name: "Structured Denim Vest",
    description: "Classic sleeveless jacket vest crafted from premium Indigo denim cotton. Features double chest-pockets and raw metal button snaps.",
    price: 1299,
    image1: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now() - 4000
  },
  {
    name: "Premium Wool Trench Coat",
    description: "Timeless heavy wool blend double-breasted coat. Fully lined interior, deep lapels, waist tie belt, and premium structural drape.",
    price: 2899,
    image1: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "WinterWear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true,
    date: Date.now() - 3500
  },
  {
    name: "Cropped Fleece Hoodie",
    description: "Soft fleece hoodie featuring a relaxed dropped shoulder fit, plush inner lining, and ribbed hems.",
    price: 1199,
    image1: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 3000
  },
  {
    name: "Slim-Fit Stretch Chinos",
    description: "Versatile stretch twill chinos tailored for a modern slim profile with clean slant pockets.",
    price: 1499,
    image1: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "BottomWear",
    sizes: ["M", "L", "XL"],
    bestseller: false,
    date: Date.now() - 2500
  },
  {
    name: "Satin Wrap Midi Dress",
    description: "Elegant liquid satin wrap dress with an adjustable waist sash tie and subtle V-neckline.",
    price: 2299,
    image1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 2000
  },
  {
    name: "Ribbed Organic Crewneck Tee",
    description: "Heavyweight 100% organic cotton jersey tee with a durable ribbed collar and structured fit.",
    price: 799,
    image1: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now() - 1500
  },
  {
    name: "Pleated A-Line Midi Skirt",
    description: "High-rise pleated midi skirt crafted from fluid crepe fabric with a soft elastic waistband.",
    price: 1399,
    image1: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "BottomWear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: Date.now() - 1000
  },
  {
    name: "Quilted Puffer Winter Jacket",
    description: "Lightweight weather-resistant quilted puffer jacket with thermal insulation and high zip collar.",
    price: 2499,
    image1: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "WinterWear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 800
  },
  {
    name: "Vintage Graphic Fleece Sweatshirt",
    description: "Retro crewneck sweatshirt featuring washed vintage fleece fabric and ribbed cuffs.",
    price: 999,
    image1: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600",
    category: "Men",
    subCategory: "TopWear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: Date.now() - 500
  },
  {
    name: "Tailored Single-Breasted Blazer",
    description: "Structured wool-blend blazer featuring notched lapels, horn button closure, and flap pockets.",
    price: 2799,
    image1: "https://images.unsplash.com/photo-1548624149-f1e679b3240e?auto=format&fit=crop&q=80&w=600",
    image2: "https://images.unsplash.com/photo-1548624149-f1e679b3240e?auto=format&fit=crop&q=80&w=600",
    image3: "https://images.unsplash.com/photo-1548624149-f1e679b3240e?auto=format&fit=crop&q=80&w=600",
    image4: "https://images.unsplash.com/photo-1548624149-f1e679b3240e?auto=format&fit=crop&q=80&w=600",
    category: "Women",
    subCategory: "TopWear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: Date.now() - 200
  }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URL);
    console.log("Connected successfully!");

    console.log("Clearing existing products...");
    await Product.deleteMany({});
    
    console.log("Seeding 16 products...");
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected!");
  }
}

seed();
