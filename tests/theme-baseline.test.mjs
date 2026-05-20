import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const themeJson = JSON.parse(
	readFileSync(resolve(root, 'wp-content/themes/skvn-marine/theme.json'), 'utf8'),
);
const styleCss = readFileSync(
	resolve(root, 'wp-content/themes/skvn-marine/style.css'),
	'utf8',
);
const blockStylesPhp = readFileSync(
	resolve(root, 'wp-content/themes/skvn-marine/inc/block-styles.php'),
	'utf8',
);

const palette = themeJson.settings?.color?.palette ?? [];
const paletteSlugs = new Set(palette.map((color) => color.slug));

for (const slug of [
	'skvn-blue-950',
	'skvn-blue-900',
	'skvn-blue-700',
	'skvn-teal-600',
	'skvn-sky-50',
	'skvn-slate-700',
	'skvn-white',
]) {
	assert.ok(paletteSlugs.has(slug), `theme.json missing color slug: ${slug}`);
}

assert.equal(themeJson.settings?.layout?.contentSize, '760px');
assert.equal(themeJson.settings?.layout?.wideSize, '1200px');

const fontSizes = themeJson.settings?.typography?.fontSizes ?? [];
for (const fontSize of fontSizes) {
	assert.ok(
		!/clamp\(|vw/i.test(fontSize.size),
		`font size ${fontSize.slug} must not use viewport scaling`,
	);
}

for (const className of [
	'.skvn-section',
	'.skvn-container',
	'.skvn-button',
	'.skvn-button--primary',
	'.skvn-card',
	'.is-style-skvn-card',
	'.is-style-skvn-rounded-media',
	'.skvn-site-header',
	'.skvn-site-footer',
]) {
	assert.ok(styleCss.includes(className), `style.css missing ${className}`);
}

for (const customProperty of [
	'--skvn-color-blue-950',
	'--skvn-color-blue-700',
	'--skvn-color-teal-600',
	'--skvn-radius-card',
	'--skvn-shadow-card',
]) {
	assert.ok(styleCss.includes(customProperty), `style.css missing ${customProperty}`);
}

for (const blockStyle of [
	"'name'  => 'skvn-primary'",
	"'name'  => 'skvn-section'",
	"'name'  => 'skvn-card'",
	"'name'  => 'skvn-rounded-media'",
]) {
	assert.ok(blockStylesPhp.includes(blockStyle), `block-styles.php missing ${blockStyle}`);
}
