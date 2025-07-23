<?php
// This file is generated. Do not modify it manually.
return array(
	'code-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'jon-gutenberg-dev/code-block',
		'version' => '1.0.0',
		'title' => 'Jon Gutenberg Dev Code Block',
		'category' => 'text',
		'icon' => 'media-code',
		'description' => 'A custom code block for enhanced content editing.',
		'example' => array(
			
		),
		'attributes' => array(
			'content' => array(
				'type' => 'string',
				'default' => '// Enter your code here...'
			),
			'language' => array(
				'type' => 'string',
				'default' => 'javascript'
			)
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'gradients' => true,
				'link' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true,
					'link' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'margin' => false,
					'padding' => false
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'jon-gutenberg-dev-code-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
