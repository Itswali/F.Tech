import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  storage?: string[];
  ram?: string;
  color?: string;
  colorHex?: string;
  condition: string;
  warranty: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  featured?: boolean;
}

const ProductSchema: Schema = new Schema({
  slug:          { type: String, required: true },
  name:          { type: String, required: true },
  brand:         { type: String, required: true },
  category:      { type: String, required: true },
  price:         { type: Number, required: true },
  originalPrice: { type: Number },
  storage:       [{ type: String }],
  ram:           { type: String },
  color:         { type: String },
  colorHex:      { type: String },
  condition:     { type: String, required: true },
  warranty:      { type: String, required: true },
  inStock:       { type: Boolean, default: true },
  rating:        { type: Number, default: 0 },
  reviews:       { type: Number, default: 0 },
  images:        [{ type: String }],
  description:   { type: String, required: true },
  features:      [{ type: String }],
  specs:         { type: Schema.Types.Mixed, default: {} },
  featured:      { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.model<IProduct>('Product', ProductSchema);
