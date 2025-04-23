import React from 'react';

type QuoteProps = {
  quote: string;
  author?: string;
};

const QuoteDisplay: React.FC<QuoteProps> = ({ quote, author }) => {
  return (
    <div className="mb-6">
      <blockquote className="italic text-lg text-gray-600 mb-2">
        "{quote}"
      </blockquote>
      {author && (
        <cite className="block text-sm text-gray-500 not-italic">— {author}</cite>
      )}
    </div>
  );
};

export default QuoteDisplay;