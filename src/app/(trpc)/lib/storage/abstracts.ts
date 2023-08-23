interface BaseStorageAdapterFolder {
  name: string
  path: string
}

interface BaseStorageAdapterFoldersResult {
  folders: BaseStorageAdapterFolder[]
}

interface BaseStorageAdapterSubfolderOptions {
  max_results?: number
  next_cursor?: string
}

interface BaseStorageAdapterSubfolderResult extends BaseStorageAdapterFoldersResult {}

interface BaseStorageAdapterCreateFolderResult {
  success?: boolean
  path: string
  name: string
}

interface BaseStorageAdapterDeleteFolderResult {
  deleted: string[]
}

abstract class BaseStorageAdapter {
  abstract folders(): Promise<BaseStorageAdapterFoldersResult>

  abstract subfolders(
    folder: string,
    options?: BaseStorageAdapterSubfolderOptions
  ): Promise<BaseStorageAdapterSubfolderResult>

  abstract createFolder(folder: string): Promise<BaseStorageAdapterCreateFolderResult>

  abstract deleteFolder(folder: string): Promise<BaseStorageAdapterDeleteFolderResult>

  abstract ping?(): Promise<boolean>
}
