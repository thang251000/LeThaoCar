import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  Calculator,
  ExternalLink,
  LoaderCircle,
  MapPinned,
  Milestone,
  PhoneCall,
} from 'lucide-react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { siteConfig } from '../../data/siteContent'
import {
  addressLookupAvailable,
  fetchRouteDistance,
  getLookupErrorKind,
} from '../../lib/serpApi'
import type { Locale, PricingContent } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import {
  AddressAutocompleteInput,
  type AddressAutocompleteSelection,
} from '../ui/AddressAutocompleteInput'
import { ActionButton } from '../ui/ActionButton'

const pricingCopy = {
  vi: {
    baseLocationHint:
      'Xe hiện đậu tại Ấp Trầu, Phước Thiền, Nhơn Trạch, Đồng Nai. Đây chỉ là thông tin tham chiếu, bạn vẫn cần nhập đúng điểm đón thực tế của khách.',
    baseLocationLabel: 'Xe đậu tại',
    calculatorBadge: 'Tính nhanh',
    calculatorDescription:
      'Nhập hai điểm để hệ thống tự tính quãng đường và cập nhật giá ngay.',
    mapLabel: 'Bản đồ tuyến đi',
    mapOpen: 'Mở Google Maps',
    mapReady: 'Tuyến sẽ hiện theo điểm đón và điểm đến bạn chọn.',
    mapWaiting: 'Chọn đủ hai điểm để xem tuyến đi trực tiếp.',
    currentDistance: 'Quãng đường ước tính',
    destinationHint:
      'Nhập điểm đến. Bạn có thể chọn gợi ý địa chỉ hoặc gõ tay nếu cần.',
    destinationLabel: 'Điểm đến',
    destinationPlaceholder: 'Ví dụ: Sân bay Tân Sơn Nhất, Gò Vấp',
    distanceInputLabel: 'Nhập số km',
    distanceRangeLabel: 'Kéo thanh để chỉnh nhanh',
    estimateCta: 'Gọi chốt chuyến',
    estimateLabel: 'Tạm tính chuyến đi',
    estimatorHint:
      'Giá tạm tính chưa gồm thời gian chờ, phí cầu đường, bãi xe hoặc lộ trình có thêm nhiều điểm dừng.',
    kmUnit: 'km',
    lookupDisabled:
      'Thêm `SERPAPI_API_KEY` ở server để bật gợi ý địa chỉ và tự tính quãng đường.',
    lookupMaintenance:
      'Tính năng gợi ý địa chỉ và tính quãng đường tự động hiện đang bảo trì. Bạn vẫn có thể nhập tay số km để ước lượng nhanh.',
    lookupMaintenanceTitle: 'Hiện đang bảo trì',
    lookupManualAvailable: 'Chế độ nhập tay vẫn hoạt động bình thường ở bên dưới.',
    manualMode:
      'Bạn vẫn có thể nhập tay số km hoặc kéo thanh để ước lượng nhanh.',
    perKmHint:
      'Giá được tính trực tiếp theo quãng đường nhân với đơn giá mỗi kilomet.',
    perKmRate: 'Đơn giá mỗi km',
    pickupHint:
      'Nhập đúng điểm đón của khách. Khi chọn gợi ý, hệ thống sẽ tự lấy đường đi chuẩn hơn.',
    pickupLabel: 'Điểm đón',
    pickupPlaceholder: 'Ví dụ: Thảo Điền, Quận 2',
    rateHint: 'Bạn có thể chỉnh đơn giá/km ngay tại đây để báo giá nhanh hơn.',
    routeAction: 'Tính lại quãng đường',
    routeCalculatedPrefix: 'Quãng đường đã tính',
    routeError:
      'Chưa lấy được quãng đường tự động. Bạn vẫn có thể nhập tay hoặc kéo thanh km.',
    routeLive: 'Đang dùng quãng đường tự động',
    routeLoading: 'Đang tính quãng đường...',
    routeManual: 'Đang chỉnh tay',
    routeMissingFields: 'Nhập cả điểm đón và điểm đến để tính quãng đường.',
    total: 'Tổng tạm tính',
  },
  en: {
    baseLocationHint:
      'The vehicle is currently based in Ap Trau, Phuoc Thien, Nhon Trach, Dong Nai. This is only a reference note, and you should still enter the real pickup point below.',
    baseLocationLabel: 'Vehicle based in',
    calculatorBadge: 'Quick estimator',
    calculatorDescription:
      'Enter both points and the route plus estimated fare update automatically.',
    mapLabel: 'Route map',
    mapOpen: 'Open Google Maps',
    mapReady: 'The map updates to match the pickup and destination you choose.',
    mapWaiting: 'Pick both points to preview the route live.',
    currentDistance: 'Estimated distance',
    destinationHint:
      'Enter the destination. You can choose an address suggestion or type manually.',
    destinationLabel: 'Destination',
    destinationPlaceholder: 'Example: Tan Son Nhat Airport, Go Vap',
    distanceInputLabel: 'Enter kilometers',
    distanceRangeLabel: 'Drag to adjust quickly',
    estimateCta: 'Call to confirm this trip',
    estimateLabel: 'Trip estimate',
    estimatorHint:
      'This estimate does not include long waiting time, tolls, parking, or unusual multi-stop requests.',
    kmUnit: 'km',
    lookupDisabled:
      'Add `SERPAPI_API_KEY` on the server to enable address suggestions and automatic distance lookup.',
    lookupMaintenance:
      'Address suggestions and automatic route distance are temporarily under maintenance. You can still enter kilometers manually for a quick estimate.',
    lookupMaintenanceTitle: 'Currently under maintenance',
    lookupManualAvailable: 'Manual distance entry still works below.',
    manualMode:
      'Manual mode still works, so you can type kilometers or drag the slider.',
    perKmHint:
      'Price is calculated directly as kilometers multiplied by the rate per kilometer.',
    perKmRate: 'Rate per km',
    pickupHint:
      'Enter the real pickup point. Choosing a suggestion helps the route match more precisely.',
    pickupLabel: 'Pickup',
    pickupPlaceholder: 'Example: Thao Dien, District 2',
    rateHint: 'Adjust the rate per kilometer here for a faster quote.',
    routeAction: 'Recalculate route',
    routeCalculatedPrefix: 'Estimated route distance',
    routeError:
      'Automatic route distance is unavailable right now. You can still type the kilometers or use the slider.',
    routeLive: 'Using automatic route distance',
    routeLoading: 'Calculating route...',
    routeManual: 'Adjusted manually',
    routeMissingFields: 'Enter both pickup and destination to calculate the route.',
    total: 'Estimated total',
  },
} as const

