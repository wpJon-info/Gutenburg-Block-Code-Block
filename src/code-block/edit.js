/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { content, language } = attributes;

	const languageOptions = [
		{ label: 'JavaScript', value: 'javascript' },
		{ label: 'HTML', value: 'html' },
		{ label: 'CSS', value: 'css' },
		{ label: 'PHP', value: 'php' },
		{ label: 'Python', value: 'python' },
		{ label: 'JSON', value: 'json' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Code Settings', 'jon-gutenberg-dev-code-block')}>
					<SelectControl
						label={__('Language', 'jon-gutenberg-dev-code-block')}
						value={language}
						options={languageOptions}
						onChange={(newLanguage) => setAttributes({ language: newLanguage })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className="language-label">{language}</div>
				<RichText
					tagName="pre"
					className="custom-code-block"
					value={content}
					onChange={(value) => setAttributes({ content: value })}
					placeholder={__('// Enter your code here...', 'jon-gutenberg-dev-code-block')}
					allowedFormats={[]}
				/>
			</div>
		</>
	);
}