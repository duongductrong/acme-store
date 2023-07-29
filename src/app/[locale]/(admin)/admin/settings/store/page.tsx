
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
