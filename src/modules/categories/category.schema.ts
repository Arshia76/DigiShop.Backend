import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductSchema } from '../products/product.schema';
import { deleteFile } from '@/shared/utils';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop()
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('findOneAndDelete', async function (next) {
  try {
    const categoryID = this.getQuery()._id;
    const productModel = this.model.db.model('Product', ProductSchema);
    const products = await productModel.find({
      category: new mongoose.Types.ObjectId(categoryID),
    });

    products.forEach((product) => {
      if (product.image) deleteFile('./' + product.image);
    });
    await productModel.deleteMany({
      category: new mongoose.Types.ObjectId(categoryID),
    });
    next();
  } catch (error) {
    console.error('خطا در حذف محصول', error);
    next();
  }
});
