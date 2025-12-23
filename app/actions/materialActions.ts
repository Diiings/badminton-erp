'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../../lib/prisma';

export async function addMaterial(formData: FormData) {
  const name = formData.get('name') as string;
  const unit = formData.get('unit') as string; // Contoh: "Helai", "Kg", "Pcs"
  const stock = Number(formData.get('stock'));
  const minStock = Number(formData.get('minStock'));

  await prisma.rawMaterial.create({
    data: {
      name,
      unit,
      stock,
      minStock,
    },
  });

  revalidatePath('/dashboard/materials');
}

export async function restockMaterial(formData: FormData) {
  const materialId = formData.get('id') as string;
  const quantity = Number(formData.get('quantity'));

  if (quantity > 0) {
    await prisma.rawMaterial.update({
      where: { id: materialId },
      data: {
        stock: {
          increment: quantity // FITUR PENTING: Menambah, bukan mengganti
        }
      }
    });

    revalidatePath('/dashboard/materials');
  }
}