'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

// Fungsi untuk menambah produk baru ke Database
export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string; // 'MANUFACTURED' atau 'RETAIL'
  const price = Number(formData.get('price'));
  const sku = formData.get('sku') as string;
  const stock = Number(formData.get('stock'));

  // 1. Simpan Produk Induk
  const newProduct = await prisma.product.create({
    data: {
      name: name,
      type: category,
      basePrice: price,
      // 2. Sekalian Simpan Varian Default-nya
      variants: {
        create: {
          sku: sku,
          stock: stock,
          // Jika sepatu, nanti kita tambah logika size. Untuk awal kita default dulu.
        }
      }
    }
  });

  // Refresh halaman agar data baru muncul
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}