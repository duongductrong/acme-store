import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  secure: true,
})

export default class CloudinaryAdapter implements BaseStorageAdapter {
  async folders(): Promise<BaseStorageAdapterFoldersResult> {
    const results = await cloudinary.api.root_folders()

    return {
      folders: results?.folders,
    }
  }

  async subfolders(
    folder: string,
    options?: BaseStorageAdapterSubfolderOptions | undefined
  ): Promise<BaseStorageAdapterFoldersResult> {
    const results = await cloudinary.api.sub_folders(folder, { ...options })

    return {
      folders: results?.folders ?? [],
    }
  }

  createFolder(folder: string): Promise<BaseStorageAdapterCreateFolderResult> {
    throw new Error("Method not implemented.")
  }

  deleteFolder(folder: string): Promise<BaseStorageAdapterDeleteFolderResult> {
    throw new Error("Method not implemented.")
  }
}
