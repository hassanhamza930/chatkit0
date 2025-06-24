'use client';

import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

// Custom styles for markdown elements
const markdownStyles = {
  heading: 'font-semibold mt-6 mb-3',
  paragraph: 'my-3 leading-relaxed font-light',
  list: 'my-2 pl-6 space-y-1',
  listItem: 'my-1',
  codeBlock: 'bg-white/90 text-black',
  inlineCode: 'bg-white/90 text-black px-1.5 py-0.5 rounded text-sm',
  blockquote: 'border-l-4 border-blue-500 pl-4 py-1 my-4 text-gray-300 italic',
  table: 'w-full my-4 border-collapse border border-gray-700',
  tableHead: 'bg-gray-800',
  tableCell: 'border border-gray-700 p-2',
  tableHeadCell: 'border border-gray-700 p-2 font-semibold text-left',
  link: 'text-blue-400 hover:underline',
  divider: 'border-t border-gray-700 my-6',
  image: 'rounded-lg my-4 max-w-full h-auto',
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`${className} overflow-hidden`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Headings
          h1: ({ node, ...props }) => <h1 className={`${markdownStyles.heading} text-xl md:text-2xl `} {...props} />,
          h2: ({ node, ...props }) => <h2 className={`${markdownStyles.heading} text-lg md:text-xl  `} {...props} />,
          h3: ({ node, ...props }) => <h3 className={`${markdownStyles.heading} text-base md:text-lg`} {...props} />,
          h4: ({ node, ...props }) => <h4 className={`${markdownStyles.heading} text-sm md:text-base`} {...props} />,
          h5: ({ node, ...props }) => <h5 className={`${markdownStyles.heading} text-xs md:text-sm`} {...props} />,
          h6: ({ node, ...props }) => <h6 className={`${markdownStyles.heading} text-xs md:text-xs`} {...props} />,

          // Paragraphs
          p: ({ node, ...props }) => <p className={`${markdownStyles.paragraph} text-sm md:text-base leading-normal`} {...props} />,

          // Links
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className={`${markdownStyles.link} hover:opacity-80 transition-opacity`}
            />
          ),

          // Code blocks and inline code
          code: ({
            node,
            inline,
            className,
            children,
            ...props
          }: React.HTMLAttributes<HTMLElement> & { inline?: boolean; node?: any }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative w-full my-4" style={{ overflow: 'hidden', contain: 'layout' }}>
                <div className="w-full rounded-lg code-block-scrollbar" style={{ overflow: 'auto', maxHeight: '600px', position: 'relative' }}>
                  <pre className={`${markdownStyles.codeBlock}`} style={{
                    margin: 0,
                    overflow: 'visible',
                    minWidth: 'fit-content',
                    whiteSpace: 'pre'
                  }}>
                    <code className={`${className} block`} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              </div>
            ) : (
              <code className={markdownStyles.inlineCode} {...props}>
                {children}
              </code>
            );
          },

          // Lists
          ul: ({ node, ...props }) => (
            <ul className={`${markdownStyles.list} list-disc`} {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className={`${markdownStyles.list} list-decimal`} {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className={markdownStyles.listItem} {...props} />
          ),

          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote className={markdownStyles.blockquote} {...props} />
          ),

          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table className={markdownStyles.table} {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className={markdownStyles.tableHead} {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className={markdownStyles.tableHeadCell} {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className={markdownStyles.tableCell} {...props} />
          ),

          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className={markdownStyles.divider} {...props} />
          ),

          // Images
          img: ({ node, ...props }) => (
            <img className={markdownStyles.image} {...props} />
          ),

          // Inline elements
          strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          del: ({ node, ...props }) => <del className="line-through" {...props} />,
        } as Components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
