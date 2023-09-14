import { Youtube, LineChart, Image as Img, FunctionSquare, Plus, Database, Text } from "lucide-react"
import { Card,CardContent } from "./ui/card";

const SideToolbar = () => {
    const onDragStart = (event:React.DragEvent, nodeType:string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="h-screen w-[80px] absolute left-0 top-0  bg-white dark:bg-slate-500">
            
            <div className="my-8 text-center">
                <h6 className="text-sm font-bold">Tools</h6>
            </div>

            <div className="flex flex-col justify-center items-center mx-auto space-y-4 hover:cursor-grab active:cursor-grabbing">
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

            <div>
                <Youtube color="#F97316" size={32}/>
                <h6 className="scroll-m-20 text-xs font-bold tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Video</h6>
            </div>
            
            </div>
            

            </div>

        

    )

}
export default SideToolbar