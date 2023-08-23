/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LexicalEditor } from "lexical"
import { Image } from "lucide-react"
import { ReactNode } from "react"
import { useForm, useWatch } from "react-hook-form"
import Form, { FormField } from "../../form"
import { Input } from "../../input"
import { INSERT_IMAGE_COMMAND } from "../plugins/image-plugin"

export interface LexicalToolbarSpecializedImageNodeProps {
  children?: ReactNode
  editor: LexicalEditor
}

const LexicalToolbarSpecializedImageNode = ({
  children,
  editor,
}: LexicalToolbarSpecializedImageNodeProps) => {
  const methods = useForm()

  const handleUploadImage = () => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: "https://cdn.hashnode.com/res/hashnode/image/upload/v1679453128498/50d52599-0513-46e5-8b87-62d02445710b.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp",
      altText: "123",
      height: 300,
      width: 500,
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Image className="w-4 h-4 cursor-pointer" />
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Tabs>
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="embed-link">Embed link</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Input type="file" placeholder="Past your image link..." />
            <Button
              variant="secondary"
              size="sm"
              className="w-full mt-4"
              onClick={handleUploadImage}
            >
              Upload file
            </Button>
          </TabsContent>
          <EmbedImageFieldContent tabsValue="embed-link" editor={editor} />
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

export const EmbedImageFieldContent = ({
  tabsValue,
  editor,
}: {
  editor: LexicalEditor
  tabsValue: string
}) => {
  const methods = useForm({ defaultValues: { embedLink: "", alt: "", width: 500, height: 300 } })

  const embedLink = useWatch({ control: methods.control, name: "embedLink" })
  const width = useWatch({ control: methods.control, name: "width" })
  const height = useWatch({ control: methods.control, name: "height" })
  const alt = useWatch({ control: methods.control, name: "embedLink" })

  const handleEmbedImageLink = () => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: embedLink,
      altText: alt,
      height: height,
      width: width,
    })
  }

  return (
    <Form {...methods}>
      <TabsContent value={tabsValue} className="grid grid-cols-2 gap-base">
        <FormField
          wrapperClassName="col-span-2"
          variant="TEXT"
          name="embedLink"
          placeholder="Past your image link..."
        />
        <FormField wrapperClassName="col-span-2" variant="TEXT" name="alt" placeholder="Alt" />
        <FormField variant="TEXT" name="height" placeholder="Width..." />
        <FormField variant="TEXT" name="width" placeholder="Height..." />
        <Button
          variant="secondary"
          size="sm"
          className="w-full mt-4"
          onClick={handleEmbedImageLink}
        >
          Embed image
        </Button>
      </TabsContent>
    </Form>
  )
}

export default LexicalToolbarSpecializedImageNode
