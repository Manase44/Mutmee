/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "Like" (
    "likeId" TEXT NOT NULL,
    "postLiked" TEXT NOT NULL,
    "userLiked" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("likeId")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postLiked_fkey" FOREIGN KEY ("postLiked") REFERENCES "Post"("postId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userLiked_fkey" FOREIGN KEY ("userLiked") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
