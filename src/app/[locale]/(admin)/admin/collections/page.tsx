import DynamicLink from "@/components/navigations/dynamic-link"
import SectionView from "@/components/sections/section-view"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ADMIN_URL } from "@/constant/urls"
import { Plus } from "lucide-react"

export interface CollectionListProps {}

const CollectionList = (props: CollectionListProps) => {
  return (
    <SectionView
      title="Collections"
      whereTopRight={
        <>
          <Button asChild>
            <DynamicLink href={ADMIN_URL.COLLECTION.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New collection
            </DynamicLink>
          </Button>
        </>
      }
    >
      <DataTable
        columns={[]}
        data={[]}
        searchPlaceholder="Search collections..."
        searchable
      />
    </SectionView>
  )
}

export default CollectionList
