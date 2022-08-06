import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown'
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

type MdProps = {};

const Md: FC<MdProps> = (props) => {
  const handleEditorChange = ( { html, text }: { html: any; text: any}) => {
    console.log('handleEditorChange', html, text);
  }
  return (
    <div>
      markDown编辑器
      <MdEditor style={{ height: '500px' }} renderHTML={text => {
        return <ReactMarkdown>{ text }</ReactMarkdown>
      }} onChange={handleEditorChange} />
    </div>
  )
}

export default Md;