<?php
/**
 * Plugin Name:       Jon Gutenberg Dev Code Block
 * Description:       A custom code block for enhanced content editing.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Jon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       jon-gutenberg-dev-code-block
 *
 * @package JonGutenbergDevCodeBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function jon_gutenberg_dev_code_block_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	if ( file_exists( __DIR__ . '/build/blocks-manifest.php' ) ) {
		$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( __DIR__ . "/build/{$block_type}" );
		}
	} else {
		// Fallback to simple registration if manifest doesn't exist
		register_block_type( __DIR__ . '/build' );
	}
}
add_action( 'init', 'jon_gutenberg_dev_code_block_init' );

/**
 * Enqueue Prism.js assets for syntax highlighting on frontend
 */
function jon_gutenberg_dev_code_block_enqueue_prism_assets() {
    // Only enqueue on frontend, not in editor
    if ( is_admin() ) {
        return;
    }
    
    // Check if page has our code block
    if ( has_block( 'jon-gutenberg-dev/code-block' ) ) {
        // Core Prism.js
        wp_enqueue_script(
            'prismjs-core',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js',
            array(),
            '1.29.0',
            true
        );
        
        // Load autoloader plugin (it will automatically load language components as needed)
        wp_enqueue_script(
            'prismjs-autoloader',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js',
            array( 'prismjs-core' ),
            '1.29.0',
            true
        );
        
        // Configure autoloader to use CDN
        wp_add_inline_script(
            'prismjs-autoloader',
            'Prism.plugins.autoloader.languages_path = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/";',
            'before'
        );
        
        // Prism plugins
        wp_enqueue_script(
            'prismjs-line-numbers',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js',
            array( 'prismjs-core' ),
            '1.29.0',
            true
        );
        
        // Prism theme CSS - LIGHT THEMES (uncomment the one you want)
        
        // Option 1: Default light theme
        // wp_enqueue_style(
        //     'prismjs-theme',
        //     'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css',
        //     array(),
        //     '1.29.0'
        // );
        
        // Option 2: Solarized Light
        // wp_enqueue_style(
        //     'prismjs-theme',
        //     'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-solarizedlight.min.css',
        //     array(),
        //     '1.29.0'
        // );
        
        // Option 3: VS Code Light
        // wp_enqueue_style(
        //     'prismjs-theme',
        //     'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-vs.min.css',
        //     array(),
        //     '1.29.0'
        // );
        
        // Option 4: Coy (light with shadows)
        // wp_enqueue_style(
        //     'prismjs-theme',
        //     'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css',
        //     array(),
        //     '1.29.0'
        // );
        
        // Option 5: Ghcolors (GitHub-like)
        // wp_enqueue_style(
        //     'prismjs-theme',
        //     'https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-ghcolors.min.css',
        //     array(),
        //     '1.9.0'
        // );
        
        // Line numbers plugin CSS
        wp_enqueue_style(
            'prismjs-line-numbers',
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css',
            array( 'prismjs-theme' ),
            '1.29.0'
        );
        
        // Custom initialization script
        wp_add_inline_script(
            'prismjs-core',
            '
            document.addEventListener("DOMContentLoaded", function() {
                // Initialize Prism
                if (typeof Prism !== "undefined") {
                    Prism.highlightAll();
                }
                
                // Handle copy buttons
                const copyButtons = document.querySelectorAll(".code-display-block .copy-button");
                copyButtons.forEach(button => {
                    button.addEventListener("click", function() {
                        const content = this.getAttribute("data-copy-content");
                        
                        if (content && navigator.clipboard) {
                            navigator.clipboard.writeText(content).then(() => {
                                // Visual feedback
                                const originalHTML = this.innerHTML;
                                this.innerHTML = \'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>\';
                                this.classList.add("copied");
                                
                                setTimeout(() => {
                                    this.innerHTML = originalHTML;
                                    this.classList.remove("copied");
                                }, 2000);
                            }).catch(err => {
                                console.error("Failed to copy:", err);
                            });
                        }
                    });
                });
            });
            '
        );
    }
}
add_action( 'wp_enqueue_scripts', 'jon_gutenberg_dev_code_block_enqueue_prism_assets' );