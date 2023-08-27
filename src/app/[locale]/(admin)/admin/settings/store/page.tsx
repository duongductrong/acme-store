import SectionView from "@/components/sections/section-view"
import { ADMIN_URL } from "@/constant/urls"
import { DollarSign, Info, Lock } from "lucide-react"
import ConfigurationCard, { ConfigurationCardProps } from "./components/configuration-card"

export interface SettingStoreProps {}

export interface SettingItem {
  id: string
  title: string
  path?: string
  children?: SettingItem[]
}

const settings = [
  {
    icon: Info,
    name: "General",
    description: "In the General Settings, you can control the title, tagline, language, and more.",
    to: undefined,
  },
  {
    icon: Lock,
    name: "Role & Permissions",
    description: "In the Role & Permissions, you can control privileges of accounts in system.",
    to: ADMIN_URL.SETTING.ROLE.LIST,
  },
  {
    icon: DollarSign,
    name: "Taxes",
    description: "In the Taxes, you can control product taxes for checkout.",
    to: ADMIN_URL.SETTING.ROLE.LIST,
  },
] as ConfigurationCardProps[]

const SettingStore = (props: SettingStoreProps) => {
  return (
    <div className="max-w-[940px] mx-auto">
      <SectionView
        title="Configuration"
        description="Lets setup your setting"
        customClassNames={{
          paperContentClassName: "bg-transparent border-0 p-0 grid grid-cols-2 gap-base",
        }}
      >
        {settings.map((setting, index) => (
          <ConfigurationCard
            icon={setting.icon}
            name={setting.name}
            description={setting.description}
            key={`configurationCard-${index}`}
            to={setting?.to}
          />
        ))}
      </SectionView>
    </div>
  )
}

export default SettingStore
