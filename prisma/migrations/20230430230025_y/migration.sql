/*
  Warnings:

  - You are about to drop the column `userId` on the `Search` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Search` DROP FOREIGN KEY `Search_userId_fkey`;

-- AlterTable
ALTER TABLE `Search` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Search` ADD CONSTRAINT `Search_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
