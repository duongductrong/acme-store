import prisma from "@/lib/prisma"

class SettingService {
  setting() {
    return prisma.setting.findFirst()
  }
}

const settingService = new SettingService()

export default settingService
