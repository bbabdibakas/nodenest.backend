/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");
