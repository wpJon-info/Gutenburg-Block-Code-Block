import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { content, language, showLineNumbers } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `code-display-block language-${language}`
    });

    // Simple syntax highlighting patterns for common languages
    const highlightCode = (code, lang) => {
        if (!code) return '';
        
        let highlighted = code;
        
        // Escape HTML first
        highlighted = highlighted
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        switch (lang) {
            case 'javascript':
                highlighted = highlighted
                    // Keywords
                    .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|default|from)\b/g, '<span class="keyword">$1</span>')
                    // Strings
                    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
                    // Comments
                    .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
                    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
                    // Numbers
                    .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
                break;
                
            case 'php':
                highlighted = highlighted
                    .replace(/\b(function|return|if|else|foreach|while|class|public|private|protected|static)\b/g, '<span class="keyword">$1</span>')
                    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
                    .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
                    .replace(/(\$\w+)/g, '<span class="variable">$1</span>');
                break;
                
            case 'css':
                highlighted = highlighted
                    .replace(/([.#]?[\w-]+)(\s*{)/g, '<span class="selector">$1</span>$2')
                    .replace(/([\w-]+)(\s*:)/g, '<span class="property">$1</span>$2')
                    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
                    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
                break;
        }
        
        return highlighted;
    };

    const addLineNumbers = (code) => {
        const lines = code.split('\n');
        return lines.map((line, index) => 
            `<span class="line-number">${index + 1}</span>${line}`
        ).join('\n');
    };

    let processedContent = highlightCode(content, language);
    if (showLineNumbers) {
        processedContent = addLineNumbers(processedContent);
    }

    return (
        <div {...blockProps}>
            <div className="code-block-header">
                <span className="language-label">{language}</span>
                <button className="copy-button" type="button" onClick={() => navigator.clipboard?.writeText(content)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
            </div>
            <div className="code-content">
                <pre><code dangerouslySetInnerHTML={{ __html: processedContent }}></code></pre>
            </div>
        </div>
    );
}