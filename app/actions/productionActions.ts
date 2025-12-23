'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function runProduction(formData: FormData) {
  const productId = formData.get('productId') as string;
  const quantityToProduce = Number(formData.get('quantity')); // Misal: 10 Slop

  // 1. Ambil Data Resep Produk Tersebut
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      variants: true, // Untuk update stok barang jadi nanti
      recipe: {
        include: {
          materials: { include: { material: true } }
        }
      }
    }
  });

  if (!product || !product.recipe[0]) {
    throw new Error("Produk ini belum memiliki resep!");
  }

  const recipeItems = product.recipe[0].materials;
  const variantId = product.variants[0].id; // Kita asumsi update varian pertama (Default)

  // 2. CEK KETERSEDIAAN STOK BAHAN BAKU (Validasi)
  for (const item of recipeItems) {
    const totalNeeded = item.quantityNeeded * quantityToProduce;
    
    // Cek stok di database
    const currentMaterial = await prisma.rawMaterial.findUnique({
      where: { id: item.materialId }
    });

    if (!currentMaterial || currentMaterial.stock < totalNeeded) {
      // Jika kurang, hentikan proses (Throw Error)
      throw new Error(`Stok ${item.material.name} tidak cukup! Butuh: ${totalNeeded}, Ada: ${currentMaterial?.stock || 0}`);
    }
  }

  // 3. JALANKAN TRANSAKSI (Potong Bahan & Tambah Produk)
  // Prisma $transaction menjamin semua sukses atau semua gagal.
  await prisma.$transaction(async (tx) => {
    
    // A. Potong Semua Bahan Baku
    for (const item of recipeItems) {
      const totalDeduct = item.quantityNeeded * quantityToProduce;
      await tx.rawMaterial.update({
        where: { id: item.materialId },
        data: { stock: { decrement: totalDeduct } }
      });
    }

    // B. Tambah Stok Barang Jadi (Varian)
    await tx.productVariant.update({
      where: { id: variantId },
      data: { stock: { increment: quantityToProduce } }
    });

  });

  revalidatePath('/dashboard/products');
  revalidatePath('/dashboard/materials');
  revalidatePath('/dashboard/production');
}