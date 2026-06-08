import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const CERT_PATH = join(tmpdir(), 'database-ca.pem')

// In production the database CA certificate is provided via the `DATABASE_CA_CERT`
// env var (its content can't be referenced by path directly). We write it to disk
// once on startup and point `DATABASE_URL` at it: `pg`'s connection-string parsing
// reads `sslrootcert`/`sslmode` and overrides whatever `ssl` option the adapter was
// constructed with, so this is enough to enable a verified SSL connection.
export default defineNitroPlugin(() => {
console.log('server plugin', process.env.NODE_ENV)
console.log('DB cert path', CERT_PATH)
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const cert = process.env.DATABASE_CA_CERT
  const databaseUrl = process.env.DATABASE_URL
  if (!cert || !databaseUrl) {
    return
  }

  writeFileSync(CERT_PATH, cert)

console.log('writeFileSync')
})
