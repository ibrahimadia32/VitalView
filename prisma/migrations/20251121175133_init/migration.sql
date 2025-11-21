-- CreateTable
CREATE TABLE "cardiovascular_data" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" INTEGER NOT NULL,
    "angina" INTEGER NOT NULL,
    "bloodPressure" INTEGER NOT NULL,
    "cholesterol" INTEGER NOT NULL,
    "glycemia" INTEGER NOT NULL,
    "ecg" INTEGER NOT NULL,
    "heartRate" INTEGER NOT NULL,
    "anginaAfterSport" INTEGER NOT NULL,
    "ecgAngina" DOUBLE PRECISION NOT NULL,
    "ecgSlope" INTEGER NOT NULL,
    "fluoroscopy" INTEGER NOT NULL,
    "thalassemia" INTEGER NOT NULL,
    "disease" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cardiovascular_data_pkey" PRIMARY KEY ("id")
);
