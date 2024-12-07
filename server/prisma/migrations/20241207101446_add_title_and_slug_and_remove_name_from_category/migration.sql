/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Category_name_key` ON `Category`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `name`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT '';
