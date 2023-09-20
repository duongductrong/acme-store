import { useRouter } from "@/components/router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Command, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDimensions } from "@/hooks/use-dimensions"
import { cn } from "@/lib/utils"
import { LogOut, Parentheses, User } from "lucide-react"
import { HTMLAttributes } from "react"

export interface AdminProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  src: string
  email: string
}

const AdminProfileCard = ({ className, name, email, ...props }: AdminProfileCardProps) => {
  const router = useRouter()
  const { ref, dimensions } = useDimensions<HTMLDivElement>()

  const gap = 16
  const avatarWidth = 40
  const cardWidth = Number(dimensions?.width)
  const maxWidthRightContents = cardWidth - avatarWidth - gap

  const handleLogout = () => {
    router.push("/sign-in")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          {...props}
          ref={ref}
          className={cn("flex items-center gap-base cursor-pointer", className)}
        >
          <Avatar>
            <AvatarFallback>{name?.[0] || "A"}</AvatarFallback>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <div className="flex flex-col">
            <p
              style={{ maxWidth: maxWidthRightContents }}
              className="text-sm font-medium mb-1 text-white"
            >
              {name}
            </p>
            <p
              style={{ maxWidth: maxWidthRightContents }}
              className="text-[13px] font-medium mb-1 text-muted-foreground overflow-x-hidden text-ellipsis whitespace-nowrap"
            >
              {email}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-[calc(250px-32px)] bg-asidebar-background border-muted p-1">
        <Command>
          <CommandItem className="py-2">
            <User className="w-4 h-4 mr-2" />
            Manage profile
          </CommandItem>
          <CommandItem className="py-2">
            <Parentheses className="w-4 h-4 mr-2" />
            API Tokens
          </CommandItem>
          <CommandItem role="button" className="py-2" onSelect={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </CommandItem>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default AdminProfileCard
