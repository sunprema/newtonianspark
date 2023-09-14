'use client'

import { useEditor, EditorContent, EditorProvider, useCurrentEditor } from '@tiptap/react'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import { Button } from './ui/button'


const MenuBar = () => {
  const {editor} = useCurrentEditor()
  if (!editor){
    return null
  }

  return (
    <div className='flex flex-row gap-0 space-x-0 rounded-none p-2'>
      <Button variant={'ghost'} >Bold</Button>
      <Button variant={'ghost'}>Italic</Button>
      <Button variant={'ghost'}>Summarize</Button>
    </div>
  )
}
 const content = '<p>This is great!</p>'

 const extensions = [
  StarterKit,
  TextStyle,
 ]

const Tiptap = () => {
  return (
    <div className='container mx-auto p-10'>
    <EditorProvider slotBefore={<MenuBar />}  extensions={extensions} content={content} />
    </div>
  )
}

export default Tiptap