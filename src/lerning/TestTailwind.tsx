const TestTailwind = () => {
  return (
    <div className="p-8">
      <div className="bg-blue-500 p-4 text-white">
        <h1 className="text-center text-2xl">Hello Tailwind</h1>
      </div>
      <br />
      <div className="text-blue-500">space-y-1:</div>
      <div className="space-y-1">
        <div className="size-48 bg-slate-900"></div>
        <div className="size-48 bg-slate-900"></div>
        <div className="size-48 bg-slate-900"></div>
      </div>
      <br />
      <div className="text-blue-500">line-clamp-2:</div>
      <div className="line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime,
        saepe sed, eum in velit nostrum dolorum omnis illum aperiam voluptate
        voluptatum odit! Eligendi culpa nesciunt fuga quibusdam, aut vero?
      </div>
      <br />
      <div className="text-blue-500">truncate:</div>
      <div className="truncate">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime,
        saepe sed, eum in velit nostrum dolorum omnis illum aperiam voluptate
        voluptatum odit! Eligendi culpa nesciunt fuga quibusdam, aut vero?
      </div>
      <br />
      <div className="text-blue-500">gradient:</div>
      <div className="h-48 w-full bg-gradient-to-r from-red-500 from-20% via-orange-300 via-70% to-slate-400 to-90%"></div>
      <br />
      <button className="h-12 w-24 bg-blue-500 text-white">Click Me</button>
    </div>
  );
};

export default TestTailwind;
