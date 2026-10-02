/*
  Warnings:

  - A unique constraint covering the columns `[customerId,providerId]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Conversation_customerId_idx" ON "Conversation"("customerId");

-- CreateIndex
CREATE INDEX "Conversation_providerId_idx" ON "Conversation"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_customerId_providerId_key" ON "Conversation"("customerId", "providerId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "ProviderProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
