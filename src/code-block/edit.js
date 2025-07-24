import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InspectorControls,
    PlainText 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    SelectControl,
    ToggleControl 
} from '@wordpress/components';

const LANGUAGE_OPTIONS = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'PHP', value: 'php' },
    { label: 'CSS', value: 'css' },
    { label: 'HTML', value: 'html' },
    { label: 'Python', value: 'python' },
    { label: 'JSON', value: 'json' },
    { label: 'XML', value: 'xml' },
    { label: 'SQL', value: 'sql' },
    { label: 'Plain Text', value: 'text' }
];

export default function Edit({ attributes, setAttributes }) {
    const { content, language, showLineNumbers } = attributes;
    
    const blockProps = useBlockProps({
        className: `code-display-block language-${language}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Code Settings', 'jon-gutenberg-dev-code-block')}>
                    <SelectControl
                        label={__('Language', 'jon-gutenberg-dev-code-block')}
                        value={language}
                        options={LANGUAGE_OPTIONS}
                        onChange={(value) => setAttributes({ language: value })}
                    />
                    <ToggleControl
                        label={__('Show Line Numbers', 'jon-gutenberg-dev-code-block')}
                        checked={showLineNumbers}
                        onChange={(value) => setAttributes({ showLineNumbers: value })}
                    />
                </PanelBody>
            </InspectorControls>
            
            <div {...blockProps}>
                <div className="code-block-header">
                    <span className="language-label">{language}</span>
                    <button className="copy-button" type="button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                </div>
                <div className="code-content">
                    <PlainText
                        value={content}
                        onChange={(value) => setAttributes({ content: value })}
                        placeholder={__('Enter your code here...', 'jon-gutenberg-dev-code-block')}
                        className="code-input"
                    />
                </div>
            </div>
        </>
    );
}