"use client"

import { Card } from "@/components/ui/card"

interface TrackingEvent {
  id: string
  consignmentno: string
  source: string
  dest: string
  status: string
  processdate: string
  transit: string
  branchcontact: string
  remarks: string
}

interface TrackingData {
  statusCode: string
  status: string
  data: TrackingEvent[]
}

export function TrackingResults({ data }: { data: TrackingData }) {
  if (!data.data || data.data.length === 0) {
    return (
      <Card className="p-6 sm:p-8 text-center bg-slate-900/50 border-white/10">
        <p className="text-slate-400 text-sm sm:text-base">No tracking information found.</p>
      </Card>
    )
  }

  const sortedData = [...data.data].sort(
    (a, b) => new Date(b.processdate).getTime() - new Date(a.processdate).getTime(),
  )

  const latestStatus = sortedData[0]
  const consignmentInfo = latestStatus.consignmentno

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-white mb-1 sm:mb-2">Shipment Details</h3>
            <p className="text-slate-400 text-xs sm:text-sm">{consignmentInfo}</p>
          </div>
          <div
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap self-start ${
              latestStatus.status.includes("Dispatched")
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "bg-green-500/10 text-green-400 border border-green-500/20"
            }`}
          >
            {latestStatus.status}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <p className="text-slate-500 text-xs sm:text-sm mb-1">Current Location</p>
            <p className="text-white font-medium text-sm sm:text-base">{latestStatus.source}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs sm:text-sm mb-1">Destination</p>
            <p className="text-white font-medium text-sm sm:text-base">{latestStatus.dest}</p>
          </div>
          {latestStatus.branchcontact && latestStatus.branchcontact.trim() && (
            <div>
              <p className="text-slate-500 text-xs sm:text-sm mb-1">Contact</p>
              <p className="text-white font-medium text-sm sm:text-base">{latestStatus.branchcontact}</p>
            </div>
          )}
          <div>
            <p className="text-slate-500 text-xs sm:text-sm mb-1">Last Update</p>
            <p className="text-white font-medium text-sm sm:text-base">{formatDate(latestStatus.processdate)}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8">
        <h3 className="font-semibold text-lg sm:text-xl text-white mb-4 sm:mb-6">Tracking History</h3>

        <div className="relative space-y-4 sm:space-y-6">
          {/* Timeline line */}
          <div className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-0.5 bg-slate-700" />

          {sortedData.map((event, index) => (
            <div key={event.id} className="relative flex gap-3 sm:gap-4">
              {/* Timeline dot */}
              <div
                className={`relative z-10 flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                  index === 0 ? "bg-blue-500" : "bg-slate-700"
                }`}
              >
                {event.status.includes("Dispatched") ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4 sm:pb-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2">
                    <h4 className="font-medium text-white text-sm sm:text-base">{event.status}</h4>
                    <span className="text-xs text-slate-400 sm:whitespace-nowrap">{formatDate(event.processdate)}</span>
                  </div>

                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="text-slate-300">
                      <span className="text-slate-500">From:</span> {event.source}
                    </p>
                    <p className="text-slate-300">
                      <span className="text-slate-500">To:</span> {event.dest}
                    </p>
                    {event.branchcontact && event.branchcontact.trim() && (
                      <p className="text-slate-300">
                        <span className="text-slate-500">Contact:</span> {event.branchcontact}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}
