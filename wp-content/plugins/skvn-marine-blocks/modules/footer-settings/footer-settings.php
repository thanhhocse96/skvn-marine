<?php
/**
 * Footer page settings for SKVN Marine Blocks.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const SKVN_MARINE_BLOCKS_FOOTER_PAGE_OPTION = 'skvn_footer_page_id';

add_action( 'admin_menu', 'skvn_marine_blocks_footer_settings_menu' );
add_action( 'admin_init', 'skvn_marine_blocks_register_footer_settings' );

/**
 * Register the footer settings admin page.
 *
 * @return void
 */
function skvn_marine_blocks_footer_settings_menu() {
	add_options_page(
		esc_html__( 'SKVN Footer Settings', 'skvn-marine-blocks' ),
		esc_html__( 'SKVN Footer', 'skvn-marine-blocks' ),
		'manage_options',
		'skvn-marine-footer-settings',
		'skvn_marine_blocks_render_footer_settings_page'
	);
}

/**
 * Register the footer page option.
 *
 * @return void
 */
function skvn_marine_blocks_register_footer_settings() {
	register_setting(
		'skvn_marine_blocks_footer_settings',
		SKVN_MARINE_BLOCKS_FOOTER_PAGE_OPTION,
		array(
			'type'              => 'integer',
			'sanitize_callback' => 'skvn_marine_blocks_sanitize_footer_page_id',
			'default'           => 0,
		)
	);

	add_settings_section(
		'skvn_marine_blocks_footer_settings_main',
		esc_html__( 'Reusable Footer Page', 'skvn-marine-blocks' ),
		'skvn_marine_blocks_render_footer_settings_section',
		'skvn-marine-footer-settings'
	);

	add_settings_field(
		SKVN_MARINE_BLOCKS_FOOTER_PAGE_OPTION,
		esc_html__( 'Footer page', 'skvn-marine-blocks' ),
		'skvn_marine_blocks_render_footer_page_field',
		'skvn-marine-footer-settings',
		'skvn_marine_blocks_footer_settings_main'
	);
}

/**
 * Sanitize the selected footer page ID.
 *
 * @param mixed $value Raw option value.
 * @return int
 */
function skvn_marine_blocks_sanitize_footer_page_id( $value ) {
	$page_id = absint( $value );

	if ( 0 === $page_id ) {
		return 0;
	}

	$page = get_post( $page_id );

	if ( ! $page || 'page' !== $page->post_type || 'publish' !== $page->post_status ) {
		return 0;
	}

	return $page_id;
}

/**
 * Render the settings page intro.
 *
 * @return void
 */
function skvn_marine_blocks_render_footer_settings_section() {
	echo '<p>' . esc_html__( 'Choose a published WordPress page to render as the site footer. Leave empty to use the default GeneratePress footer.', 'skvn-marine-blocks' ) . '</p>';
}

/**
 * Render the footer page select field.
 *
 * @return void
 */
function skvn_marine_blocks_render_footer_page_field() {
	$selected_page_id = skvn_marine_blocks_get_footer_page_id();

	wp_dropdown_pages(
		array(
			'name'              => esc_attr( SKVN_MARINE_BLOCKS_FOOTER_PAGE_OPTION ),
			'id'                => esc_attr( SKVN_MARINE_BLOCKS_FOOTER_PAGE_OPTION ),
			'selected'          => $selected_page_id,
			'post_status'       => 'publish',
			'show_option_none'  => esc_html__( 'Use default GeneratePress footer', 'skvn-marine-blocks' ),
			'option_none_value' => '0',
		)
	);
}

/**
 * Render the footer settings admin page.
 *
 * @return void
 */
function skvn_marine_blocks_render_footer_settings_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	?>
	<div class="wrap">
		<h1><?php echo esc_html__( 'SKVN Footer Settings', 'skvn-marine-blocks' ); ?></h1>
		<form action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="post">
			<?php
			settings_fields( 'skvn_marine_blocks_footer_settings' );
			do_settings_sections( 'skvn-marine-footer-settings' );
			submit_button();
			?>
		</form>
	</div>
	<?php
}

/**
 * Get the sanitized selected footer page ID.
 *
 * @return int
 */
function skvn_marine_blocks_get_footer_page_id() {
	return skvn_marine_blocks_sanitize_footer_page_id(
		get_option( SKVN_MARINE_BLOCKS_FOOTER_PAGE_OPTION, 0 )
	);
}
