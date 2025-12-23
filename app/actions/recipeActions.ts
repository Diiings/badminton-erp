'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

// Fungsi Simpan Resep
export async function addIngredient(formData: FormData) {
  const productId = formData.get('productId') as string;
  const materialId = formData.get('materialId') as string;
  const quantity = Number(formData.get('quantity'));

  // 1. Cek apakah produk ini sudah punya "Wadah Resep"? Kalau belum, buat dulu.
  let recipe = await prisma.recipe.findFirst({
    where: { productId: productId }
  });

  if (!recipe) {
    recipe = await prisma.recipe.create({
      data: { productId: productId }
    });
  }

  // 2. Masukkan bahan ke dalam resep tersebut
  await prisma.recipeItem.create({
    data: {
      recipeId: recipe.id,
      materialId: materialId,
      quantityNeeded: quantity
    }
  });

  revalidatePath('/dashboard/recipes');
}

// Fungsi Hapus Bahan dari Resep (Jika salah input)
export async function removeIngredient(ingredientId: string) {
  await prisma.recipeItem.delete({
    where: { id: ingredientId }
  });
  revalidatePath('/dashboard/recipes');
}