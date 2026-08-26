const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://luckywali0986_db_user:ZsDktQG2PojBjfVq@cluster0.g9ikxxd.mongodb.net";

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");
    
    const db = mongoose.connection.db;
    
    // First let's check the indexes
    const indexes = await db.collection('products').indexes();
    console.log("Current indexes on 'products':", indexes.map(i => i.name));
    
    // Try to drop the slug index
    const hasSlugIndex = indexes.find(i => i.name === 'slug_1');
    if (hasSlugIndex) {
      await db.collection('products').dropIndex('slug_1');
      console.log("Successfully dropped unique index on 'slug'.");
    } else {
      console.log("No index named 'slug_1' found.");
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

run();
