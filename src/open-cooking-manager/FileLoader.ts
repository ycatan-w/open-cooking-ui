export type FileDescriptor = {
  id: string
  filename: string
}
export class FileLoader {
  static loadSpecs(): FileDescriptor[] {
    const modules = import.meta.glob('../../public/specs/**/*.{yaml,yml,json}', {
      query: '?raw',
    })

    return Object.entries(modules).map(([path, _]) => ({
      id: path.replace('../../public/', '/'),
      filename: path.split('/').pop() ?? path,
    }))
  }
}
