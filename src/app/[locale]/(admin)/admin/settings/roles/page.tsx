"use client"

import Link from "@/components/navigations/link"
import SectionView from "@/components/sections/section-view"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { ADMIN_URL } from "@/constant/urls"
import { Plus } from "lucide-react"

export interface RoleListProps {}

const RoleList = (props: RoleListProps) => {
  return (
    <SectionView
      title="Roles"
      whereTopRight={
        <>
          <Button asChild>
            <Link href={ADMIN_URL.SETTING.ROLE.NEW}>
              <Plus className="w-4 h-4 mr-2" />
              Add role
            </Link>
          </Button>
        </>
      }
    >
      <DataTable
        columns={[]}
        data={[]}
        searchPlaceholder="Search roles..."
        searchable
      />
    </SectionView>
  )
}

export default RoleList
