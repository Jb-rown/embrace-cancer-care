
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  {
    id: "cancer-basics",
    title: "Cancer Basics",
    description: "Test your knowledge on the fundamentals of cancer",
    questions: [
      {
        question: "What is cancer?",
        options: [
          "A viral infection",
          "Abnormal cells that divide uncontrollably and can invade nearby tissues",
          "A bacterial disease",
          "A fungal infection"
        ],
        correctAnswer: "Abnormal cells that divide uncontrollably and can invade nearby tissues",
        explanation: "Cancer is characterized by the development of abnormal cells that divide uncontrollably and have the ability to infiltrate and destroy normal body tissue."
      },
      {
        question: "Which factor is NOT known to increase cancer risk?",
        options: [
          "Tobacco use",
          "Excessive sun exposure",
          "Eating organic foods",
          "Excessive alcohol consumption"
        ],
        correctAnswer: "Eating organic foods",
        explanation: "Tobacco use, excessive sun exposure, and excessive alcohol consumption are all known risk factors for various types of cancer. Eating organic foods has not been linked to increased cancer risk."
      },
      {
        question: "Which of these is a common symptom that might indicate cancer?",
        options: [
          "Temporary headache",
          "Seasonal allergies",
          "Unexplained weight loss",
          "Brief muscle soreness after exercise"
        ],
        correctAnswer: "Unexplained weight loss",
        explanation: "Unexplained weight loss can be a sign of cancer. Other warning signs include unusual bleeding, persistent pain, unexplained fatigue, and changes in skin."
      },
      {
        question: "How does chemotherapy work to treat cancer?",
        options: [
          "It uses radiation to kill cancer cells",
          "It surgically removes tumors",
          "It uses drugs to kill rapidly dividing cells",
          "It boosts the body's immune system to fight cancer"
        ],
        correctAnswer: "It uses drugs to kill rapidly dividing cells",
        explanation: "Chemotherapy works by using drugs to kill rapidly dividing cells, which is a main characteristic of most cancer cells."
      },
      {
        question: "Which cancer is the most common among women worldwide?",
        options: [
          "Lung cancer",
          "Breast cancer",
          "Cervical cancer",
          "Ovarian cancer"
        ],
        correctAnswer: "Breast cancer",
        explanation: "Breast cancer is the most commonly diagnosed cancer among women worldwide, with an estimated 2.3 million new cases each year."
      }
    ]
  },
  {
    id: "treatment-options",
    title: "Treatment Options",
    description: "Learn about different cancer treatment approaches",
    questions: [
      {
        question: "What is targeted therapy in cancer treatment?",
        options: [
          "Surgery that targets only the tumor",
          "Drugs that interfere with specific molecules involved in cancer growth",
          "Radiation that only affects cancer cells",
          "Nutritional approach targeting cancer metabolism"
        ],
        correctAnswer: "Drugs that interfere with specific molecules involved in cancer growth",
        explanation: "Targeted therapy focuses on specific molecular targets that are associated with cancer, whereas standard chemotherapy acts on all rapidly dividing cells."
      },
      {
        question: "Which cancer treatment uses high-energy particles to destroy cancer cells?",
        options: [
          "Chemotherapy",
          "Immunotherapy",
          "Radiation therapy",
          "Hormone therapy"
        ],
        correctAnswer: "Radiation therapy",
        explanation: "Radiation therapy uses high-energy radiation to shrink tumors and kill cancer cells by damaging their DNA."
      },
      {
        question: "What is immunotherapy?",
        options: [
          "Treatment that prevents infections during cancer treatment",
          "Therapy that helps patients cope emotionally with cancer",
          "Treatment that helps the immune system fight cancer",
          "Nutritional therapy to strengthen the immune system"
        ],
        correctAnswer: "Treatment that helps the immune system fight cancer",
        explanation: "Immunotherapy is a type of cancer treatment that helps the immune system fight cancer by stimulating it to work harder or by giving it components to help it fight cancer."
      },
      {
        question: "Which statement about cancer surgery is TRUE?",
        options: [
          "Surgery is only used for diagnosis, not treatment",
          "Surgery can cure cancer if it hasn't spread",
          "All cancers require surgery",
          "Surgery always requires removing the entire organ"
        ],
        correctAnswer: "Surgery can cure cancer if it hasn't spread",
        explanation: "If cancer is contained to one area, surgery may be able to remove all cancerous tissue and cure the cancer, especially if it hasn't spread to other parts of the body."
      },
      {
        question: "What is palliative care in cancer treatment?",
        options: [
          "End-of-life care only",
          "Care focused on relieving symptoms and improving quality of life",
          "Alternative medicine approaches",
          "Experimental treatments when standard treatments fail"
        ],
        correctAnswer: "Care focused on relieving symptoms and improving quality of life",
        explanation: "Palliative care focuses on providing relief from the symptoms and stress of illness, improving quality of life for both the patient and family. It can be provided alongside curative treatment."
      }
    ]
  },
  {
    id: "prevention-detection",
    title: "Prevention & Detection",
    description: "Test your knowledge on cancer prevention and early detection",
    questions: [
      {
        question: "Which is NOT considered an effective cancer prevention strategy?",
        options: [
          "Maintaining a healthy weight",
          "Avoiding tobacco",
          "Taking daily antibiotics",
          "Protecting skin from sun exposure"
        ],
        correctAnswer: "Taking daily antibiotics",
        explanation: "Taking daily antibiotics is not a cancer prevention strategy and can actually lead to antibiotic resistance. The other options are recognized strategies for reducing cancer risk."
      },
      {
        question: "What is a cancer screening test?",
        options: [
          "A test that diagnoses cancer",
          "A test that looks for cancer or pre-cancerous conditions before symptoms appear",
          "A blood test that must be done annually after age 40",
          "A genetic test to determine cancer risk"
        ],
        correctAnswer: "A test that looks for cancer or pre-cancerous conditions before symptoms appear",
        explanation: "Cancer screening tests are designed to find cancer before symptoms develop, when it may be easier to treat or cure."
      },
      {
        question: "Which is an example of a cancer screening method?",
        options: [
          "Blood pressure check",
          "Cholesterol test",
          "Mammogram",
          "Electrocardiogram (ECG)"
        ],
        correctAnswer: "Mammogram",
        explanation: "A mammogram is an X-ray picture of the breast used to screen for breast cancer."
      },
      {
        question: "Which dietary pattern is associated with reduced cancer risk?",
        options: [
          "High in processed meat and refined grains",
          "High in plant foods, low in processed foods",
          "Low-carbohydrate, high-fat diet",
          "Intermittent fasting"
        ],
        correctAnswer: "High in plant foods, low in processed foods",
        explanation: "Diets high in fruits, vegetables, whole grains, and legumes, and low in processed foods and red meat are associated with reduced risk of several types of cancer."
      },
      {
        question: "Which of these is NOT a warning sign that might indicate cancer?",
        options: [
          "A sore that does not heal",
          "Unusual bleeding or discharge",
          "Temporary muscle soreness after exercise",
          "Obvious change in a wart or mole"
        ],
        correctAnswer: "Temporary muscle soreness after exercise",
        explanation: "Temporary muscle soreness after exercise is a normal response to physical activity. The other options are potential warning signs of cancer that should prompt a medical consultation."
      }
    ]
  }
];
