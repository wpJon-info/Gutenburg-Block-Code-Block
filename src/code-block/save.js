import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { content, language, showLineNumbers } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `code-display-block language-${language}`
    });

    // Escape HTML for safe display
    const escapeHtml = (code) => {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    // Map common language names to Prism language classes
    const getPrismLanguage = (lang) => {
        const languageMap = {
            'js': 'javascript',
            'html': 'markup',
            'xml': 'markup',
            'svg': 'markup',
            'mathml': 'markup',
            'ssml': 'markup',
            'atom': 'markup',
            'rss': 'markup'
        };
        return languageMap[lang] || lang;
    };

    const prismLanguage = getPrismLanguage(language);

    return (
        <div {...blockProps}>
            <div className="code-block-header">
                <span className="language-label">{language}</span>
                <button 
                    className="copy-button" 
                    type="button" 
                    data-copy-content={content}
                    aria-label="Copy code"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2 2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            </div>
            <div className="code-content">
                <pre className={showLineNumbers ? 'line-numbers' : ''}>
                    <code className={`language-${prismLanguage}`}>
                        {escapeHtml(content)}
                    </code>
                </pre>
            </div>
        </div>
    );
}