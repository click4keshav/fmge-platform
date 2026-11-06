import { PrismaClient, TestKind } from '@prisma/client';

const prisma = new PrismaClient();

// Data extracted directly from your FMGE Question Bank Google Sheet
const sheetQuestions = [
  {
    subject: "Derma",
    topic: "Bullous Dermatoses",
    stem: "A patient develops intensely itchy, tense fluid-filled lesions over an erythematous base. The oral cavity remains uninvolved. Histology shows a subepidermal split, while direct immunofluorescence reveals a linear IgG/C3 pattern along the basement membrane. Which antigen is most likely being targeted?",
    difficulty: 2,
    optionA: "Desmoglein 3",
    optionB: "BP180 (Bullous Pemphigoid Antigen 2)",
    optionC: "Transglutaminase 3",
    optionD: "Desmocollin 1",
    correctOption: "B",
    explanation: "Tense bullae with an intact subepidermal blister cavity and linear deposition of IgG and C3 along the dermoepidermal junction are diagnostic of bullous pemphigoid, which primarily targets hemidesmosomal proteins BP180 (type XVII collagen) and BP230."
  },
  {
    subject: "Derma",
    topic: "Bullous Dermatoses",
    stem: "A patient with a gluten-sensitive enteropathy develops grouped, excoriated papulovesicles over the elbows and buttocks. The lesions are itchy enough to be destroyed by scratching. Which immunofluorescence pattern is most characteristic?",
    difficulty: 2,
    optionA: "Granular IgA deposition in dermal papillae",
    optionB: "Linear IgG deposition along the basement membrane",
    optionC: "Intercellular IgG in the epidermis",
    optionD: "Granular IgG and C3 deposition at the dermoepidermal junction",
    correctOption: "A",
    explanation: "Dermatitis herpetiformis is strongly associated with celiac disease (gluten-sensitive enteropathy). Direct immunofluorescence characteristically reveals granular IgA deposits clustered within the dermal papillae."
  },
  {
    subject: "Derma",
    topic: "Bullous Dermatoses",
    stem: "A blistering disorder produces fragile bullae that rupture before the patient reaches the clinic, leaving painful erosions. Gentle lateral pressure on apparently normal skin causes epidermal shearing. The split is suprabasal. Which finding best confirms the suspected diagnosis?",
    difficulty: 2,
    optionA: "Linear IgA deposition along the basement membrane zone",
    optionB: "Granular C3 deposition in dermal papillae",
    optionC: "Intercellular IgG deposition in the epidermis on direct immunofluorescence",
    optionD: "Subepidermal bullae with abundant eosinophils on histology",
    correctOption: "C",
    explanation: "Flaccid blisters, positive Nikolsky sign (epidermal shearing with lateral pressure), and suprabasal acantholysis characterize pemphigus vulgaris. Diagnosis is confirmed by intercellular IgG ('fish-net' pattern) throughout the epidermis on direct immunofluorescence."
  },
  {
    subject: "Derma",
    topic: "Bullous Dermatoses",
    stem: "A young adult develops recurrent crops of vesicles arranged in a rosette-like pattern. The eruption favors the trunk and proximal limbs, and histology shows eosinophilic spongiosis with subepidermal blistering. Which diagnosis is most likely?",
    difficulty: 2,
    optionA: "Bullous pemphigoid",
    optionB: "Linear IgA bullous dermatosis",
    optionC: "Pemphigus vulgaris",
    optionD: "Dermatitis herpetiformis",
    correctOption: "A",
    explanation: "Eosinophilic spongiosis with subepidermal blister formation is the hallmark histological pattern of bullous pemphigoid (especially in early or urticarial lesions). While annular or rosette configurations can clinically mimic linear IgA dermatosis, linear IgA typically demonstrates a neutrophilic infiltrate rather than prominent eosinophilic spongiosis."
  },
  {
    subject: "Derma",
    topic: "Bacterial Skin Infections",
    stem: "A child develops superficial flaccid bullae that rupture into honey-colored crusts. The affected skin separates at a very superficial level, and systemic toxicity is absent. Which organism is most likely responsible?",
    difficulty: 1,
    optionA: "Staphylococcus aureus",
    optionB: "Streptococcus pyogenes",
    optionC: "Pseudomonas aeruginosa",
    optionD: "Herpes simplex virus",
    correctOption: "A",
    explanation: "Bullous impetigo is caused by exfoliative toxin-producing strains of Staphylococcus aureus. The toxin cleaves desmoglein 1 in the superficial epidermis (stratum granulosum), leading to flaccid blisters that rupture into classic honey-colored crusts."
  },
  {
    subject: "Anesthesiology",
    topic: "Anesthetic Emergencies",
    stem: "A patient undergoing general anesthesia develops a sudden rise in end-tidal CO₂, muscle rigidity, and rapidly increasing body temperature. Which drug is most appropriate for treatment?",
    difficulty: 1,
    optionA: "Dantrolene",
    optionB: "Succinylcholine",
    optionC: "Atropine",
    optionD: "Neostigmine",
    correctOption: "A",
    explanation: "The patient is experiencing malignant hyperthermia, an anesthesia emergency triggered by volatile anesthetics or succinylcholine. The specific antidote and treatment of choice is intravenous dantrolene, which blocks calcium release from the sarcoplasmic reticulum by antagonizing RYR1 receptors."
  },
  {
    subject: "Anesthesiology",
    topic: "Local Anesthetics",
    stem: "Which local anesthetic is most associated with cardiotoxicity following accidental intravascular injection?",
    difficulty: 1,
    optionA: "Lidocaine",
    optionB: "Bupivacaine",
    optionC: "Procaine",
    optionD: "Mepivacaine",
    correctOption: "B",
    explanation: "Bupivacaine is the most cardiotoxic local anesthetic because of its high lipid solubility and strong, prolonged binding to inactivated cardiac voltage-gated sodium channels, leading to severe refractory ventricular arrhythmias."
  },
  {
    subject: "Anesthesiology",
    topic: "Neuraxial Anesthesia",
    stem: "Which physiological change is commonly observed during spinal anesthesia?",
    difficulty: 1,
    optionA: "Systemic hypertension",
    optionB: "Hypotension due to sympathetic blockade",
    optionC: "Tachycardia from sympathetic stimulation",
    optionD: "Bronchoconstriction and increased airway resistance",
    correctOption: "B",
    explanation: "Spinal anesthesia blocks preganglionic sympathetic fibers, causing peripheral vasodilation, decreased systemic vascular resistance, and venous pooling, leading to hypotension as the most common physiological response."
  },
  {
    subject: "Anesthesiology",
    topic: "General Anesthesia",
    stem: "Which drug is commonly used for rapid sequence induction of anesthesia because of its rapid onset?",
    difficulty: 1,
    optionA: "Succinylcholine",
    optionB: "Pancuronium",
    optionC: "Vecuronium",
    optionD: "Cisatracurium",
    correctOption: "A",
    explanation: "Succinylcholine is a depolarizing neuromuscular blocker with the fastest onset of action (30–60 seconds), making it the drug of choice for neuromuscular blockade during rapid sequence induction (RSI) to secure the airway quickly."
  },
  {
    subject: "Anesthesiology",
    topic: "Opioid Pharmacology",
    stem: "A patient develops respiratory depression after receiving an opioid during surgery. Which drug can reverse the opioid effect?",
    difficulty: 1,
    optionA: "Flumazenil",
    optionB: "Naloxone",
    optionC: "Neostigmine",
    optionD: "Physostigmine",
    correctOption: "B",
    explanation: "Naloxone is a pure competitive opioid receptor antagonist (blocking mu, kappa, and delta receptors) that rapidly reverses opioid-induced respiratory depression and sedation."
  },
  {
    subject: "Psychiatry",
    topic: "Anxiety and Obsessive Disorders",
    stem: "A patient repeatedly checks whether the door is locked despite knowing it is already locked. The behavior is performed to reduce anxiety. What is this behavior called?",
    difficulty: 1,
    optionA: "Obsession",
    optionB: "Compulsion",
    optionC: "Delusion",
    optionD: "Phobia",
    correctOption: "B",
    explanation: "A compulsion is a repetitive, purposeful, and intentional physical or mental behavior performed in response to an obsession or according to rigid rules, aimed at preventing or reducing anxiety or distress."
  },
  {
    subject: "Psychiatry",
    topic: "Mood Disorders",
    stem: "A 35-year-old woman presents with 6 weeks of persistent sadness, loss of interest in activities, early morning awakening, poor appetite, fatigue, and feelings of worthlessness. She has stopped attending work. She denies any history of mania or hypomania. What is the most likely diagnosis?",
    difficulty: 1,
    optionA: "Major depressive disorder",
    optionB: "Persistent depressive disorder (dysthymia)",
    optionC: "Bipolar I disorder",
    optionD: "Cyclothymic disorder",
    correctOption: "A",
    explanation: "The patient meets DSM-5 criteria for major depressive disorder (MDD), presenting with >5 symptoms persisting for over 2 weeks with marked occupational dysfunction and no prior manic or hypomanic episodes."
  },
  {
    subject: "Psychiatry",
    topic: "Psychotic Disorders",
    stem: "A 22-year-old man is brought to the emergency department because he believes that television presenters are sending him secret messages. He hears voices discussing his actions and has become socially withdrawn over the past 8 months. There is no evidence of substance use or a mood episode. What is the most likely diagnosis?",
    difficulty: 1,
    optionA: "Brief psychotic disorder",
    optionB: "Schizophreniform disorder",
    optionC: "Schizophrenia",
    optionD: "Schizoaffective disorder",
    correctOption: "C",
    explanation: "The presence of delusions of reference, third-person auditory hallucinations, and negative symptoms persisting for more than 6 months without a mood disorder or substance use confirms the diagnosis of schizophrenia."
  },
  {
    subject: "Psychiatry",
    topic: "Mood Disorders",
    stem: "A 28-year-old man is brought by his family after 8 days of sleeping only 2 hours per night, speaking rapidly, spending large amounts of money, and claiming he will establish several international companies. He is markedly irritable and unable to continue working. What is the most likely diagnosis?",
    difficulty: 1,
    optionA: "Bipolar I disorder, manic episode",
    optionB: "Bipolar II disorder, hypomanic episode",
    optionC: "Generalized anxiety disorder",
    optionD: "Attention-deficit/hyperactivity disorder",
    correctOption: "A",
    explanation: "The patient presents with classic mania lasting ≥1 week (decreased need for sleep, pressured speech, grandiosity, reckless spending, marked occupational impairment), diagnostic of a manic episode in Bipolar I disorder."
  },
  {
    subject: "Psychiatry",
    topic: "Psychopharmacology",
    stem: "A 40-year-old woman taking sertraline is prescribed tramadol for postoperative pain. She develops agitation, sweating, fever, tremor, hyperreflexia, and inducible ankle clonus. What is the most likely diagnosis?",
    difficulty: 2,
    optionA: "Neuroleptic malignant syndrome",
    optionB: "Serotonin syndrome",
    optionC: "Anticholinergic toxicity",
    optionD: "Malignant hyperthermia",
    correctOption: "B",
    explanation: "Concurrent use of an SSRI (sertraline) and tramadol triggers serotonin syndrome through excessive central and peripheral serotonergic activity. Neuromuscular hyperactivity fulfills the Hunter Serotonin Toxicity Criteria."
  }
];

