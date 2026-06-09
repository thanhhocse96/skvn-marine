const showcaseSelector = '.skvn-feature-showcase';
const itemSelector = '.skvn-feature-showcase__item';
const summarySelector = '.skvn-feature-showcase__summary';
const desktopHoverQuery = window.matchMedia(
	'(hover: hover) and (pointer: fine)'
);

document
	.querySelectorAll< HTMLElement >( showcaseSelector )
	.forEach( ( showcase ) => {
		const items = Array.from(
			showcase.querySelectorAll< HTMLDetailsElement >( itemSelector )
		);

		if ( items.length === 0 ) {
			return;
		}

		let activeItem =
			items.find( ( item ) => item.open ) || items[ items.length - 1 ];
		let isSynchronizing = false;

		const activate = ( nextItem: HTMLDetailsElement ) => {
			if ( isSynchronizing ) {
				return;
			}

			isSynchronizing = true;
			items.forEach( ( item ) => {
				item.open = item === nextItem;
			} );
			activeItem = nextItem;
			isSynchronizing = false;
		};

		activate( activeItem );
		showcase.classList.add( 'skvn-feature-showcase--enhanced' );

		items.forEach( ( item ) => {
			const summary =
				item.querySelector< HTMLElement >( summarySelector );

			summary?.addEventListener( 'click', ( event ) => {
				event.preventDefault();
				activate( item );
			} );

			item.addEventListener( 'pointerenter', () => {
				if ( desktopHoverQuery.matches ) {
					activate( item );
				}
			} );
		} );
	} );