type PricingSectionProps = {
  content: PricingContent
  locale: Locale
}

type RouteState =
  | {
      kind: 'idle'
      message: string
    }
  | {
      kind: 'loading'
      message: string
    }
  | {
      kind: 'success'
      message: string
    }
  | {
      kind: 'error'
      message: string
    }

type TutorialRect = {
  height: number
  left: number
  top: number
  width: number
}

type TutorialRects = {
  destination: TutorialRect | null
  pickup: TutorialRect | null
  routeButton: TutorialRect | null
}

type LookupStatus = 'ready' | 'maintenance' | 'unconfigured'

function clampCurrency(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return 0
  }

  return Math.round(value)
}

function clampDistance(value: number) {
  if (!Number.isFinite(value) || value < 1) {
    return 1
  }

  return Math.round(value * 10) / 10
}

function formatDistanceInputValue(value: number) {
  if (!Number.isFinite(value)) {
    return ''
  }

  return Number.isInteger(value) ? String(value) : String(value)
}

function parseDistanceInput(value: string) {
  const normalizedValue = value.trim().replace(',', '.')

  if (!normalizedValue) {
    return null
  }

  const parsedValue = Number(normalizedValue)

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return null
  }

  return parsedValue
}

function parseCurrencyInput(value: string) {
  const digits = value.replace(/[^\d]/g, '')
  return clampCurrency(digits ? Number(digits) : 0)
}

function getRouteMessageClass(kind: RouteState['kind']) {
  if (kind === 'success') {
    return 'border-[rgba(183,148,85,0.3)] bg-[var(--accent-soft)] text-[var(--accent)]'
  }

  if (kind === 'error') {
    return 'border-[rgba(173,76,62,0.16)] bg-[rgba(173,76,62,0.12)] text-[#ad4c3e] dark:text-[#f3b8aa]'
  }

  return 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]'
}

function getRelativeRect(
  element: HTMLElement | null,
  container: HTMLElement | null,
): TutorialRect | null {
  if (!element || !container) {
    return null
  }

  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  return {
    height: elementRect.height,
    left: elementRect.left - containerRect.left,
    top: elementRect.top - containerRect.top,
    width: elementRect.width,
  }
}

function buildGoogleMapsEmbedUrl(pickup: string, destination: string) {
  const trimmedPickup = pickup.trim()
  const trimmedDestination = destination.trim()

  if (trimmedPickup && trimmedDestination) {
    return `https://www.google.com/maps?output=embed&f=d&source=s_d&saddr=${encodeURIComponent(
      trimmedPickup,
    )}&daddr=${encodeURIComponent(trimmedDestination)}&z=11`
  }

  const fallbackQuery =
    trimmedPickup || trimmedDestination || siteConfig.contact.originRouteQuery

  return `https://www.google.com/maps?q=${encodeURIComponent(
    fallbackQuery,
  )}&z=11&output=embed`
}

