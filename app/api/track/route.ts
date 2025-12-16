import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const consignmentno = searchParams.get("consignmentno")

  if (!consignmentno) {
    return NextResponse.json({ error: "Consignment number is required" }, { status: 400 })
  }

  try {
    // Fetch from the delivery partner's API
    const response = await fetch(
      `https://erp.gokulamspeedandsafe.com/online/getconsignmentstatus?consignmentno=${consignmentno}`,
      {
        headers: {
          Accept: "application/xml, text/xml",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch tracking data")
    }

    const xmlText = await response.text()

    // Parse XML to JSON
    const jsonData = parseXMLToJSON(xmlText)

    return NextResponse.json(jsonData)
  } catch (error) {
    console.error("Tracking API Error:", error)
    return NextResponse.json({ error: "Failed to retrieve tracking information" }, { status: 500 })
  }
}

function parseXMLToJSON(xml: string) {
  // Simple XML to JSON parser for the specific structure
  const dataResponse: any = {
    statusCode: "",
    status: "",
    data: [],
  }

  // Extract status code
  const statusCodeMatch = xml.match(/<statusCode>(.*?)<\/statusCode>/)
  if (statusCodeMatch) dataResponse.statusCode = statusCodeMatch[1]

  // Extract status
  const statusMatch = xml.match(/<status>(.*?)<\/status>/)
  if (statusMatch) dataResponse.status = statusMatch[1]

  // Extract all data entries
  const dataMatches = xml.matchAll(/<data>(.*?)<\/data>/gs)

  for (const match of dataMatches) {
    const dataBlock = match[1]

    const entry: any = {}

    // Extract fields
    const idMatch = dataBlock.match(/<id>(.*?)<\/id>/)
    if (idMatch) entry.id = idMatch[1]

    const consignmentMatch = dataBlock.match(/<consignmentno>(.*?)<\/consignmentno>/)
    if (consignmentMatch) entry.consignmentno = consignmentMatch[1]

    const sourceMatch = dataBlock.match(/<source>(.*?)<\/source>/)
    if (sourceMatch) entry.source = sourceMatch[1]

    const destMatch = dataBlock.match(/<dest>(.*?)<\/dest>/)
    if (destMatch) entry.dest = destMatch[1]

    const destIdMatch = dataBlock.match(/<destinationid>(.*?)<\/destinationid>/)
    if (destIdMatch) entry.destinationid = destIdMatch[1]

    const transitMatch = dataBlock.match(/<transit>(.*?)<\/transit>/)
    if (transitMatch) entry.transit = transitMatch[1]

    const dateMatch = dataBlock.match(/<processdate>(.*?)<\/processdate>/)
    if (dateMatch) entry.processdate = dateMatch[1]

    const destBranchMatch = dataBlock.match(/<destbranchid>(.*?)<\/destbranchid>/)
    if (destBranchMatch) entry.destbranchid = destBranchMatch[1]

    const statusMatch = dataBlock.match(/<status>(.*?)<\/status>/)
    if (statusMatch) entry.status = statusMatch[1]

    const remarksMatch = dataBlock.match(/<remarks>(.*?)<\/remarks>/)
    if (remarksMatch) entry.remarks = remarksMatch[1]

    const contactMatch = dataBlock.match(/<branchcontact>(.*?)<\/branchcontact>/)
    if (contactMatch) entry.branchcontact = contactMatch[1]

    dataResponse.data.push(entry)
  }

  return dataResponse
}
