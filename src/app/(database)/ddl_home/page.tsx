import NpsarkContextualChat from "@/components/chat/npsark-contextual-chat";

export default function IndexPage() {

  return (
    
    <div className="h-screen dark:bg-slate-800">
    <div className="flex-1">
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-2xl font-bold leading-tight subpixel-antialiased md:text-4xl">
          Design database schema...with plain English.
          <br className="hidden sm:inline" />          
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg subpixel-antialiased">        
        Provide your db requirements and refine it using AI.
        </p>
      </div>
    </section>
    
    <section className="container mx-auto flex items-center justify-center ">  
      <div className="flex w-full items-center justify-center ">
      <div className="flex">
        <div>
          <NpsarkContextualChat mode="table" />
        </div>        
      </div>
      </div>
    </section>
    
    </div>
    </div>
    
  )
}