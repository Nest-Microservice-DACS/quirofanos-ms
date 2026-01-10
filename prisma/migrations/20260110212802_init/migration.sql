-- CreateEnum
CREATE TYPE "QuirofanoEstado" AS ENUM ('DISPONIBLE', 'OCUPADO', 'MANTENIMIENTO');

-- CreateTable
CREATE TABLE "Quirofano" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" "QuirofanoEstado" NOT NULL DEFAULT 'DISPONIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quirofano_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quirofano_nombre_key" ON "Quirofano"("nombre");
