import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

const MarkdownComponent: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img(props) {
          return (
            <Image
              width={600}
              height={600}
              src={props.src || ''}
              alt={props.alt || props.src || ''}
              layout={'fixed'}
              objectFit={'scale-down'}
              objectPosition={'50% 50%'}
              // objectFit={'cover'}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownComponent;
