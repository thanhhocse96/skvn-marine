export type FeatureItem = {
	kicker: string;
	heading: string;
	copy: string;
	imageId: number;
	imageUrl: string;
	imageAlt: string;
};

export type FeatureShowcaseAttributes = {
	desktopLayout: 'horizontal' | 'vertical';
	mobileBehavior: 'accordion' | 'hidden';
	defaultOpen: 'first' | 'last' | 'none';
	gradientPreset: '' | 'deep-navy' | 'marine-teal' | 'fresh-sky';
	labelRotation: 'default' | '180';
	items: FeatureItem[];
};
