import { Youtube, Image as Img,Text, Paintbrush, Gem, Table, Code } from "lucide-react"
import { Card,CardContent } from "./ui/card";

const SideToolbar = () => {
    const onDragStart = (event:React.DragEvent, nodeType:string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-full ">
            
            <div className="my-8 text-center">
                <h6 className="text-sm font-bold">Tools</h6>
            </div>

            <div className="mx-auto flex flex-col items-center justify-center space-y-4 hover:cursor-grab active:cursor-grabbing">
            <Card draggable  
                className="group 
                rounded-none border-none 
                shadow-none dark:bg-inherit" onDragStart={(event) => onDragStart(event, 'youtube')}>
            <CardContent className="flex items-center justify-between gap-4 align-middle">
            <div>
                <Youtube color="#F97316" size={32}/>
                <h6 className="scroll-m-20 text-xs font-light tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Video</h6>
            </div>
            </CardContent>
            </Card>

            <Card draggable  
                className="group 
                rounded-none border-none 
                shadow-none dark:bg-inherit" onDragStart={(event) => onDragStart(event, 'text_heading')}>
            <CardContent className="flex items-center justify-between gap-4 align-middle">
            <div>
                <Text color="#F97316" size={32} />
                <h6 className="scroll-m-20 text-xs font-light tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Text</h6>
            </div>
            </CardContent>
            </Card>
            

            <Card draggable  
                className="group 
                rounded-none border-none 
                shadow-none dark:bg-inherit" onDragStart={(event) => onDragStart(event, 'image')}>
            <CardContent className="flex items-center justify-between gap-4 align-middle">
            <div>
                <Img color="#F97316" size={32}/>    
                <h6 className="scroll-m-20 text-xs font-light tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Image</h6>
            </div>
            </CardContent>
            </Card>

            

            <Card draggable  
                className="group 
                rounded-none border-none 
                shadow-none dark:bg-inherit" onDragStart={(event) => onDragStart(event, 'linkCard')}>
            <CardContent className="flex items-center justify-between gap-4 align-middle">
            <div>
                <Gem color="#F97316" size={32}/>    
                <h6 className="scroll-m-20 text-xs font-light tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Link</h6>
            </div>
            </CardContent>
            </Card>

            <Card draggable  
                className="group 
                rounded-none border-none 
                shadow-none dark:bg-inherit" onDragStart={(event) => onDragStart(event, 'table')}>
            <CardContent className="flex items-center justify-between gap-4 align-middle">
            <div>
                <Table color="#F97316" size={32}/>    
                <h6 className="scroll-m-20 text-xs font-light tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Table</h6>
            </div>
            </CardContent>
            </Card>

            

            </div>
            </div>

        

    )

}
export default SideToolbar