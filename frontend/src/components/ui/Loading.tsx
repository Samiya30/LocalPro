import { LoaderCircle } from "lucide-react";

interface LoadingProps {
  text?: string;
}

function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <LoaderCircle className="h-5 w-5 animate-spin text-blue-600" />
        {text}
      </div>
    </div>
  );
}

export default Loading;