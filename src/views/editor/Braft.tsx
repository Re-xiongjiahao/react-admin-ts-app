import React, { FC, useState } from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'

type BraftProps = {};

const Braft: FC<BraftProps> = (props) => {
  const [editorState,setEditorState] = useState(BraftEditor.createEditorState(''))

  const handleChange = (editorState:any) => {
    setEditorState(editorState)
  }
  return (
    <div>
          <BraftEditor
            value={editorState}
            onChange={handleChange}
          />
          {editorState.toHTML()}
    </div>
  )
}

export default Braft;