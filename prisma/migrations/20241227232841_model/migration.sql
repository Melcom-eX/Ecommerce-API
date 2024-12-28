-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Cart_id_userId_orderId_createdAt_idx" ON "Cart"("id", "userId", "orderId", "createdAt");

-- CreateIndex
CREATE INDEX "Category_id_name_description_createdAt_idx" ON "Category"("id", "name", "description", "createdAt");

-- CreateIndex
CREATE INDEX "Order_id_userId_status_createdAt_idx" ON "Order"("id", "userId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Product_id_name_description_createdAt_sellerId_idx" ON "Product"("id", "name", "description", "createdAt", "sellerId");

-- CreateIndex
CREATE INDEX "Review_id_rating_productId_createdAt_idx" ON "Review"("id", "rating", "productId", "createdAt");

-- CreateIndex
CREATE INDEX "User_id_username_createdAt_email_idx" ON "User"("id", "username", "createdAt", "email");
