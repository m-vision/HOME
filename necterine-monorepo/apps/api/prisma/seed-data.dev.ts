import {
  PrismaClient,
  GENDER,
  PRONOUN,
  CONNECTION_TYPE,
  SEXUAL_ORIENTATION,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // User 1 - Located in Salvador, Bahia, Brazil
  const user1 = {
    email: 'joao@example.com',
    name: 'João',
    gender: GENDER.MALE,
    dateOfBirth: new Date('1988-05-15T00:00:00.000Z'),
    location: {
      create: {
        latitude: -12.9777,
        longitude: -38.5014,
        city: 'Salvador',
        state: 'BA',
        country: 'Brazil',
      },
    },
    matchPreferences: {
      create: {
        minAge: 20,
        maxAge: 30,
        genderPreferences: {
          set: [GENDER.FEMALE],
        },
        preferredConnectionType: CONNECTION_TYPE.FRIENDSHIP,
      },
    },
    profile: {
      create: {
        bio: 'I am a software engineer from Brazil.',
        pronouns: {
          set: [PRONOUN.HE_HIM],
        },
        displayPronouns: true,
        sexualOrientation: SEXUAL_ORIENTATION.GAY,
        photos: {
          set: [
            'https://necterine-staging-content.s3.us-east-2.amazonaws.com/users/test/beach.png',
          ],
        },
        questionnaireAnswers: {
          connect: [
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-004' },
          ],
        },
      },
    },
  };
  await prisma.user.upsert({
    where: { email: 'joao@example.com' },
    update: { ...user1 } as any,
    create: user1 as any,
  });

  // User 2 - Located in Rosario, Santa Fe, Argentina
  const user2 = {
    email: 'luciana@example.com',
    name: 'Luciana',
    gender: GENDER.FEMALE,
    dateOfBirth: new Date('1996-11-30T00:00:00.000Z'),
    location: {
      create: {
        latitude: -32.9595,
        longitude: -60.6615,
        city: 'Rosario',
        state: 'Santa Fe',
        country: 'Argentina',
      },
    },
    matchPreferences: {
      create: {
        minAge: 25,
        maxAge: 35,
        genderPreferences: {
          set: [GENDER.MALE],
        },
        preferredConnectionType: CONNECTION_TYPE.LONG_TERM_RELATIONSHIP,
      },
    },
    profile: {
      create: {
        bio: 'I am a software engineer from Argentina.',
        pronouns: {
          set: [PRONOUN.SHE_HER],
        },
        displayPronouns: true,
        sexualOrientation: SEXUAL_ORIENTATION.STRAIGHT,
        photos: {
          set: [
            'https://necterine-staging-content.s3.us-east-2.amazonaws.com/users/test/beach.png',
          ],
        },
        questionnaireAnswers: {
          connect: [
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-004' },
          ],
        },
      },
    },
  };
  await prisma.user.upsert({
    where: { email: 'luciana@example.com' },
    update: { ...user2 } as any,
    create: user2 as any,
  });

  // User 3 - Another user located in Rosario, Santa Fe, Argentina
  const user3 = {
    email: 'martin@example.com',
    name: 'Martin',
    gender: GENDER.MALE,
    dateOfBirth: new Date('1998-03-22T00:00:00.000Z'),
    location: {
      create: {
        latitude: -32.9477,
        longitude: -60.6305,
        city: 'Rosario',
        state: 'Santa Fe',
        country: 'Argentina',
      },
    },
    matchPreferences: {
      create: {
        minAge: 20,
        maxAge: 29,
        genderPreferences: {
          set: [GENDER.FEMALE, GENDER.NON_BINARY],
        },
        preferredConnectionType: CONNECTION_TYPE.SHORT_TERM_RELATIONSHIP,
      },
    },
    profile: {
      create: {
        bio: 'I am a software engineer from Argentina.',
        pronouns: {
          set: [PRONOUN.HE_HIM],
        },
        displayPronouns: true,
        sexualOrientation: SEXUAL_ORIENTATION.STRAIGHT,
        photos: {
          set: [
            'https://necterine-staging-content.s3.us-east-2.amazonaws.com/users/test/beach.png',
          ],
        },
        questionnaireAnswers: {
          connect: [
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-002' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-005' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-001' },
          ],
        },
      },
    },
  };
  await prisma.user.upsert({
    where: { email: 'martin@example.com' },
    update: { ...user3 } as any,
    create: user3 as any,
  });

  // User 4 - Located in Ciudad de Mexico
  const user4 = {
    email: 'carlos@example.com',
    name: 'Carlos',
    gender: GENDER.MALE,
    dateOfBirth: new Date('1985-08-10T00:00:00.000Z'),
    location: {
      create: {
        latitude: 19.4326,
        longitude: -99.1332,
        city: 'Ciudad de Mexico',
        country: 'Mexico',
      },
    },
    matchPreferences: {
      create: {
        minAge: 24,
        maxAge: 34,
        genderPreferences: {
          set: [GENDER.FEMALE, GENDER.NON_BINARY, GENDER.QUEER],
        },
        preferredConnectionType: CONNECTION_TYPE.NOT_SURE,
      },
    },
    profile: {
      create: {
        bio: 'I am a software engineer from Mexico.',
        pronouns: {
          set: [PRONOUN.THEY_THEM],
        },
        displayPronouns: true,
        sexualOrientation: SEXUAL_ORIENTATION.DEMISEXUAL,
        photos: {
          set: [
            'https://necterine-staging-content.s3.us-east-2.amazonaws.com/users/test/beach.png',
          ],
        },
        questionnaireAnswers: {
          connect: [
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-003' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-001' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-004' },
          ],
        },
      },
    },
  };
  await prisma.user.upsert({
    where: { email: 'carlos@example.com' },
    update: { ...user4 } as any,
    create: user4 as any,
  });

  // User 5 - Located in Los Angeles, USA
  const user5 = {
    email: 'emily@example.com',
    name: 'Emily',
    gender: GENDER.FEMALE,
    dateOfBirth: new Date('1995-12-17T00:00:00.000Z'),
    location: {
      create: {
        latitude: 34.0522,
        longitude: -118.2437,
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      },
    },
    matchPreferences: {
      create: {
        minAge: 22,
        maxAge: 32,
        genderPreferences: {
          set: [GENDER.MALE, GENDER.QUEER],
        },
        preferredConnectionType: CONNECTION_TYPE.SHORT_TERM_RELATIONSHIP,
      },
    },
    profile: {
      create: {
        bio: 'I am a software engineer from LA.',
        pronouns: {
          set: [PRONOUN.THEY_THEM],
        },
        displayPronouns: false,
        sexualOrientation: SEXUAL_ORIENTATION.ASEXUAL,
        photos: {
          set: [
            'https://necterine-staging-content.s3.us-east-2.amazonaws.com/users/test/beach.png',
          ],
        },
        questionnaireAnswers: {
          connect: [
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-002' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-002' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-002' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-004' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-005' },
            { id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-004' },
          ],
        },
      },
    },
  };
  await prisma.user.upsert({
    where: { email: 'emily@example.com' },
    update: { ...user5 } as any,
    create: user5 as any,
  });

  console.log('Seeding finished.');
}

main();