function buildGoogleMapsLink(pickup: string, destination: string) {
  const trimmedPickup = pickup.trim()
  const trimmedDestination = destination.trim()

  if (trimmedPickup && trimmedDestination) {
    const url = new URL('https://www.google.com/maps/dir/')
    url.searchParams.set('api', '1')
    url.searchParams.set('origin', trimmedPickup)
    url.searchParams.set('destination', trimmedDestination)
    url.searchParams.set('travelmode', 'driving')
    return url.toString()
  }

  const fallbackQuery =
    trimmedPickup || trimmedDestination || siteConfig.contact.originRouteQuery

  const url = new URL('https://www.google.com/maps/search/')
  url.searchParams.set('api', '1')
  url.searchParams.set('query', fallbackQuery)
  return url.toString()
}

function getSelectionSignature(selection: AddressAutocompleteSelection | null) {
  if (!selection) {
    return ''
  }

  if (selection.dataId) {
    return selection.dataId
  }

  if (selection.location) {
    return `${selection.location.lat},${selection.location.lng}`
  }

  return selection.address.trim()
}

function buildRouteKey(
  pickup: string,
  destination: string,
  pickupSelection: AddressAutocompleteSelection | null,
  destinationSelection: AddressAutocompleteSelection | null,
  locale: Locale,
) {
  const trimmedPickup = pickup.trim()
  const trimmedDestination = destination.trim()

  if (!trimmedPickup || !trimmedDestination) {
    return ''
  }

  return [
    locale,
    trimmedPickup,
    getSelectionSignature(pickupSelection),
    trimmedDestination,
    getSelectionSignature(destinationSelection),
  ].join('|')
}

