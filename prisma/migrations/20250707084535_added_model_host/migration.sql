-- CreateEnum
CREATE TYPE "HostStatus" AS ENUM ('initializing', 'running', 'deleting', 'offline', 'starting', 'stopping', 'error');

-- CreateTable
CREATE TABLE "hosts" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" "HostStatus" NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "ip" TEXT NOT NULL,
    "isIpBlocked" BOOLEAN NOT NULL,
    "isUnreachable" BOOLEAN,
    "isConfigFileExists" BOOLEAN,
    "wabaHealthStatusCode" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hosts_pkey" PRIMARY KEY ("id")
);
