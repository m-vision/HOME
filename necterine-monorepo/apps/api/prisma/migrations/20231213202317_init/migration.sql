-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'AGENDER', 'ANDROGYNE', 'ANDROGYNOUS', 'BISGENDER', 'CISGENDER', 'DEMIROMANTIC', 'GENDERFLUID', 'GENDER_NONCONFORMING', 'GENDERQUEER', 'GENDER_QUESTIONING', 'INTERSEX', 'PANGENDER', 'TRANS_MAN', 'TRANS_WOMAN', 'TRANSFERMININE', 'TRANSMASCULINE', 'TWO_SPIRIT', 'QUEER');

-- CreateEnum
CREATE TYPE "PRONOUN" AS ENUM ('HE_HIM', 'SHE_HER', 'THEY_THEM');

-- CreateEnum
CREATE TYPE "CONNECTION_TYPE" AS ENUM ('LONG_TERM_RELATIONSHIP', 'CASUAL_DATING', 'FRIENDSHIP', 'SHORT_TERM_RELATIONSHIP', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "SEXUAL_ORIENTATION" AS ENUM ('STRAIGHT', 'GAY', 'LESBIAN', 'BISEXUAL', 'ALLOSEXUAL', 'ANDROGYNOSEXUAL', 'ASEXUAL', 'AUTOSEXUAL', 'BICURIOUS', 'DEMISEXUAL', 'GRAY_A', 'GYNOSEXUAL', 'HETEROFLEXIBLE', 'HOMOFLEXIBLE', 'OBJECTOPHILIA', 'OMNISEXUAL', 'PANSEXUAL', 'POLISEXUAL', 'QUEER', 'SKOLIOSEXUAL', 'QUESTIONING');

-- CreateEnum
CREATE TYPE "MATCH_STATUS" AS ENUM ('ACCEPTED', 'DECLINED', 'CANCELED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceToken" TEXT,
    "gender" "GENDER",

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "photos" TEXT[],
    "bio" TEXT,
    "pronouns" "PRONOUN"[],
    "displayPronouns" BOOLEAN DEFAULT false,
    "sexualOrientation" "SEXUAL_ORIENTATION",
    "displaySexualOrientation" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionnaireAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT,
    "subtitle" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "QuestionnaireAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionnaireQuestion" (
    "id" TEXT NOT NULL,
    "questionnaireId" TEXT,
    "subtitle" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "QuestionnaireQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "minDistance" INTEGER,
    "maxDistance" INTEGER,
    "genderPreferences" "GENDER"[],
    "displayGenderPreferences" BOOLEAN DEFAULT false,
    "preferredConnectionType" "CONNECTION_TYPE",
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialMatch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "potentialMatchUserId" TEXT NOT NULL,
    "score" DOUBLE PRECISION,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PotentialMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "likingUserId" TEXT NOT NULL,
    "likedUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "userOneId" TEXT NOT NULL,
    "userTwoId" TEXT NOT NULL,
    "matchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MATCH_STATUS" NOT NULL,
    "lastActivityAt" TIMESTAMP(3),

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inAppNotifications" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileAnswers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPreference_userId_key" ON "MatchPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_userId_key" ON "Location"("userId");

-- CreateIndex
CREATE INDEX "potential_match_index" ON "PotentialMatch"("userId", "potentialMatchUserId");

-- CreateIndex
CREATE INDEX "idx_likingUser_likedUser" ON "Like"("likingUserId", "likedUserId");

-- CreateIndex
CREATE INDEX "user_one_index" ON "Match"("userOneId");

-- CreateIndex
CREATE INDEX "user_two_index" ON "Match"("userTwoId");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileAnswers_AB_unique" ON "_ProfileAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileAnswers_B_index" ON "_ProfileAnswers"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireAnswer" ADD CONSTRAINT "QuestionnaireAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestionnaireQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionnaireQuestion" ADD CONSTRAINT "QuestionnaireQuestion_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPreference" ADD CONSTRAINT "MatchPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialMatch" ADD CONSTRAINT "PotentialMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialMatch" ADD CONSTRAINT "PotentialMatch_potentialMatchUserId_fkey" FOREIGN KEY ("potentialMatchUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likingUserId_fkey" FOREIGN KEY ("likingUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileAnswers" ADD CONSTRAINT "_ProfileAnswers_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileAnswers" ADD CONSTRAINT "_ProfileAnswers_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionnaireAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
