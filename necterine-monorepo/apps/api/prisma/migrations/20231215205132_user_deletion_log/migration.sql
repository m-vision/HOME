-- CreateTable
CREATE TABLE "UserDeletionLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "reason" TEXT,
    "userCreatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDeletionLog_pkey" PRIMARY KEY ("id")
);
