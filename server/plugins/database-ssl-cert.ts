import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CERT_PATH = join(tmpdir(), 'ca-certificate.crt')

export default defineNitroPlugin(() => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const cert = process.env.DATABASE_CA_CERT
  const databaseUrl = process.env.DATABASE_URL
  if (!cert || !databaseUrl) {
    return
  }

  writeFileSync(CERT_PATH, cert)
})
