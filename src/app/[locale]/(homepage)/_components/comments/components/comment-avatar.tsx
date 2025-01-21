  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function AvatarDemo({ImageSrc} : {ImageSrc?: string}) {
    return (
      <Avatar className="w-full h-full relative">
        <AvatarImage src={ImageSrc} alt="comment avatar" className="w-full object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  