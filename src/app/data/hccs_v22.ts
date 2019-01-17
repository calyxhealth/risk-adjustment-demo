export const HCC_LABELS = {
  "1": "HIV/AIDS",
  "2": "Septicemia, Sepsis, Systemic Inflammatory Response Syndrome/Shock",
  "6": "Opportunistic Infections",
  "8": "Metastatic Cancer and Acute Leukemia",
  "9": "Lung and Other Severe Cancers",
  "10": "Lymphoma and Other Cancers",
  "11": "Colorectal, Bladder, and Other Cancers",
  "12": "Breast, Prostate, and Other Cancers and Tumors",
  "17": "Diabetes with Acute Complications",
  "18": "Diabetes with Chronic Complications",
  "19": "Diabetes without Complication",
  "21": "Protein-Calorie Malnutrition",
  "22": "Morbid Obesity",
  "23": "Other Significant Endocrine and Metabolic Disorders",
  "27": "End-Stage Liver Disease",
  "28": "Cirrhosis of Liver",
  "29": "Chronic Hepatitis",
  "33": "Intestinal Obstruction/Perforation",
  "34": "Chronic Pancreatitis",
  "35": "Inflammatory Bowel Disease",
  "39": "Bone/Joint/Muscle Infections/Necrosis",
  "40": "Rheumatoid Arthritis and Inflammatory Connective Tissue Disease",
  "46": "Severe Hematological Disorders",
  "47": "Disorders of Immunity",
  "48": "Coagulation Defects and Other Specified Hematological Disorders",
  "54": "Drug/Alcohol Psychosis",
  "55": "Drug/Alcohol Dependence",
  "57": "Schizophrenia",
  "58": "Major Depressive, Bipolar, and Paranoid Disorders",
  "70": "Quadriplegia",
  "71": "Paraplegia",
  "72": "Spinal Cord Disorders/Injuries",
  "73": "Amyotrophic Lateral Sclerosis and Other Motor Neuron Disease",
  "74": "Cerebral Palsy",
  "75": "Myasthenia Gravis/Myoneural Disorders,  Inflammatory and Toxic Neuropathy",
  "76": "Muscular Dystrophy",
  "77": "Multiple Sclerosis",
  "78": "Parkinson's and Huntington's Diseases",
  "79": "Seizure Disorders and Convulsions",
  "80": "Coma, Brain Compression/Anoxic Damage",
  "82": "Respirator Dependence/Tracheostomy Status",
  "83": "Respiratory Arrest",
  "84": "Cardio-Respiratory Failure and Shock",
  "85": "Congestive Heart Failure",
  "86": "Acute Myocardial Infarction",
  "87": "Unstable Angina and Other Acute Ischemic Heart Disease",
  "88": "Angina Pectoris",
  "96": "Specified Heart Arrhythmias",
  "99": "Cerebral Hemorrhage",
  "100": "Ischemic or Unspecified Stroke",
  "103": "Hemiplegia/Hemiparesis",
  "104": "Monoplegia, Other Paralytic Syndromes",
  "106": "Atherosclerosis of the Extremities with Ulceration or Gangrene",
  "107": "Vascular Disease with Complications",
  "108": "Vascular Disease",
  "110": "Cystic Fibrosis",
  "111": "Chronic Obstructive Pulmonary Disease",
  "112": "Fibrosis of Lung and Other Chronic Lung Disorders",
  "114": "Aspiration and Specified Bacterial Pneumonias",
  "115": "Pneumococcal Pneumonia, Empyema, Lung Abscess",
  "122": "Proliferative Diabetic Retinopathy and Vitreous Hemorrhage",
  "124": "Exudative Macular Degeneration",
  "134": "Dialysis Status",
  "135": "Acute Renal Failure",
  "136": "Chronic Kidney Disease, Stage 5",
  "137": "Chronic Kidney Disease, Severe (Stage 4)",
  "157": "Pressure Ulcer of Skin with Necrosis Through to Muscle, Tendon, or Bone",
  "158": "Pressure Ulcer of Skin with Full Thickness Skin Loss",
  "161": "Chronic Ulcer of Skin, Except Pressure",
  "162": "Severe Skin Burn or Condition",
  "166": "Severe Head Injury",
  "167": "Major Head Injury",
  "169": "Vertebral Fractures without Spinal Cord Injury",
  "170": "Hip Fracture/Dislocation",
  "173": "Traumatic Amputations and Complications",
  "176": "Complications of Specified Implanted Device or Graft",
  "186": "Major Organ Transplant or Replacement Status",
  "188": "Artificial Openings for Feeding or Elimination",
  "189": "Amputation Status, Lower Limb/Amputation Complications",
}

export const HCC_GRAPH = {
  "8": ["9"],
  "9": ["10"],
  "10": ["11"],
  "11": ["12"],
  "17": ["18"],
  "18": ["19"],
  "27": ["28", "80"],
  "28": ["29"],
  "46": ["48"],
  "54": ["55"],
  "57": ["58"],
  "70": ["71", "103"],
  "71": ["72", "104"],
  "72": ["169"],
  "82": ["83"],
  "83": ["84"],
  "86": ["87"],
  "87": ["88"],
  "99": ["100"],
  "103": ["104"],
  "106": ["107", "161", "189"],
  "107": ["108"],
  "110": ["111"],
  "111": ["112"],
  "114": ["115"],
  "134": ["135"],
  "135": ["136"],
  "136": ["137"],
  "157": ["158"],
  "158": ["161"],
  "166": ["80", "167"],
}