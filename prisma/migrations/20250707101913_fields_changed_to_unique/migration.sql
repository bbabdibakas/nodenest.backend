/*
  Warnings:

  - A unique constraint covering the columns `[hostId]` on the table `hosts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `hosts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ip]` on the table `hosts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "hosts_hostId_key" ON "hosts"("hostId");

-- CreateIndex
CREATE UNIQUE INDEX "hosts_name_key" ON "hosts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hosts_ip_key" ON "hosts"("ip");
