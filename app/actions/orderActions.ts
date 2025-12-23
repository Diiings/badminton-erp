'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createOrder(formData: FormData) {
  const productId = formData.get('productId') as string;
  const quantity = Number(formData.get('quantity'));
  const customerName = formData.get('customer') as string;

  // 1. Ambil data produk untuk cek harga & stok
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { variants: true }
  });

  if (!product) throw new Error("Produk tidak ditemukan");
  
  // Asumsi: Kita ambil varian pertama (default)
  const variant = product.variants[0]; 

  if (variant.stock < quantity) {
    throw new Error(`Stok tidak cukup! Sisa: ${variant.stock}`);
  }

  const totalPrice = product.basePrice * quantity;

  // 2. Transaksi Database (Potong Stok + Simpan Order)
  await prisma.$transaction(async (tx) => {
    // A. Potong Stok
    await tx.productVariant.update({
      where: { id: variant.id },
      data: { stock: { decrement: quantity } }
    });

    // B. Buat Order
    await tx.order.create({
      data: {
        customer: customerName || "Peloge Umum",
        totalPrice: totalPrice,
        items: {
          create: {
            productId: productId,
            quantity: quantity,
            priceAtBuy: product.basePrice
          }
        }
      }
    });
  });

  revalidatePath('/dashboard/orders');
  revalidatePath('/dashboard/products');
  revalidatePath('/dashboard'); // Update dashboard utama juga
}