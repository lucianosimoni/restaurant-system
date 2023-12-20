-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "credential" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "staffInfoId" INTEGER NOT NULL,
    "sectorId" INTEGER,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffInfo" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',

    CONSTRAINT "StaffInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "parentSectorId" INTEGER,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorLeader" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "sectorId" INTEGER NOT NULL,

    CONSTRAINT "SectorLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "categoryInfoId" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryInfo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "imageURL" TEXT,

    CONSTRAINT "CategoryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "code" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "itemInfoId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInfo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "imageURL" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL DEFAULT '00',
    "unitSystem" TEXT NOT NULL DEFAULT 'UN',

    CONSTRAINT "ItemInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Screen" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "screenInfoId" INTEGER NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScreenInfo" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "path" TEXT NOT NULL,

    CONSTRAINT "ScreenInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ScreenToSector" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_credential_key" ON "Staff"("credential");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_staffInfoId_key" ON "Staff"("staffInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_title_key" ON "Sector"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SectorLeader_staffId_key" ON "SectorLeader"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "SectorLeader_sectorId_key" ON "SectorLeader"("sectorId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryInfoId_key" ON "Category"("categoryInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_code_key" ON "Item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Item_title_key" ON "Item"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Item_itemInfoId_key" ON "Item"("itemInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Screen_title_key" ON "Screen"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Screen_screenInfoId_key" ON "Screen"("screenInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "ScreenInfo_path_key" ON "ScreenInfo"("path");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToItem_AB_unique" ON "_CategoryToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToItem_B_index" ON "_CategoryToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ScreenToSector_AB_unique" ON "_ScreenToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_ScreenToSector_B_index" ON "_ScreenToSector"("B");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_staffInfoId_fkey" FOREIGN KEY ("staffInfoId") REFERENCES "StaffInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_parentSectorId_fkey" FOREIGN KEY ("parentSectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorLeader" ADD CONSTRAINT "SectorLeader_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorLeader" ADD CONSTRAINT "SectorLeader_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryInfoId_fkey" FOREIGN KEY ("categoryInfoId") REFERENCES "CategoryInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemInfoId_fkey" FOREIGN KEY ("itemInfoId") REFERENCES "ItemInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_screenInfoId_fkey" FOREIGN KEY ("screenInfoId") REFERENCES "ScreenInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreenToSector" ADD CONSTRAINT "_ScreenToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScreenToSector" ADD CONSTRAINT "_ScreenToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
