"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrackingResults } from "@/components/tracking-results"

export function TrackingSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const idParam = searchParams.get("id")

  const [consignmentNo, setConsignmentNo] = useState(idParam || "")
  const [isLoading, setIsLoading] = useState(false)
  const [trackingData, setTrackingData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (idParam && !trackingData && !isLoading) {
      handleTrack(idParam)
    }
  }, [idParam])

  const handleTrack = async (trackingId?: string) => {
    const id = trackingId || consignmentNo

    if (!id.trim()) {
      setError("Please enter a consignment number")
      return
    }

    setIsLoading(true)
    setError(null)
    setTrackingData(null)

    try {
      const response = await fetch(`/api/track?consignmentno=${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch tracking data")
      }

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setTrackingData(data)
        if (!trackingId) {
          router.push(`/?id=${id}`, { scroll: false })
        }
      }
    } catch (err) {
      setError("Failed to fetch tracking information. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] p-4 sm:p-8 shadow-2xl shadow-blue-100/50 transition-all hover:shadow-blue-200/50 duration-500">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            type="text"
            placeholder="Enter Consignment Number"
            value={consignmentNo}
            onChange={(e) => setConsignmentNo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            className="flex-1 bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-400 h-12 sm:h-14 text-base sm:text-lg rounded-full px-6 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all shadow-sm hover:shadow-md hover:bg-white"
          />
          <Button
            onClick={() => handleTrack()}
            disabled={isLoading}
            className="bg-slate-900 hover:bg-slate-800 text-white h-12 sm:h-14 px-8 sm:px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-medium text-base sm:text-lg active:translate-y-0 active:shadow-md"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Tracking...
              </span>
            ) : (
              "Track Now"
            )}
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm sm:text-base flex items-center justify-center font-medium animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {trackingData && (
        <div className="mt-8 sm:mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <TrackingResults data={trackingData} />
        </div>
      )}
    </div>
  )
}
