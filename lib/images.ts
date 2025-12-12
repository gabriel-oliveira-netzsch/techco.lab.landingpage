/**
 * Image asset mapping for the Techco.lab landing page
 * Maps semantic names to image paths for better maintainability
 */

export const images = {
  // Executive/Team photos
  jensNiesner: '/images/04993c766482d68c0449421b339679c6c3508819.png',
  
  // Hero and feature images
  heroImage: '/images/f2caf900-34bf-48f6-b236-4c384efb2f85.png',
  heroImageAlt: '/images/a6902b77-d1d4-4d71-a265-8c0691d662da.jpg',
  
  // Certification badges
  gptwCertified: '/images/1a891033b140f013daed427c3793e9af5c926d73.png',
  
  // Feature/Section images
  frame107: '/images/a4d91527-212e-4a27-bfcf-dba6ffbde6e9.png',
  frame108: '/images/48f12d87-1fd5-4d6c-871a-1260306c1804.png',
  image21: '/images/697ef6cc40d44a6620bf2d0f0d9a0439ad196c24.png',
  
  // Additional assets
  asset1: '/images/0d5db33a0f5332098135dbb74709a43dff981ff3.png',
  asset2: '/images/152a939bd3cb6b1965a6a55d6729372cf3f2830b.png',
  asset3: '/images/1ed63d42b217fb77086214d1a4053b0ccc56626c.png',
  asset4: '/images/3d4a2b8345b7facfeab29555d2821be233cca986.png',
  asset5: '/images/5a61b23c7fabdbf0a2e81885434238fb8cb8cf01.png',
  asset6: '/images/5dce8dd86611ea9dc8b64685a289d2561e41d0a7.png',
  asset7: '/images/60d9c54907b02539dc31091e8caa0fa936196070.png',
  asset8: '/images/8e53efde8aef43d8ad50c550d9571e879cdec773.png',
  asset9: '/images/8f8232b16a314eacfd40c8074dc5f877c3198e1d.png',
  asset10: '/images/9ffedf051fce28c3bd2bcbf02727969c51cf8e1a.png',
  asset11: '/images/b0335c07e1114c892064d1d45af79f8e213c5547.png',
  asset12: '/images/d6509017db2b2ab9db977b1796ae9666a556ee62.png',
  asset13: '/images/de4de3e10d800ab5ed98fcdd7cc617109ab7a2db.png',
} as const;

export type ImageKey = keyof typeof images;

