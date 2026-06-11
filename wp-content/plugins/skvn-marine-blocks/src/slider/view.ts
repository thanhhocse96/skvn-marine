import Swiper from 'swiper';
import {
	A11y,
	Autoplay,
	EffectFade,
	Keyboard,
	Navigation,
	Pagination,
} from 'swiper/modules';
import { __ } from '@wordpress/i18n';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './style.css';

type SliderConfig = {
	autoplay?: boolean;
	delay?: number;
	loop?: boolean;
	arrows?: boolean;
	dots?: boolean;
	effect?: string;
	slidesPerView?: number;
	responsiveSlides?: string;
};

type NormalizedSliderConfig = {
	autoplay: boolean;
	delay: number;
	loop: boolean;
	arrows: boolean;
	dots: boolean;
	effect: 'fade' | 'slide';
	slidesPerView: number;
	responsiveSlides: '3-2-1' | 'uniform';
};

type SliderElement = HTMLElement & {
	swiper?: Swiper;
};

const prefersReduced = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
).matches;

function clampInteger(
	value: unknown,
	fallback: number,
	minimum: number,
	maximum: number
) {
	return typeof value === 'number' && Number.isFinite( value )
		? Math.min( maximum, Math.max( minimum, Math.round( value ) ) )
		: fallback;
}

function parseSliderConfig( rawConfig: string ): NormalizedSliderConfig {
	let parsed: SliderConfig = {};

	try {
		const candidate = JSON.parse( rawConfig ) as SliderConfig;
		parsed =
			candidate && typeof candidate === 'object' ? candidate : {};
	} catch {
		parsed = {};
	}

	return {
		autoplay:
			typeof parsed.autoplay === 'boolean' ? parsed.autoplay : true,
		delay: clampInteger( parsed.delay, 5000, 1000, 12000 ),
		loop: typeof parsed.loop === 'boolean' ? parsed.loop : true,
		arrows: typeof parsed.arrows === 'boolean' ? parsed.arrows : true,
		dots: typeof parsed.dots === 'boolean' ? parsed.dots : true,
		effect: parsed.effect === 'fade' ? 'fade' : 'slide',
		slidesPerView: clampInteger( parsed.slidesPerView, 1, 1, 4 ),
		responsiveSlides:
			parsed.responsiveSlides === '3-2-1' ? '3-2-1' : 'uniform',
	};
}

document
	.querySelectorAll< SliderElement >( '[data-skvn-slider]' )
	.forEach( ( slider ) => {
		if (
			slider.swiper ||
			slider.dataset.skvnSliderInitialized === 'true'
		) {
			return;
		}

		const rawConfig = slider.getAttribute( 'data-skvn-slider' ) || '{}';
		const config = parseSliderConfig( rawConfig );
		const usesCardBreakpoints = config.responsiveSlides === '3-2-1';

		slider.dataset.skvnSliderInitialized = 'true';
		slider.classList.add( 'skvn-slider--initialized' );

		try {
			const swiper = new Swiper( slider, {
				modules: [
					A11y,
					Autoplay,
					EffectFade,
					Keyboard,
					Navigation,
					Pagination,
				],
				a11y: {
					containerRoleDescriptionMessage: __(
						'Carousel',
						'skvn-marine-blocks'
					),
					nextSlideMessage: __(
						'Next slide',
						'skvn-marine-blocks'
					),
					prevSlideMessage: __(
						'Previous slide',
						'skvn-marine-blocks'
					),
					slideLabelMessage: __(
						'{{index}} of {{slidesLength}}',
						'skvn-marine-blocks'
					),
				},
				autoplay:
					config.autoplay && ! prefersReduced
						? {
								delay: config.delay,
								pauseOnMouseEnter: true,
						  }
						: false,
				effect: config.effect,
				fadeEffect: {
					crossFade: true,
				},
				keyboard: { enabled: true },
				loop: config.loop,
				navigation: config.arrows
					? {
							nextEl: slider.querySelector< HTMLElement >(
								'.swiper-button-next'
							),
							prevEl: slider.querySelector< HTMLElement >(
								'.swiper-button-prev'
							),
					  }
					: false,
				pagination: config.dots
					? {
							clickable: true,
							el: slider.querySelector< HTMLElement >(
								'.swiper-pagination'
							),
					  }
					: false,
				breakpoints: usesCardBreakpoints
					? {
							600: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
					  }
					: undefined,
				slidesPerView: usesCardBreakpoints
					? 1
					: config.slidesPerView,
			} );

			slider.addEventListener( 'focusin', () => {
				swiper.autoplay?.pause();
			} );
			slider.addEventListener( 'focusout', () => {
				window.setTimeout( () => {
					if (
						! slider.contains( document.activeElement ) &&
						config.autoplay &&
						! prefersReduced
					) {
						swiper.autoplay?.resume();
					}
				}, 0 );
			} );
		} catch {
			delete slider.dataset.skvnSliderInitialized;
			slider.classList.remove( 'skvn-slider--initialized' );
		}
	} );
