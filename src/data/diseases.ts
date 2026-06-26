import { PlantType, DiseaseInfo } from '../types';

export const SUPPORTED_PLANTS: PlantType[] = [
  { id: 'pepper', name: 'Pepper', scientificName: 'Capsicum annuum', icon: '🌶️' },
  { id: 'tomato', name: 'Tomato', scientificName: 'Solanum lycopersicum', icon: '🍅' },
  { id: 'cucumber', name: 'Cucumber', scientificName: 'Cucumis sativus', icon: '🥒' },
  { id: 'potato', name: 'Potato', scientificName: 'Solanum tuberosum', icon: '🥔' }
];

export const DISEASES_DATABASE: DiseaseInfo[] = [
  {
    id: 'pep-bacterial-spot',
    name: 'Bacterial Spot (Xanthomonas spp.)',
    plantId: 'pepper',
    description: 'A severe bacterial disease causing spots on leaves, stems, and fruits, leading to heavy leaf drop and loss of market value.',
    symptoms: [
      'Small, water-soaked leaf spots that turn purplish-brown and greasy',
      'Premature defoliation exposing peppers to solar damage (sunscald)',
      'Cracked, scab-like lesions on maturing pepper skins'
    ],
    causes: [
      'Infected or contaminated seed supply',
      'Warm temperatures (75°F to 85°F) combined with overhead rain or splash irrigation'
    ],
    severity: 'High',
    spreadMechanism: 'Spread by rain-splashes, moist wind, handling wet plants, or non-sanitized pruning shears.',
    recommendations: [
      'Foliar spray of copper hydroxide bactericide mixed with mancozeb protective fungicide',
      'Regular application of bio-fungicide containing Bacillus subtilis to compete with pathogen colonies'
    ],
    preventionMethods: [
      'Always purchase hot-water sanitized or certified disease-free pepper seeds',
      'Adopt a strict drip micro-irrigation system to prevent canopy leaf moisture',
      'Establish a 3-year crop rotation with corn, wheat, or non-solanaceous cover crops'
    ],
    recoveryExpectations: 'Canopy spread will arrest within 7-10 days of starting treatment. New leaves will show zero spotting. Lost yield is typically restricted to under 10% if identified early.',
    bestPractices: [
      'Never cultivate or walk through wet pepper rows',
      'Dispose of post-season crop residue immediately via deep tillage or bagging'
    ]
  },
  {
    id: 'pep-healthy',
    name: 'Healthy Crop (No Disease Identified)',
    plantId: 'pepper',
    description: 'The pepper plant displays excellent cellular turgor, green pigmentation, and unblemished skin.',
    symptoms: [
      'Uniform dark green leaves with zero brown or yellow spots',
      'Strong erect stems showing robust vascular growth',
      'Vibrant yellow and white blossoms preparing for fruit sets'
    ],
    causes: [
      'Balanced soil NPK nutrition and optimized micro-irrigation',
      'High natural plant resilience'
    ],
    severity: 'Low',
    spreadMechanism: 'None. Maintenance of existing protocols is advised.',
    recommendations: [
      'Maintain regular water scheduling (1.2 inches per week)',
      'Apply standard organic nitrogen during the vegetative stage, transitioning to potassium-heavy feeds during bloom'
    ],
    preventionMethods: [
      'Continue weekly biological spray routines as a defensive shield',
      'Test soil soil-pore salinity and pH every month'
    ],
    recoveryExpectations: 'Crop is in prime condition. Harvest yield is expected to meet 100% of maximum potential.',
    bestPractices: [
      'Keep row spaces weed-free to maximize sunlight absorption',
      'Monitor insect traps daily for thrips or aphid vectors'
    ]
  },
  {
    id: 'tom-late-blight',
    name: 'Late Blight (Phytophthora infestans)',
    plantId: 'tomato',
    description: 'A catastrophic oomycete disease that decimates tomato foliage, stems, and yields in remarkably brief periods under cool, wet climates.',
    symptoms: [
      'Large, irregular water-soaked dark green/brown lesions starting from leaf margins',
      'Fuzzy white fungal-like spore growth on the underside of infected leaves during damp mornings',
      'Hard, greasy brown marbled spots covering fruit shoulders'
    ],
    causes: [
      'Airborne sporangia travelling miles from nearby infected fields or potato cull piles',
      'Cool temperature ranges (60°F to 70°F) coupled with continuous relative humidity above 90%'
    ],
    severity: 'Critical',
    spreadMechanism: 'Spores are easily dislodged and carried long distances by wind currents, or splashed via raindrops.',
    recommendations: [
      'Apply systemic preventative fungicides containing chlorothalonil, mefenoxam, or copper',
      'Prune and safely destroy heavily infected branches. Do not compost blight debris'
    ],
    preventionMethods: [
      'Grow late blight-resistant varieties (e.g., Mountain Merit, Defiant)',
      'Abolish overhead sprinkler setups in favor of drip lines',
      'Eradicate wild nightshades and volunteer tomatoes early in the spring season'
    ],
    recoveryExpectations: 'Requires extremely fast action. If infection covers over 30% of the plant, recovery is unlikely and row quarantine is advised to save adjacent plots.',
    bestPractices: [
      'Provide maximum airflow by widening crop spacings',
      'Register with local blight weather alert trackers'
    ]
  },
  {
    id: 'tom-early-blight',
    name: 'Early Blight (Alternaria solani)',
    plantId: 'tomato',
    description: 'A common fungal infection that forms characteristic "target board" spots on tomato foliage, slowly moving from the bottom leaves upward.',
    symptoms: [
      'Circular brown spots with concentric ring patterns (resembling a target)',
      'Yellowing chlorotic areas surrounding primary spots',
      'Stem spots and leathery black lesions near the calyx of maturing fruits'
    ],
    causes: [
      'Spores overwintering in infested crop debris in the soil',
      'Splashing water throwing spores onto lower foliage'
    ],
    severity: 'Medium',
    spreadMechanism: 'Wind, rain splash, and mechanical contact on wet foliage.',
    recommendations: [
      'Apply protective copper fungicides or organic sprays of sulfur',
      'Use biological control sprays containing Trichoderma beneficial fungus'
    ],
    preventionMethods: [
      'Stake, trellis, and prune plants up to 12 inches off the ground to eliminate low-soil splash zones',
      'Add a thick layer of clean straw mulch below the plant base'
    ],
    recoveryExpectations: 'Highly treatable. With systemic pruning of bottom target spots and copper treatments, tomatoes will recover fully with zero effect on fruit quality.',
    bestPractices: [
      'Practice strict 3-year crop rotations with corn, beans, or brassicas',
      'Wash stakes and cages with disinfectant before seasonal installation'
    ]
  },
  {
    id: 'cuc-powdery-mildew',
    name: 'Powdery Mildew (Podosphaera xanthii)',
    plantId: 'cucumber',
    description: 'A very common fungal disease producing a dusty white powder on cucumber leaves and vines, severely inhibiting photosynthesis and sugar synthesis.',
    symptoms: [
      'White, circular talcum-like spots appearing on the upper surfaces of older leaves',
      'Premature leaf yellowing, browning, and structural crisping',
      'Reduced size, starch count, and overall quantity of cucumbers'
    ],
    causes: [
      'Spores carried on wind currents',
      'Dry days paired with warm, highly humid nights'
    ],
    severity: 'Medium',
    spreadMechanism: 'Easily carried by light air currents across greenhouses and open fields.',
    recommendations: [
      'Spray potassium bicarbonate solutions to shift leaf pH to alkaline, halting spore growth',
      'Apply dilute horticultural oils or organic neem oil to coat and suffocate fungal colonies'
    ],
    preventionMethods: [
      'Select powdery mildew resistant cultivars',
      'Ensure maximum solar exposure on the canopy',
      'Maintain proper weeding to eliminate shade pockets'
    ],
    recoveryExpectations: 'Fungal spread will completely halt within 3-5 days of oil/bicarbonate treatment. Leaves already severely crisp will not recover, but new vine shoots will be clean.',
    bestPractices: [
      'Avoid high-dose nitrogen fertilizer which induces excessive vegetative shade',
      'Keep relative humidity in greenhouses under 75% via proper ventilation fans'
    ]
  }
];
