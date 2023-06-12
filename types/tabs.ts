export interface TabItem {
  name: string
  url: string
}
export interface TabItemProps {
  item: TabItem
  onClick?: () => void
}
export interface TabsProps {
  list: TabItem[]
  onChange: (item: TabItem, idx: number) => void
  className?: string
}
export interface TabContentProps {
  value: TabItem | null
  _ref: any
}
export type TabType = 'logo' | '贴图'

