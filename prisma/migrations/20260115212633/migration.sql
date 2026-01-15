/*
  Warnings:

  - You are about to drop the `Quirofano` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OperatingRoomStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'UNDER_MAINTENANCE');

-- DropTable
DROP TABLE "Quirofano";

-- DropEnum
DROP TYPE "QuirofanoEstado";

-- CreateTable
CREATE TABLE "OperatingRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "OperatingRoomStatus" NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperatingRoom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OperatingRoom_name_key" ON "OperatingRoom"("name");
