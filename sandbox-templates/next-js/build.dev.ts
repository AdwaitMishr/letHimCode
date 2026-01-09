// build.ts
import { Template, defaultBuildLogger } from 'e2b'
import { template as nextJSTemplate } from './template'

Template.build(nextJSTemplate, {
  alias: 'lethimcode-nextjs',
  cpuCount: 4,
  memoryMB: 4096,
  onBuildLogs: defaultBuildLogger(),
})