export function PricingSection({ content, locale }: PricingSectionProps) {
  const copy = pricingCopy[locale]
  const sectionCardRef = useRef<HTMLDivElement | null>(null)
  const tutorialBubbleRef = useRef<HTMLDivElement | null>(null)
  const pickupFieldRef = useRef<HTMLDivElement | null>(null)
  const destinationFieldRef = useRef<HTMLDivElement | null>(null)
  const routeButtonRef = useRef<HTMLDivElement | null>(null)
  const tutorialShownRef = useRef(false)
  const [pickup, setPickup] = useState('')
  const [pickupSelection, setPickupSelection] =
    useState<AddressAutocompleteSelection | null>(null)
  const [destination, setDestination] = useState('')
  const [destinationSelection, setDestinationSelection] =
    useState<AddressAutocompleteSelection | null>(null)
  const [distanceKm, setDistanceKm] = useState<number>(18)
  const [distanceInputValue, setDistanceInputValue] = useState(() =>
    formatDistanceInputValue(18),
  )
  const [perKmRate, setPerKmRate] = useState<number>(14_000)
  const [distanceMode, setDistanceMode] = useState<'manual' | 'route'>('manual')
  const [showRateEditor, setShowRateEditor] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)
  const [tutorialBubbleHeight, setTutorialBubbleHeight] = useState(0)
  const [tutorialRects, setTutorialRects] = useState<TutorialRects>({
    destination: null,
    pickup: null,
    routeButton: null,
  })
  const [routeState, setRouteState] = useState<RouteState>({
    kind: 'idle',
    message: copy.manualMode,
  })
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>('ready')
  const autoRouteTimerRef = useRef<number | undefined>(undefined)
  const lastResolvedRouteKeyRef = useRef('')
  const routeRequestIdRef = useRef(0)

  function getLookupStatusMessage(status: LookupStatus) {
    if (status === 'maintenance') {
      return copy.lookupMaintenance
    }

    if (status === 'unconfigured') {
      return copy.lookupDisabled
    }

    return copy.manualMode
  }

  const lookupAutoEnabled = addressLookupAvailable && lookupStatus === 'ready'

  useEffect(() => {
    setRouteState({
      kind: lookupStatus === 'ready' ? 'idle' : 'error',
      message: getLookupStatusMessage(lookupStatus),
    })
  }, [copy.lookupDisabled, copy.lookupMaintenance, copy.manualMode, lookupStatus])

  useEffect(() => {
    return () => {
      if (autoRouteTimerRef.current) {
        window.clearTimeout(autoRouteTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setDistanceInputValue(formatDistanceInputValue(distanceKm))
  }, [distanceKm])

  useEffect(() => {
    if (lookupStatus !== 'ready') {
      setShowTutorial(false)
    }
  }, [lookupStatus])

  useEffect(() => {
    const sectionNode = sectionCardRef.current

    if (!sectionNode) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries

        if (!entry?.isIntersecting || tutorialShownRef.current || !lookupAutoEnabled) {
          return
        }

        tutorialShownRef.current = true
        setTutorialStep(0)
        setShowTutorial(true)
      },
      {
        threshold: 0.35,
      },
    )

    observer.observe(sectionNode)

    return () => {
      observer.disconnect()
    }
  }, [lookupAutoEnabled])

  const handleLookupFailure = useEffectEvent((error: unknown) => {
    const errorKind = getLookupErrorKind(error)

    if (errorKind === 'maintenance') {
      setLookupStatus('maintenance')
      return 'maintenance' as const
    }

    if (errorKind === 'unconfigured') {
      setLookupStatus('unconfigured')
      return 'unconfigured' as const
    }

    return 'generic' as const
  })

  const estimateTotal = clampCurrency(distanceKm * perKmRate)
  const sliderMax = Math.max(160, Math.ceil(distanceKm / 20) * 20)
  const hasRouteEndpoints = pickup.trim().length > 0 && destination.trim().length > 0
  const mapEmbedUrl = buildGoogleMapsEmbedUrl(pickup, destination)
  const mapLink = buildGoogleMapsLink(pickup, destination)
  const mapStatusMessage = !hasRouteEndpoints
    ? copy.mapWaiting
    : routeState.kind === 'idle'
      ? copy.mapReady
      : routeState.message
  const currencyFormatter = new Intl.NumberFormat(
    locale === 'vi' ? 'vi-VN' : 'en-US',
    {
      currency: 'VND',
      maximumFractionDigits: 0,
      style: 'currency',
    },
  )

  const distanceFormatter = new Intl.NumberFormat(
    locale === 'vi' ? 'vi-VN' : 'en-US',
    {
      maximumFractionDigits: distanceKm % 1 === 0 ? 0 : 1,
      minimumFractionDigits: distanceKm % 1 === 0 ? 0 : 1,
    },
  )
  const compactIntroTitle =
    locale === 'vi'
      ? 'Nh\u1eadp \u0111i\u1ec3m \u0111\u00f3n, \u0111i\u1ec3m \u0111\u1ebfn v\u00e0 xem gi\u00e1 nhanh.'
      : 'Enter pickup, destination, and get a quick quote.'
  const tutorialPickupText =
    locale === 'vi'
      ? 'B\u01b0\u1edbc 1: Nh\u1eadp \u0111i\u1ec3m \u0111\u00f3n'
      : 'Step 1: Enter pickup'
  const tutorialDestinationText =
    locale === 'vi'
      ? 'B\u01b0\u1edbc 2: Nh\u1eadp \u0111i\u1ec3m \u0111\u1ebfn'
      : 'Step 2: Enter destination'
  const tutorialRouteText =
    locale === 'vi'
      ? 'B\u01b0\u1edbc 3: Nh\u1ea5n "T\u00ednh l\u1ea1i qu\u00e3ng \u0111\u01b0\u1eddng" \u0111\u1ec3 gi\u00e1 hi\u1ec7n \u1edf khung ph\u00eda tr\u00ean. Xem chi ti\u1ebft qu\u00e3ng \u0111\u01b0\u1eddng \u1edf b\u1ea3n \u0111\u1ed3 b\u00ean ph\u1ea3i.'
      : 'Step 3: Tap "Recalculate route" to show the fare in the summary above. See route details on the map to the right.'
  const tutorialTapHint =
    locale === 'vi'
      ? 'Nh\u1ea5n b\u1ea5t k\u1ef3 \u0111\u00e2u \u0111\u1ec3 ti\u1ebfp t\u1ee5c'
      : 'Tap anywhere to continue'
  const tutorialCardClassName =
    'rounded-[1rem] border border-[rgba(224,197,139,0.3)] bg-[#0f1722] px-4 py-3 text-white shadow-[0_22px_50px_rgba(0,0,0,0.34)]'
  const activeTutorialTarget =
    tutorialStep === 0
      ? 'pickup'
      : tutorialStep === 1
        ? 'destination'
        : 'routeButton'
  const activeTutorialRect = tutorialRects[activeTutorialTarget]
  const activeTutorialText =
    tutorialStep === 0
      ? tutorialPickupText
      : tutorialStep === 1
        ? tutorialDestinationText
        : tutorialRouteText
  const tutorialContainerWidth = sectionCardRef.current?.clientWidth ?? 0
  const tutorialContainerHeight = sectionCardRef.current?.clientHeight ?? 0
  const isCompactTutorialLayout = tutorialContainerWidth < 640
  const measuredTutorialBubbleHeight =
    tutorialBubbleHeight || (tutorialStep === 2 ? 172 : 104)
  const tutorialCardWidth =
    tutorialStep === 2
      ? isCompactTutorialLayout
        ? Math.min(Math.max(tutorialContainerWidth - 24, 264), 304)
        : 320
      : activeTutorialRect
        ? Math.min(Math.max(activeTutorialRect.width - 48, 320), 520)
        : 380
  const tutorialBubblePosition = activeTutorialRect
    ? tutorialStep === 2
      ? isCompactTutorialLayout
        ? {
            left: Math.max(
              Math.min(
                activeTutorialRect.left +
                  activeTutorialRect.width / 2 -
                  tutorialCardWidth / 2,
                tutorialContainerWidth - tutorialCardWidth - 12,
              ),
              12,
            ),
            top:
              activeTutorialRect.top - measuredTutorialBubbleHeight - 20 >= 12
                ? activeTutorialRect.top - measuredTutorialBubbleHeight - 20
                : Math.max(
                    Math.min(
                      activeTutorialRect.top + activeTutorialRect.height + 20,
                      tutorialContainerHeight -
                        measuredTutorialBubbleHeight -
                        12,
                    ),
                    12,
                  ),
          }
        : {
            left: Math.max(
              Math.min(
                activeTutorialRect.left + activeTutorialRect.width + 24,
                tutorialContainerWidth - tutorialCardWidth - 12,
              ),
              12,
            ),
            top: Math.max(activeTutorialRect.top - 18, 12),
          }
      : {
          left: Math.max(
            Math.min(
              activeTutorialRect.left,
              tutorialContainerWidth - tutorialCardWidth - 12,
            ),
            12,
          ),
          top: Math.max(activeTutorialRect.top - 96, 12),
        }
    : null

  function resetRouteMessage() {
    setRouteState({
      kind: lookupStatus === 'ready' ? 'idle' : 'error',
      message: getLookupStatusMessage(lookupStatus),
    })
  }

  function updateDistanceManually(value: number) {
    setDistanceMode('manual')
    setDistanceKm(clampDistance(value))
  }

  function handleTutorialAdvance() {
    if (tutorialStep >= 2) {
      setShowTutorial(false)
      return
    }

    setTutorialStep((currentStep) => currentStep + 1)
  }

  useEffect(() => {
    if (!showTutorial) {
      return
    }

    const updateTutorialRects = () => {
      setTutorialRects({
        destination: getRelativeRect(
          destinationFieldRef.current,
          sectionCardRef.current,
        ),
        pickup: getRelativeRect(pickupFieldRef.current, sectionCardRef.current),
        routeButton: getRelativeRect(
          routeButtonRef.current,
          sectionCardRef.current,
        ),
      })
    }

    const frameId = window.requestAnimationFrame(updateTutorialRects)
    window.addEventListener('resize', updateTutorialRects)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updateTutorialRects)
    }
  }, [showTutorial])

  useEffect(() => {
    if (!showTutorial) {
      setTutorialBubbleHeight(0)
      return
    }

    const updateBubbleHeight = () => {
      setTutorialBubbleHeight(tutorialBubbleRef.current?.offsetHeight ?? 0)
    }

    const frameId = window.requestAnimationFrame(updateBubbleHeight)
    window.addEventListener('resize', updateBubbleHeight)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updateBubbleHeight)
    }
  }, [activeTutorialText, showTutorial, tutorialCardWidth, tutorialStep])

  const runRouteCalculation = useEffectEvent(
    async (trigger: 'auto' | 'manual' = 'manual') => {
      if (!lookupAutoEnabled) {
        setRouteState({
          kind: 'error',
          message: getLookupStatusMessage(lookupStatus),
        })
        return
      }

      const trimmedPickup = pickup.trim()
      const trimmedDestination = destination.trim()

      if (!trimmedPickup || !trimmedDestination) {
        if (trigger === 'manual') {
          setRouteState({
            kind: 'error',
            message: copy.routeMissingFields,
          })
        }
        return
      }

      const routeKey = buildRouteKey(
        pickup,
        destination,
        pickupSelection,
        destinationSelection,
        locale,
      )
      const requestId = ++routeRequestIdRef.current

      setRouteState({
        kind: 'loading',
        message: copy.routeLoading,
      })

      try {
        const nextDistance = await fetchRouteDistance({
          destination: trimmedDestination,
          destinationSelection: destinationSelection ?? undefined,
          locale,
          origin: trimmedPickup,
          originSelection: pickupSelection ?? undefined,
        })

        if (requestId !== routeRequestIdRef.current) {
          return
        }

        const normalizedDistanceKm = clampDistance(nextDistance / 1000)
        lastResolvedRouteKeyRef.current = routeKey
        setDistanceKm(normalizedDistanceKm)
        setDistanceMode('route')
        setRouteState({
          kind: 'success',
          message: `${copy.routeCalculatedPrefix}: ${distanceFormatter.format(normalizedDistanceKm)} ${copy.kmUnit}`,
        })
      } catch (error) {
        if (requestId !== routeRequestIdRef.current) {
          return
        }

        const errorKind = handleLookupFailure(error)
        const message =
          errorKind === 'unconfigured'
            ? copy.lookupDisabled
            : errorKind === 'maintenance'
              ? copy.lookupMaintenance
              : copy.routeError

        setDistanceMode('manual')
        setRouteState({
          kind: 'error',
          message,
        })
      }
    },
  )

  useEffect(() => {
    const routeKey = buildRouteKey(
      pickup,
      destination,
      pickupSelection,
      destinationSelection,
      locale,
    )

    if (autoRouteTimerRef.current) {
      window.clearTimeout(autoRouteTimerRef.current)
    }

    if (!lookupAutoEnabled || !routeKey || routeKey === lastResolvedRouteKeyRef.current) {
      return
    }

    autoRouteTimerRef.current = window.setTimeout(
      () => {
        void runRouteCalculation('auto')
      },
      pickupSelection || destinationSelection ? 280 : 850,
    )

    return () => {
      if (autoRouteTimerRef.current) {
        window.clearTimeout(autoRouteTimerRef.current)
      }
    }
  }, [
    destination,
    destinationSelection,
    locale,
    lookupAutoEnabled,
    pickup,
    pickupSelection,
    runRouteCalculation,
  ])

  return (
    <section
      className="scroll-mt-28 pb-14 pt-4 sm:scroll-mt-32 sm:pb-16 sm:pt-6 lg:scroll-mt-36 lg:pb-20"
      id="pricing"
    >
      <div className="mx-auto w-full max-w-[86rem]">
        <div className="soft-card overflow-hidden p-3 sm:p-5 lg:p-6">
          <motion.div
            className="relative"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewport}
            whileInView="visible"
          >
            <div className="absolute inset-x-[16%] top-8 h-20 rounded-full bg-[rgba(207,173,92,0.12)] blur-3xl dark:bg-[rgba(216,181,116,0.06)]" />

            <div className="relative rounded-[2.25rem] border border-[var(--border)] bg-[linear-gradient(145deg,rgba(207,173,92,0.06),rgba(255,255,255,0.02))] p-1 shadow-[0_32px_90px_rgba(17,24,39,0.08)] dark:bg-[linear-gradient(145deg,rgba(216,181,116,0.04),rgba(8,12,17,0.4))]">
              <div
                className="relative grid gap-4 rounded-[2rem] border border-white/50 bg-[var(--surface)] p-4 sm:p-5 xl:grid-cols-2"
                ref={sectionCardRef}
              >
                <motion.div className="space-y-2.5" variants={fadeUp}>
                  <div className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface-muted)] p-3.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Calculator className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                          {content.eyebrow}
                        </p>
                        <h3 className="mt-1 max-w-[32rem] text-[1.38rem] font-semibold leading-[1.18] text-[var(--heading)] sm:text-[1.52rem]">
                          {compactIntroTitle}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {lookupStatus !== 'ready' ? (
                      <div className="rounded-[1.35rem] border border-[rgba(0,104,255,0.16)] bg-[linear-gradient(160deg,rgba(0,104,255,0.1),rgba(255,255,255,0.72))] px-4 py-3 shadow-[0_18px_38px_rgba(0,104,255,0.1)] dark:bg-[linear-gradient(160deg,rgba(28,116,255,0.18),rgba(17,23,31,0.92))]">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--zalo-blue)] dark:text-white">
                          {copy.lookupMaintenanceTitle}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--text)] dark:text-[var(--text-on-dark)]">
                          {getLookupStatusMessage(lookupStatus)}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted-on-dark)]">
                          {copy.lookupManualAvailable}
                        </p>
                      </div>
                    ) : null}

                    <div
                      className={
                        showTutorial && activeTutorialTarget === 'pickup'
                          ? 'relative z-40'
                          : ''
                      }
                      ref={pickupFieldRef}
                    >
                      <AddressAutocompleteInput
                        label={copy.pickupLabel}
                        locale={locale}
                        name="pickupEstimate"
                        onChange={(nextValue) => {
                          setPickup(nextValue)
                          setPickupSelection(null)
                          setDistanceMode('manual')
                          resetRouteMessage()
                        }}
                        onLookupError={handleLookupFailure}
                        onSelect={(selection) => {
                          setPickup(selection.address)
                          setPickupSelection(selection)
                        }}
                        placeholder={copy.pickupPlaceholder}
                        suggestionsEnabled={lookupAutoEnabled}
                        value={pickup}
                      />
                    </div>

                    <div
                      className={
                        showTutorial && activeTutorialTarget === 'destination'
                          ? 'relative z-40'
                          : ''
                      }
                      ref={destinationFieldRef}
                    >
                      <AddressAutocompleteInput
                        label={copy.destinationLabel}
                        locale={locale}
                        name="destinationEstimate"
                        onChange={(nextValue) => {
                          setDestination(nextValue)
                          setDestinationSelection(null)
                          setDistanceMode('manual')
                          resetRouteMessage()
                        }}
                        onLookupError={handleLookupFailure}
                        onSelect={(selection) => {
                          setDestination(selection.address)
                          setDestinationSelection(selection)
                        }}
                        placeholder={copy.destinationPlaceholder}
                        suggestionsEnabled={lookupAutoEnabled}
                        value={destination}
                      />
                    </div>
                  </div>

                  <article className="rounded-[1.4rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(251,246,238,0.94))] p-2.5 sm:p-3 dark:bg-[linear-gradient(180deg,rgba(20,28,37,0.9),rgba(15,21,29,0.96))]">
                    <div className="grid gap-2.5 lg:grid-cols-[1.03fr_0.97fr]">
                      <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-3.5">
                        <div className="flex flex-wrap items-start justify-between gap-2.5">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                              {copy.total}
                            </p>
                            <p className="mt-1.5 text-[1.75rem] font-semibold tracking-[-0.04em] text-[var(--heading)] sm:text-[2rem]">
                              {currencyFormatter.format(estimateTotal)}
                            </p>
                          </div>

                          <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                            {distanceMode === 'route' ? copy.routeLive : copy.routeManual}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-2">
                        <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            {copy.currentDistance}
                          </p>
                          <p className="mt-1.5 text-[1.25rem] font-semibold text-[var(--heading)]">
                            {distanceFormatter.format(distanceKm)} {copy.kmUnit}
                          </p>
                        </div>

                        <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-3">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                            {copy.perKmRate}
                          </p>
                          <p className="mt-1.5 text-[1rem] font-semibold text-[var(--heading)]">
                            {currencyFormatter.format(perKmRate)} / {copy.kmUnit}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <div
                        className={
                          showTutorial && activeTutorialTarget === 'routeButton'
                            ? 'relative z-40'
                            : ''
                        }
                        ref={routeButtonRef}
                      >
                        <ActionButton
                          className="min-h-[2.7rem] px-4"
                          disabled={routeState.kind === 'loading' || !lookupAutoEnabled}
                          icon={
                            routeState.kind === 'loading' ? (
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                            ) : (
                              <Milestone className="h-4 w-4" />
                            )
                          }
                          onClick={() => {
                            void runRouteCalculation('manual')
                          }}
                          size="sm"
                          variant="primary"
                        >
                          {copy.routeAction}
                        </ActionButton>
                      </div>

                      <ActionButton
                        aria-pressed={showRateEditor}
                        className="min-h-[2.7rem] px-4"
                        icon={<Calculator className="h-4 w-4" />}
                        onClick={() => {
                          setShowRateEditor((currentValue) => !currentValue)
                        }}
                        size="sm"
                        variant="secondary"
                      >
                        {copy.perKmRate}
                      </ActionButton>
                    </div>

                    <div
                      className={`mt-2 inline-flex max-w-full rounded-[0.95rem] border px-3 py-1.5 text-[11px] leading-5 ${
                        hasRouteEndpoints && routeState.kind !== 'idle'
                          ? getRouteMessageClass(routeState.kind)
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]'
                      }`}
                    >
                      <span>{mapStatusMessage}</span>
                    </div>

                    {showRateEditor ? (
                      <div className="mt-2 rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface)] p-3.5">
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          <div>
                            <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                              {copy.perKmRate}
                            </label>
                            <input
                              aria-label={copy.perKmRate}
                              className="input-shell mt-2 min-h-[3.25rem] text-center text-base font-semibold text-[var(--heading)]"
                              inputMode="numeric"
                              onChange={(event) => {
                                setPerKmRate(parseCurrencyInput(event.target.value))
                              }}
                              placeholder="0"
                              type="text"
                              value={String(perKmRate)}
                            />
                          </div>

                          <div className="rounded-[1rem] border border-[var(--border)] bg-[var(--surface-muted)] p-3.5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                              {copy.perKmHint}
                            </p>
                            <p className="mt-1.5 text-sm leading-5 text-[var(--muted)]">
                              {copy.rateHint}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-2 rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface)] p-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="block text-sm font-semibold text-[var(--heading)]">
                          {copy.distanceRangeLabel}
                        </label>
                        <span className="text-sm font-semibold text-[var(--heading)]">
                          {distanceFormatter.format(distanceKm)} {copy.kmUnit}
                        </span>
                      </div>

                      <div className="mt-2.5 grid gap-2 sm:grid-cols-[0.68fr_1.32fr] sm:items-center">
                        <input
                          aria-label={copy.distanceInputLabel}
                          className="input-shell min-h-[3.25rem] text-center text-base font-semibold text-[var(--heading)]"
                          inputMode="decimal"
                          onChange={(event) => {
                            const nextValue = event.target.value
                            setDistanceInputValue(nextValue)

                            const parsedValue = parseDistanceInput(nextValue)

                            if (parsedValue !== null) {
                              updateDistanceManually(parsedValue)
                            }
                          }}
                          onBlur={() => {
                            if (distanceInputValue.trim() === '') {
                              setDistanceInputValue(
                                formatDistanceInputValue(distanceKm),
                              )
                              return
                            }

                            const parsedValue = parseDistanceInput(distanceInputValue)

                            if (parsedValue === null) {
                              setDistanceInputValue(
                                formatDistanceInputValue(distanceKm),
                              )
                            }
                          }}
                          step={0.5}
                          type="text"
                          value={distanceInputValue}
                        />

                        <input
                          className="range-input w-full"
                          max={sliderMax}
                          min={1}
                          onChange={(event) => {
                            updateDistanceManually(Number(event.target.value))
                          }}
                          step={1}
                          type="range"
                          value={Math.min(distanceKm, sliderMax)}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                        <span>1 {copy.kmUnit}</span>
                        <span>
                          {sliderMax} {copy.kmUnit}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between">
                      <p className="max-w-[21rem] text-[11px] leading-5 text-[var(--muted)]">
                        {copy.estimatorHint}
                      </p>
                      <ActionButton
                        className="min-h-[2.85rem] w-full shrink-0 justify-center px-5 sm:w-auto"
                        href={siteConfig.contact.phoneHref}
                        icon={<PhoneCall className="h-4 w-4" />}
                        size="sm"
                      >
                        {copy.estimateCta}
                      </ActionButton>
                    </div>
                  </article>
                </motion.div>

                <motion.div
                  className="h-full space-y-4 xl:sticky xl:top-24 xl:self-stretch"
                  variants={fadeUp}
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-[var(--border)] bg-[var(--surface-muted)] shadow-[0_24px_60px_rgba(20,29,39,0.08)]">
                    <div className="border-b border-[var(--border)] px-4 py-4 sm:px-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-2.5">
                          <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                            <MapPinned className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[var(--heading)]">
                              {copy.mapLabel}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                              {hasRouteEndpoints ? copy.mapReady : copy.mapWaiting}
                            </p>
                          </div>
                        </div>

                        <a
                          className="inline-flex min-h-[2.95rem] items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                          href={mapLink}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>{copy.mapOpen}</span>
                        </a>
                      </div>
                    </div>

                    <iframe
                      className="min-h-[22rem] w-full flex-1 lg:min-h-[28rem] xl:min-h-[32rem]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={mapEmbedUrl}
                      title={copy.mapLabel}
                    />
                  </div>
                </motion.div>

                {showTutorial ? (
                  <div
                    className="absolute inset-0 z-30 rounded-[2rem] bg-[rgba(18,24,32,0.62)] backdrop-blur-[2px] text-left"
                    onClick={handleTutorialAdvance}
                  >
                    {tutorialBubblePosition ? (
                      <div
                        className="pointer-events-none absolute z-40"
                        ref={tutorialBubbleRef}
                        style={{
                          left: tutorialBubblePosition.left,
                          top: tutorialBubblePosition.top,
                        }}
                      >
                        <div
                          className={tutorialCardClassName}
                          style={{ width: `${tutorialCardWidth}px` }}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 rounded-full bg-[rgba(224,197,139,0.12)] p-1.5 text-[var(--accent-strong)]">
                              <ArrowDownRight className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0">
                              <p
                                className={`text-sm font-semibold leading-6 text-white ${
                                  tutorialStep < 2 ? 'whitespace-nowrap' : ''
                                }`}
                              >
                                {activeTutorialText}
                              </p>
                              <p className="mt-2 text-xs font-medium text-white/62">
                                {tutorialTapHint}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
