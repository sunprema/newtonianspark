//import { Tldraw } from '@tldraw/tldraw'
//import '@tldraw/tldraw/tldraw.css'
import { memo } from 'react'

const TLDrawNode = ({data,id}:{id:string, data:any}) =>  {
	return (
		<div className='border-1 h-[450px] w-[450px] border border-green-500'>
			
            <div className='nodrag inset-0 fixed'>
            <h1>Not implemented</h1>
            </div>
            
		</div>
	)
}

export default memo(TLDrawNode)