/*
  Warnings:

  - You are about to drop the `_ProductToWishlist` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductToWishlist" DROP CONSTRAINT "_ProductToWishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToWishlist" DROP CONSTRAINT "_ProductToWishlist_B_fkey";

-- AlterTable
ALTER TABLE "Wishlist" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ProductToWishlist";

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
