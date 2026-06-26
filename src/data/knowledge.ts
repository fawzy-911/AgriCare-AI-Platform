import { Article } from '../types';

export const KNOWLEDGE_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Managing Pepper Bacterial Spot (Xanthomonas spp.)',
    category: 'Disease',
    summary: 'A deep-dive guide to identifying, preventing, and managing Bacterial Spot in commercial and small-scale bell and chili pepper crops.',
    content: `Bacterial spot, caused by various species of Xanthomonas, is one of the most destructive diseases affecting pepper crops worldwide. It thrives in warm, wet conditions and can devastate yield if left unmanaged.

Symptoms:
The disease presents as small, water-soaked, circular spots on leaves. These spots gradually enlarge to about 1/4 inch, turn dark brown, and display a greasy appearance. Severely affected leaves turn yellow and drop prematurely, exposing peppers to direct sunlight and causing sunscald.

Transmission and Spread:
The pathogen overwinters in crop residues, weed hosts, and seeds. It is spread rapidly by wind-blown rain, overhead irrigation, and contaminated tools.

Prevention Strategies:
1. Seed treatment: Always purchase certified disease-free seed or sanitize seeds using hot water or bleach treatments.
2. Crop rotation: Implement a strict 2-3 year rotation cycle with non-solanaceous crops.
3. Clean equipment: Disinfect pruning shears, tillers, and stakes between fields.
4. Mulching: Use plastic or organic mulch to reduce soil splashing onto lower foliage.

Treatment Recommendations:
- Apply copper-based bactericides combined with mancozeb at the first sign of symptoms or before anticipated rain events.
- Deploy biological controls like Bacillus subtilis, which can compete with Xanthomonas and trigger systemic resistance.
- Immediately remove and destroy infected plant debris at the end of the season.`,
    author: 'Dr. Evelyn Carter, Agronomist',
    readTime: '6 min read',
    tags: ['Peppers', 'Bacterial Spot', 'Xanthomonas', 'Farming Best Practices'],
    publishedDate: 'June 10, 2026'
  },
  {
    id: 'art-2',
    title: 'An Introduction to Tomato Late Blight Prevention',
    category: 'Prevention',
    summary: 'Understanding the biology of Phytophthora infestans to establish a preventative defense system for your tomato crops.',
    content: `Late blight, caused by the oomycete Phytophthora infestans, is a notorious plant destroyer. It can wipe out entire tomato fields in just a few days under humid, cool conditions.

Symptoms:
Irregular, dark, water-soaked lesions appear on leaves, starting from the edges. During damp weather, a white, velvety growth of fungal spores appears on the undersides of leaves. Stems exhibit dark brown lesions, and fruits develop firm, marbled, greasy brown spots.

Prevention Protocols:
1. Air Circulation: Space plants adequately and prune lower branches to keep foliage dry.
2. Drip Irrigation: Avoid overhead watering; wet leaves are a catalyst for spore germination.
3. Resistant Varieties: Select tomato cultivars with known resistance genes (e.g., Mountain Merit, Iron Lady).
4. Destruction of Volunteers: Volunteer tomatoes and weed hosts like nightshade must be eradicated early in spring.

Chemical and Biological Controls:
Protective fungicides containing chlorothalonil or copper should be applied preventatively when cool, damp weather is forecasted. Biological treatments like Streptomyces lydicus have also shown efficacy as soil drenches to suppress early spore onset.`,
    author: 'Mohamed Fawzy, AI Engineer & Agricultural Developer',
    readTime: '5 min read',
    tags: ['Tomatoes', 'Late Blight', 'Phytophthora', 'Water Management'],
    publishedDate: 'June 18, 2026'
  },
  {
    id: 'art-3',
    title: 'Biological Control Agents for Organic Insect Management',
    category: 'Treatment',
    summary: 'A comprehensive review of predatory insects, nematodes, and microbial treatments that successfully control greenhouse and field pests.',
    content: `Organic farming relies heavily on biological control agents to manage damaging insect populations. By introducing natural predators and parasites, farmers can maintain pest thresholds below economic injury levels without chemical synthetic insecticides.

Key Beneficial Insects:
1. Ladybugs (Coccinellidae): Highly effective predators of aphids, scale insects, and spider mites.
2. Green Lacewings (Chrysopidae): Known as 'aphid lions', their larvae devour soft-bodied pests, thrips, and caterpillars.
3. Parasitoid Wasps (e.g., Encarsia formosa): Lay eggs inside pests, particularly whiteflies, effectively sterilizing the infestation.

Microbial Agents:
- Bacillus thuringiensis (Bt): A natural bacterium producing proteins toxic to specific caterpillars, beetles, and mosquitoes. It does not harm bees or mammals.
- Beauveria bassiana: An entomopathogenic fungus that penetrates the insect cuticle, causing death. Effective against whiteflies, aphids, and thrips.

Best Practices for Release:
Always release beneficial insects during cooler parts of the day (dusk or dawn) and lightly mist the foliage to encourage them to stay. Ensure weed-free zones are maintained to minimize alternative hosts for target pests.`,
    author: 'Elena Rostova, Pest Control Specialist',
    readTime: '7 min read',
    tags: ['Biological Controls', 'Organic Farming', 'Integrated Pest Management'],
    publishedDate: 'May 24, 2026'
  },
  {
    id: 'art-4',
    title: 'Optimizing Micro-Irrigation for Root Health',
    category: 'Resources',
    summary: 'How to calculate precise drip watering schedules to prevent waterlogging, anaerobic root stress, and fungal root rots.',
    content: `Water is the lifeblood of agriculture, but excess water can be just as damaging as drought. Over-watering suffocates plant roots, causing root rots (Pythium, Phytophthora, Rhizoctonia) due to lack of oxygen in the soil pores.

The Solution: Micro-Irrigation (Drip)
Drip irrigation applies water directly to the plant's root zone, minimizing evaporation, leaf wetness, and weed germination.

Design Guidelines:
- Pressure Regulation: Maintain consistent pressure (typically 10-15 PSI) across the system to ensure uniform flow.
- Filtration: Always use screen or media filters to prevent emitter clogging from sand, algae, or mineral precipitates.
- Scheduling: Use tensiometers or soil moisture sensors to water only when soil water potential drops below a specific threshold (e.g., -30 kPa for vegetables).

Impact on Plant Immunity:
Proper soil-moisture management keeps root cells structurally strong and prevents physiological stress, which directly increases the plant's resistance to leaf-infecting pathogens.`,
    author: 'Marcus Vance, Irrigation Engineer',
    readTime: '4 min read',
    tags: ['Irrigation', 'Root Health', 'Drip Systems', 'Water Conservation'],
    publishedDate: 'April 15, 2026'
  },
  {
    id: 'art-5',
    title: 'Soil Nutrition and Its Direct Link to Plant Immunity',
    category: 'Prevention',
    summary: 'Discover how calcium, potassium, and micronutrients strengthen plant cell walls and prevent pathogen invasion.',
    content: `Healthy soil produces healthy plants. Just like humans, plants require a balanced diet to maintain active immune systems capable of resisting bacterial, viral, and fungal attacks.

Cellular Defenses:
- Calcium (Ca): Essential for building strong cell walls. Calcium pectate acts as a cement holding cells together. Strong walls block fungal hyphae from physical penetration.
- Potassium (K): Regulates stomatal opening and closing. Well-nourished plants close stomata quickly when under stress, preventing pathogen spores from entering leaf tissues.
- Silicon (Si): Deposited in epidermal layers, silicon forms a physical barrier that blunts insect mouthparts and restricts fungal growth.

The Danger of Excess Nitrogen:
Over-fertilizing with nitrogen promotes rapid, soft, watery vegetative growth. This succulent tissue is highly susceptible to pests and diseases like powdery mildew. Balanced nutrition, based on regular soil tests, is the ultimate baseline defense.`,
    author: 'Dr. Evelyn Carter, Agronomist',
    readTime: '5 min read',
    tags: ['Soil Chemistry', 'Plant Nutrition', 'Fertilizer', 'Immune System'],
    publishedDate: 'June 01, 2026'
  },
  {
    id: 'art-6',
    title: 'Spotting Powdery Mildew Across Multiple Crop Families',
    category: 'Disease',
    summary: 'Identify the distinct signs of Podosphaera and Erysiphe species on cucurbits, nightshades, and fruit crops.',
    content: `Powdery mildew is a fungal disease that affects a wide range of plants. Unlike most fungi, it can thrive in warm, dry climates, though it requires high relative humidity at night to form spores.

Visual Indicators:
- White, circular, powdery spots on the upper or lower surfaces of leaves.
- Leaf curling, yellowing, and gradual dry-up.
- In severe cases, buds, flowers, and young stems become entirely covered in white mycelium, leading to stunted development.

Susceptible Families:
- Cucurbits (Melons, Cucumbers, Squash): Fast-acting spore development during high-temperature months.
- Solanaceous (Eggplants, Tomatoes): Primarily affects older leaves first, working its way up.

Organic Treatment Interventions:
1. Potassium Bicarbonate: Creates an alkaline leaf environment, rendering spores non-viable.
2. Horticultural Oils: Suffocates existing fungal structures and limits spore distribution.
3. Neem Oil: A multi-purpose organic fungicide and insect repellant that breaks down quickly without environmental toxicity.`,
    author: 'Elena Rostova, Pest Control Specialist',
    readTime: '6 min read',
    tags: ['Powdery Mildew', 'Fungal Diseases', 'Organic Remedies', 'Cucurbits'],
    publishedDate: 'May 12, 2026'
  },
  {
    id: 'art-7',
    title: 'Diagnostic Checklist: Distinguishing Bacterial vs. Fungal Spotting',
    category: 'Disease',
    summary: 'A visual and physical guideline for field agronomists to determine pathogen classes before applying chemical controls.',
    content: `Applying the wrong treatment can be expensive and ineffective. Fungal and bacterial infections often look similar on foliage, but their biological differences dictate vastly different control methods.

Comparative Diagnostic Checklist:

1. Lesion Boundaries:
   - Bacterial: Frequently angular, bordered by leaf veins (since bacteria cannot easily cross vascular bundles). Often look water-soaked.
   - Fungal: Generally circular or concentric, resembling targets (as fungal hyphae grow radially in all directions).

2. Under-Leaf Signs:
   - Bacterial: No spores. May see tiny droplets of dried bacterial ooze in highly humid environments.
   - Fungal: Velvety, fuzzy, or dark mold-like spores on the underside of lesions under damp conditions.

3. Halo Presence:
   - Bacterial: Frequently bordered by bright yellow chlorotic halos caused by bacterial phytotoxins.
   - Fungal: Halos may exist, but are generally less defined or present as dark outer margins.

Conclusion:
If bacterial, skip standard anti-fungal copper unless combined with specific chemical agents, and avoid contact-handling leaves when wet.`,
    author: 'Dr. Evelyn Carter, Agronomist',
    readTime: '8 min read',
    tags: ['Field Diagnosis', 'Bacterial Spot', 'Fungal Spot', 'Botany'],
    publishedDate: 'April 30, 2026'
  },
  {
    id: 'art-8',
    title: 'Deploying Solarization for Soil-borne Disease Suppression',
    category: 'Prevention',
    summary: 'Utilize passive solar energy to pasteurize infested topsoil and eradicate stubborn nematodes and wilt pathogens.',
    content: `Soil-borne pathogens like Fusarium, Verticillium, and root-knot nematodes are notoriously difficult to eliminate because they hide deep within the soil matrix. Soil solarization is an eco-friendly method that uses solar heat to pasteurize soil.

How It Works:
Solarization involves covering moist soil with a transparent polyethylene sheet during high-temperature months. The plastic traps solar radiation, heating the top 6 inches of soil to over 120°F (50°C), which kills weed seeds and soil pathogens.

Implementation Protocol:
1. Preparation: Clean the field of crop residues, till the soil until smooth, and irrigate deeply (moisture conducts heat much faster than dry air).
2. Laying the Sheet: Securely lay a thin, transparent UV-stabilized plastic film over the soil. Seal the edges completely with soil to trap steam and heat.
3. Duration: Leave the plastic in place for 4 to 6 weeks during the peak solar season.
4. Cultivation: Remove the sheet and plant shallowly to avoid bringing unpasteurized soil from deeper layers to the surface.`,
    author: 'Marcus Vance, Irrigation Engineer',
    readTime: '5 min read',
    tags: ['Soil Pasteurization', 'Solarization', 'Fusarium', 'Nematodes'],
    publishedDate: 'March 14, 2026'
  },
  {
    id: 'art-9',
    title: 'Understanding Broad-Spectrum Biofungicides',
    category: 'Treatment',
    summary: 'A look at Bacillus and Trichoderma strains that offer chemical-free protection for sensitive root and foliage structures.',
    content: `Biofungicides are formulated using live beneficial microorganisms that actively combat pathogenic fungi through competition, antibiosis, and hyperparasitism.

Primary Active Strains:
- Bacillus amyloliquefaciens: Colonizes root and leaf surfaces, creating a physical biofilm barrier. It secretes cyclic lipopeptides that disrupt the cellular membranes of incoming pathogens.
- Trichoderma harzianum: A highly aggressive beneficial soil fungus. It grows directly around root systems, intercepting harmful pathogens like Pythium and Phytophthora, and actively stimulates crop root development.

Application Guidance:
Apply biofungicides early in the planting cycle. Because they are living organisms, they work best as a preventative shield, establishing their colonies before pathogenic strains arrive. Do not mix biofungicides directly with strong chemical bactericides like copper in the same tank.`,
    author: 'Elena Rostova, Pest Control Specialist',
    readTime: '6 min read',
    tags: ['Biofungicides', 'Bacillus', 'Trichoderma', 'Organic Pest Control'],
    publishedDate: 'February 28, 2026'
  },
  {
    id: 'art-10',
    title: 'The Role of Companion Planting in Natural Pest Repellent Systems',
    category: 'Prevention',
    summary: 'Maximize biological crop defense by intercropping aromatic herbs, marigolds, and cover crops.',
    content: `Companion planting is the practice of growing mutually beneficial plants close together to maximize crop synergy, improve space utilization, and establish a biological barrier against insects.

Top Companion Pairings:
- Marigolds (Tagetes spp.): Produce alpha-terthienyl in their root secretions, which is highly toxic to parasitic nematodes. Plant them as borders around nightshades.
- Basil & Tomatoes: Basil's strong essential oils act as a natural masking agent, confusing thrips, hornworms, and flies that rely on visual and olfactory cues to target tomatoes.
- Alliums (Garlic, Onions): Repel aphids, weevils, and Japanese beetles. They act as natural pest boundaries.

Structural Intercropping:
Include tall companion plants (like sunflowers or corn) to act as visual shields and provide natural shade for lower-lying leafy greens, while simultaneously attracting pollinators.`,
    author: 'Dr. Evelyn Carter, Agronomist',
    readTime: '5 min read',
    tags: ['Companion Planting', 'Polyculture', 'Natural Barriers', 'Biodiversity'],
    publishedDate: 'May 05, 2026'
  },
  {
    id: 'art-11',
    title: 'Comprehensive Guide to Clean Seed Sourcing and Sanitation',
    category: 'Resources',
    summary: 'A critical checklist to ensure your input seeds do not introduce viral, bacterial, or fungal pathogens to your field.',
    content: `Many devastating plant diseases are seed-borne, meaning the pathogen lives inside or on the seed coat. Introducing contaminated seeds can introduce severe disease to clean, virgin soil.

Sourcing Checklist:
- Certified Disease-Free: Only buy seeds from reputable commercial suppliers that provide official phytosanitary certifications.
- Hybrid Resistance: Choose F1 hybrids with built-in resistance packages for your region's specific soil diseases.

At-Home Sanitation Methods:
1. Hot-Water Seed Treatment: Soaking seeds in hot water (typically 115°F to 125°F depending on crop type) for 20-30 minutes kills internal pathogens without harming germination.
2. Chlorine Bleach Wash: Soak seeds in a 10% household bleach solution for 10 minutes, then rinse thoroughly with clean running water to sterilize the outer seed coat.
3. Acid Treatment: Hydrochloric acid washes are commonly used for commercial tomato seeds to break down viral proteins like Tomato Mosaic Virus (ToMV).`,
    author: 'Mohamed Fawzy, AI Engineer & Agricultural Developer',
    readTime: '6 min read',
    tags: ['Seed Quality', 'Sanitation', 'Hot Water Treatment', 'Viruses'],
    publishedDate: 'January 12, 2026'
  },
  {
    id: 'art-12',
    title: 'Calibrating Sprayers for Efficient Treatment Coverage',
    category: 'Resources',
    summary: 'A mathematical and mechanical guide to ensuring uniform spray distribution and preventing expensive run-off wastage.',
    content: `Even the best organic or chemical treatment will fail if it is applied poorly. Under-applying leaves crop surfaces exposed, while over-applying causes chemical run-off, soil contamination, and financial loss.

Sprayer Calibration Guide:
- Nozzle Selection: Use hollow-cone nozzles for dense foliage sprays to produce fine droplets that coat both upper and lower leaf surfaces. Use flat-fan nozzles for soil applications.
- Pressure Control: Maintain a steady PSI (30-45 PSI is standard). Higher pressure creates mist that drifts away in wind, while lower pressure produces large droplets that drip off leaf tips.
- Speed Uniformity: Ground speed must remain constant during spray runs to ensure consistent distribution per acre.

Calculation Rule:
Gallons Per Acre (GPA) = (GPM * 5940) / (MPH * W)
Where GPM is sprayer output per nozzle, MPH is ground speed, and W is nozzle spacing in inches. Calibrate your sprayers at least twice a season!`,
    author: 'Marcus Vance, Irrigation Engineer',
    readTime: '7 min read',
    tags: ['Farm Engineering', 'Sprayer Calibration', 'Efficiency', 'Farming Resources'],
    publishedDate: 'April 02, 2026'
  }
];
