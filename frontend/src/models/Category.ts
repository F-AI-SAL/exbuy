// frontend/src/models/Category.ts
import mongoose, { Schema, model, models, Document } from 'mongoose';

// Strongly typed Category interface
export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Enterprise‑grade schema definition
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      maxlength: [100, 'Category name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      trim: true,
      lowercase: true,
      unique: true, // enforce uniqueness for SEO‑friendly URLs
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    versionKey: false, // remove __v field for cleaner documents
  }
);

// Index for faster queries on slug
CategorySchema.index({ slug: 1 });

// Safe model export (prevents recompilation in dev mode)
const Category =
  (models.Category as mongoose.Model<ICategory>) ||
  model<ICategory>('Category', CategorySchema);

export default Category;
