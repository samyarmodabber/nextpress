import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: NextRequest, { params }: { params: { setName: string } }) {
  const { setName } = params

  // Build directory path like /public/pdf/set1. // public/static/pdf/python
  const dirPath = path.join(process.cwd(), 'public', 'static', 'pdf', setName)

  console.log(dirPath)

  try {
    const files = fs.readdirSync(dirPath)
    const pdfFiles = files.filter((file) => file.endsWith('.pdf'))

    return NextResponse.json({ pdfs: pdfFiles })
  } catch (error) {
    return NextResponse.json({ error: `Could not read PDFs for set "${setName}"` }, { status: 404 })
  }
}
