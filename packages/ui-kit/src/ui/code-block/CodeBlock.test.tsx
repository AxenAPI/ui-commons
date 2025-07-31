import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { CodeBlock } from './CodeBlock.tsx';

describe('/ui/code-block/CodeBlock.tsx', () => {
  it('renders code with specified language', () => {
    const code = 'console.log("Hello World!");';
    const language = 'javascript';
    const { container } = render(<CodeBlock code={code} language={language} />);

    expect(container.querySelector(`.language-${language}`)).toBeInTheDocument();
  });

  it('uses prism.js for syntax highlighting', () => {
    const code = '// console.log("Hello World!");';
    const language = 'javascript';
    const { container } = render(<CodeBlock code={code} language={language} />);

    expect(container.querySelector('.token.comment')).toBeInTheDocument();
  });

  it('handles rendering errors to prevent XSS attacks', () => {
    const code = '<script>alert("XSS")</script>';
    const language = 'javascript';
    const { container } = render(<CodeBlock code={code} language={language} />);

    expect(container.querySelector('script')).not.toBeInTheDocument();
  });

  it('renders code with HTML entities', () => {
    const code = '<p>Hello World!</p>';
    const language = 'html';
    const { container } = render(<CodeBlock code={code} language={language} />);

    expect(container.querySelector('pre')).toHaveTextContent(code);
  });

  it('renders long text without issues', () => {
    const code = 'a'.repeat(1000);
    const language = 'text';
    const { container } = render(<CodeBlock code={code} language={language} />);

    expect(container.querySelector('pre')).toHaveTextContent(code);
  });
});
