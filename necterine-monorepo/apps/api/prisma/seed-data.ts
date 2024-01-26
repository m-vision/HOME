import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Questionnaire = {
  id: string;
  name: string;
};
const QUESTIONNAIRE_DATA: Questionnaire[] = [
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    name: 'Optional Onboarding',
  },
];

type QuestionnaireQuestion = {
  id: string;
  questionnaireId: string;
  title: string;
  affirmativeForm: string;
  subtitle?: string;
};
const QUESTIONNAIRE_QUESTIONS: QuestionnaireQuestion[] = [
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001',
    questionnaireId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    title: 'How often do you engage in self-reflection or introspection?',
    affirmativeForm: 'I engage in self-reflection or introspection {response}.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002',
    questionnaireId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    title: 'How important are shared interests in a relationship to you?',
    affirmativeForm:
      'Shared interests in a relationship play a role for me that is {response}.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003',
    questionnaireId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    title:
      'How comfortable are you discussing mental health in a relationship?',
    affirmativeForm:
      'When it comes to talking about mental health in relationships I feel {response}.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004',
    questionnaireId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    title: 'How do you like to be asked out?',
    affirmativeForm: 'When it comes to being asked out {response}.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005',
    questionnaireId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    title: 'If I had to choose, my top priority in a relationship is',
    affirmativeForm:
      'If I had to choose, my top priority in a relationship is {response}.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006',
    questionnaireId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1',
    title: 'How do you handle feedback or criticism?',
    affirmativeForm: 'When it comes to feedback or criticism {response}.',
  },
];

type QuestionnaireAnswer = {
  id: string;
  questionId: string;
  subtitle?: string;
  title: string;
};
const QUESTIONNAIRE_ANSWERS: QuestionnaireAnswer[] = [
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-001',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001',
    title: "Daily - it's an integral part of my holistic self-care process.",
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-002',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001',
    title: 'Frequently, especially during tumultuous times in my life.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-003',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001',
    title: 'Occasionally - when I the mood strikes.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-004',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001',
    title: "Rarely, unless it's prompted by a big upset or event in my life.",
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001-005',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-001',
    title:
      'Never - I tend to focus on the here and now, steering clear of deep introspection.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-001',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002',
    title:
      'Very important - I want to be able to do all the things with my partner!',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-002',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002',
    title:
      'Important - having crossover is nice when it comes to planning dates and activities.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-003',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002',
    title: 'Somewhat important - a nice to have, but not a must have.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-004',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002',
    title: 'A small role - shared values are more significant.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002-005',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-002',
    title:
      'Not at all important - I can do my thing, they can do theirs, opposites attract.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-001',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003',
    title:
      'Very comfortable - I’m an open book and I would like my partner to be too.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-002',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003',
    title:
      'Comfortable - as long as it’s the right time and place, I’m all for it. ',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-003',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003',
    title: 'Somewhat comfortable - it’s challenging, but sometimes necessary.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-004',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003',
    title:
      'I struggle with it a lot, but I see the value and I’m working on it.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003-005',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-003',
    title:
      'Not comfortable at all - mental health is private, even in intimate relationships.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-001',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004',
    title: 'Let’s skip the small talk and grab a drink or coffee.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-002',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004',
    title:
      'I prefer a slow burn, let’s get to know each other on here for a bit.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-003',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004',
    title: 'Phone call or Facetime is a good precursor before meeting irl.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-004',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004',
    title: 'I’ll make the first move and let you know when it’s time to meet.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004-005',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-004',
    title: 'Depends on the connection, as long as it’s respectful go for it.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-001',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005',
    title:
      'Good communication - being able to express myself openly and feeling seen and heard by my partner.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-002',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005',
    title:
      'Solid friendship - it’s the basis for every strong relationship, the rest can grow from that foundation.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-003',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005',
    title:
      'Consistency and stability - I need to know my partner is going to show up for me and be there whenever I need them, I should be their top priority.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-004',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005',
    title:
      'Loyalty, honesty and trust - I’ve been burned in the past, I need to be able to trust my partner and their actions should match their words.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005-005',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-005',
    title:
      'Great sex - nothing beats good sexual chemistry and physical attraction.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-001',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006',
    title:
      'I love it - feedback helps me grow and understand myself better. Bring it on.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-002',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006',
    title:
      'I’m open to it - it’s not a personal attack, just part of having an authentic relationship.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-003',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006',
    title:
      'It’s hard for me, but I see the value in it and I’m open to having those challenging discussions.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-004',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006',
    title:
      'I don’t react well to feedback, I’d rather my partner give me positive reinforcement than focus on what I do wrong.',
  },
  {
    id: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006-005',
    questionId: 'eaa6321c-cdb5-4f01-8ec3-ec48c3ca22a1-006',
    title: 'It makes me shut down completely.',
  },
];

export async function seedDb() {
  await Promise.all(
    QUESTIONNAIRE_DATA.map(async (questionnaire) => {
      return prisma.questionnaire.upsert({
        where: { id: questionnaire.id },
        update: { ...questionnaire } as any,
        create: questionnaire as any,
      });
    }),
  );

  await Promise.all(
    QUESTIONNAIRE_QUESTIONS.map(async (question) => {
      return prisma.questionnaireQuestion.upsert({
        where: { id: question.id },
        update: { ...question } as any,
        create: question as any,
      });
    }),
  );

  await Promise.all(
    QUESTIONNAIRE_ANSWERS.map(async (answer) => {
      return prisma.questionnaireAnswer.upsert({
        where: { id: answer.id },
        update: { ...answer } as any,
        create: answer as any,
      });
    }),
  );
}

seedDb()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma
      .$disconnect()
      .then(() => console.log('Disconnected from Prisma'))
      .catch((error) =>
        console.error('Error disconnecting from Prisma:', error),
      );
  });