async function main() {
  console.log('Importing FMGE Question Bank into Supabase...');

  // Find or create test plan
  const plan = await prisma.plan.findUnique({
    where: { slug: 'fmge-pro-test-series' },
  });

  // Create Grand Test for these questions
  const test = await prisma.test.create({
    data: {
      title: 'FMGE Grand Multi-Specialty Mock 2026',
      kind: TestKind.GRAND,
      exam: 'FMGE',
      planId: plan?.id,
      totalQs: sheetQuestions.length,
      durationMin: 30,
      marksCorrect: 4,
      marksWrong: 1,
      passMarks: 50,
      isPublished: true,
    },
  });

  for (let i = 0; i < sheetQuestions.length; i++) {
    const qData = sheetQuestions[i];
    
    // Create Question with Options
    const question = await prisma.question.create({
      data: {
        subject: qData.subject,
        topic: qData.topic,
        stem: qData.stem,
        difficulty: qData.difficulty,
        explanation: qData.explanation,
        options: {
          create: [
            { label: 'A', text: qData.optionA, sortOrder: 1 },
            { label: 'B', text: qData.optionB, sortOrder: 2 },
            { label: 'C', text: qData.optionC, sortOrder: 3 },
            { label: 'D', text: qData.optionD, sortOrder: 4 },
          ],
        },
      },
      include: { options: true },
    });

    // Link correct option ID
    const correctOpt = question.options.find(o => o.label === qData.correctOption);
    if (correctOpt) {
      await prisma.question.update({
        where: { id: question.id },
        data: { correctOptionId: correctOpt.id },
      });
    }

    // Link question to the Test
    await prisma.testQuestion.create({
      data: {
        testId: test.id,
        questionId: question.id,
        setNo: 1,
        sortOrder: i + 1,
      },
    });
  }

  console.log(`Successfully imported ${sheetQuestions.length} questions and created Grand Test ID: ${test.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });