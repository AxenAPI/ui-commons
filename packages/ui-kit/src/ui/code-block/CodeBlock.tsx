import { FC, useEffect } from 'react';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

import { NCodeBlock } from './models';

export const CodeBlock: FC<NCodeBlock.TProps> = ({ code, language = 'javascript' }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="codeBlock">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};
