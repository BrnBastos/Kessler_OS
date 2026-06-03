import type { ImageSourcePropType } from 'react-native';

type VisualAsset = ImageSourcePropType;

export const visualAssets = {
  backgrounds: {
    cityImpact: require('../../assets/images/generated_images/ChatGPT Image Jun 2, 2026, 03_18_42 PM (5).png') as VisualAsset,
    heroOrbit: require('../../assets/images/generated_images/ChatGPT Image Jun 2, 2026, 03_07_14 PM (2).png') as VisualAsset,
    observatory: require('../../assets/images/generated_images/ChatGPT Image Jun 2, 2026, 03_18_41 PM (1).png') as VisualAsset,
    satelliteOverEarth: require('../../assets/images/generated_images/ChatGPT Image Jun 2, 2026, 03_07_08 PM (1).png') as VisualAsset,
    skyFamily: require('../../assets/images/generated_images/ChatGPT Image Jun 2, 2026, 03_18_41 PM (3).png') as VisualAsset,
    reuseLab: require('../../assets/images/generated_images/ChatGPT Image Jun 2, 2026, 03_20_15 PM.png') as VisualAsset,
  },
  objects: {
    damagedSatellite: require('../../assets/images/generated_images/damaged_satellite_transparent.png') as VisualAsset,
    recyclingModule: require('../../assets/images/generated_images/orbital_recycling_module_transparent.png') as VisualAsset,
    rocketBody: require('../../assets/images/generated_images/rocket_body_upper_stage_transparent.png') as VisualAsset,
    servicingSatellite: require('../../assets/images/generated_images/robotic_servicing_satellite_transparent.png') as VisualAsset,
  },
} as const;
