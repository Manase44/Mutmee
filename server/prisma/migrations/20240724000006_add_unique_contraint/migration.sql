/*
  Warnings:

  - A unique constraint covering the columns `[postLiked,userLiked]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_postLiked_userLiked_key" ON "Like"("postLiked", "userLiked");
