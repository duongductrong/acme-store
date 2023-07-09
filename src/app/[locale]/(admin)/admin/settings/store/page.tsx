import SSPanel, {
  SSPanelContent,
  SSPanelGroup,
  SSPanelGroupContent,
  SSPanelGroupItem,
  SSPanelGroupLegend,
  SSPanelSidebar,
  SSPanelTitle,
} from "@/components/sections/ss-panel"
import ProductList from "../../products/page"
import Link from "@/components/navigations/link"

export interface SettingStoreProps {}

export interface SettingItem {
  id: string
  title: string
  path?: string
  children?: SettingItem[]
}

const SettingStore = (props: SettingStoreProps) => {
  return <div>store</div>
}

export default SettingStore
