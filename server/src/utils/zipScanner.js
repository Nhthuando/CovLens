import unzipper from 'unzipper'
import path from 'path'

const LIMITS = {
    MAX_FILES: 1000,
    MAX_TOTAL_UNCOMPRESSED: 200 * 1024 * 1024,
    MAX_ENTRY_UNCOMPRESSED: 100 * 1024 * 1024,
    MAX_COMPRESSION_RATIO: 100,
    MAX_NESTING_DEPTH: 3,
    MAX_FILENAME_LENGTH: 1024,
}

class ZipValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ZipValidationError'
    }
}

export const scanZip = async (buffer) => {
    try {
        const zip = await unzipper.Open.buffer(buffer)

        let totalSize = 0
        let fileCount = 0

        for (const entry of zip.files) {
            if (entry.type === 'Directory') continue

            fileCount++
            if (fileCount > LIMITS.MAX_FILES)
                throw new ZipValidationError('Quá nhiều file trong ZIP')

            const normalized = path.normalize(entry.path)
            const segments = normalized.split(/[\\/]/).filter(Boolean)

            if (segments.some(seg => seg === '..'))
                throw new ZipValidationError('Phát hiện path traversal attack')
            if (path.isAbsolute(normalized))
                throw new ZipValidationError('Absolute path không được phép')

            if (entry.path.length > LIMITS.MAX_FILENAME_LENGTH)
                throw new ZipValidationError('Tên file quá dài')

            const depth = segments.length - 1
            if (depth > LIMITS.MAX_NESTING_DEPTH)
                throw new ZipValidationError('Cấu trúc folder lồng quá sâu')

            if (entry.uncompressedSize === undefined)
                throw new ZipValidationError('File ZIP không hợp lệ, thiếu metadata')

            totalSize += entry.uncompressedSize

            if (entry.uncompressedSize > LIMITS.MAX_ENTRY_UNCOMPRESSED)
                throw new ZipValidationError('Có file quá lớn bên trong ZIP')

            if (totalSize > LIMITS.MAX_TOTAL_UNCOMPRESSED)
                throw new ZipValidationError('ZIP quá lớn sau khi giải nén')

            if (entry.compressedSize > 0) {
                const ratio = entry.uncompressedSize / entry.compressedSize
                if (ratio > LIMITS.MAX_COMPRESSION_RATIO)
                    throw new ZipValidationError('Tỉ lệ nén bất thường, có thể là zip bomb')
            }
        }

        return { ok: true }

    } catch (err) {
        if (err instanceof ZipValidationError)
            return { ok: false, reason: err.message }
        return { ok: false, reason: 'ZIP corrupted hoặc không hợp lệ' }
    }
}