-- CreateTable
CREATE TABLE "UrlViews" (
    "id" TEXT NOT NULL,
    "qrCodeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "qrCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UrlViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UrlViews_date_idx" ON "UrlViews"("date");

-- CreateIndex
CREATE UNIQUE INDEX "UrlViews_qrCodeId_date_key" ON "UrlViews"("qrCodeId", "date");

-- AddForeignKey
ALTER TABLE "UrlViews" ADD CONSTRAINT "UrlViews_qrCodeId_fkey" FOREIGN KEY ("qrCodeId") REFERENCES "QrCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
