import { AnimatePresence, motion } from 'framer-motion'
import { LoaderCircle, MapPin } from 'lucide-react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useDeferredValue, useEffect, useRef, useState } from 'react'
import {
  addressLookupAvailable,
  fetchAddressSuggestions,
  type AddressSuggestion,
} from '../../lib/serpApi'
import type { Locale } from '../../types/site'

export type AddressAutocompleteSelection = {
  address: string
  dataId?: string
  location?: {
    lat: number
    lng: number
  }
}

type AddressAutocompleteInputProps = {
  autoComplete?: string
  disabled?: boolean
  label: string
  locale: Locale
  name?: string
  onChange: (value: string) => void
  onLookupError?: (error: unknown) => void
  onSelect?: (selection: AddressAutocompleteSelection) => void
  placeholder: string
  suggestionsEnabled?: boolean
  value: string
}

export function AddressAutocompleteInput({
  autoComplete = 'off',
  disabled = false,
  label,
  locale,
  name,
  onChange,
  onLookupError,
  onSelect,
  placeholder,
  suggestionsEnabled = true,
  value,
}: AddressAutocompleteInputProps) {
  const deferredValue = useDeferredValue(value.trim())
  const blurTimerRef = useRef<number | undefined>(undefined)
  const requestIdRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [lockedSelectionValue, setLockedSelectionValue] = useState('')
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])

  useEffect(() => {
    return () => {
      if (blurTimerRef.current) {
        window.clearTimeout(blurTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (
      lockedSelectionValue &&
      deferredValue.length > 0 &&
      deferredValue === lockedSelectionValue
    ) {
      setSuggestions([])
      setIsOpen(false)
      setIsLoading(false)
      setActiveIndex(-1)
      return
    }

    if (!addressLookupAvailable || !suggestionsEnabled || deferredValue.length < 3) {
      setSuggestions([])
      setIsOpen(false)
      setIsLoading(false)
      setActiveIndex(-1)
      return
    }

    let cancelled = false
    const currentRequestId = ++requestIdRef.current
    const controller = new AbortController()

    const timer = window.setTimeout(async () => {
      try {
        setIsLoading(true)

        const nextSuggestions = await fetchAddressSuggestions(
          deferredValue,
          locale,
          controller.signal,
        )

        if (cancelled || currentRequestId !== requestIdRef.current) {
          return
        }

        setSuggestions(nextSuggestions)
        setIsOpen(nextSuggestions.length > 0)
        setActiveIndex(nextSuggestions.length > 0 ? 0 : -1)
      } catch (error) {
        if (cancelled || currentRequestId !== requestIdRef.current) {
          return
        }

        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        onLookupError?.(error)
        setSuggestions([])
        setIsOpen(false)
      } finally {
        if (!cancelled && currentRequestId === requestIdRef.current) {
          setIsLoading(false)
        }
      }
    }, 220)

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [deferredValue, locale, lockedSelectionValue, onLookupError, suggestionsEnabled])

  function handleSuggestionSelect(suggestion: AddressSuggestion) {
    const nextValue = suggestion.text.trim()

    if (blurTimerRef.current) {
      window.clearTimeout(blurTimerRef.current)
    }

    setLockedSelectionValue(nextValue)
    setIsOpen(false)
    setSuggestions([])
    setActiveIndex(-1)
    onChange(suggestion.text)
    onSelect?.({
      address: suggestion.text,
      dataId: suggestion.dataId,
      location: suggestion.location,
    })
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((currentIndex) =>
        currentIndex >= suggestions.length - 1 ? 0 : currentIndex + 1,
      )
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((currentIndex) =>
        currentIndex <= 0 ? suggestions.length - 1 : currentIndex - 1,
      )
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      handleSuggestionSelect(suggestions[activeIndex])
    }

    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  function handleInputChange(nextValue: string) {
    if (
      lockedSelectionValue &&
      nextValue.trim() !== '' &&
      nextValue.trim() !== lockedSelectionValue
    ) {
      setLockedSelectionValue('')
    }

    if (nextValue.trim() === '') {
      setLockedSelectionValue('')
    }

    onChange(nextValue)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--heading)] sm:text-base">
        {label}
      </label>

      <div className="relative mt-3">
        <input
          autoComplete={autoComplete}
          className="input-shell pr-16"
          disabled={disabled}
          name={name}
          onBlur={() => {
            blurTimerRef.current = window.setTimeout(() => {
              setIsOpen(false)
            }, 120)
          }}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={() => {
            if (blurTimerRef.current) {
              window.clearTimeout(blurTimerRef.current)
            }

            if (
              suggestions.length > 0 &&
              (!lockedSelectionValue || deferredValue !== lockedSelectionValue)
            ) {
              setIsOpen(true)
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          type="text"
          value={value}
        />

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
          {isLoading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <MapPin className="h-5 w-5" />
          )}
        </div>

        <AnimatePresence>
          {isOpen && suggestions.length > 0 ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="soft-card absolute left-0 right-0 z-20 mt-3 overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]"
              exit={{ opacity: 0, y: -8 }}
              initial={{ opacity: 0, y: -8 }}
            >
              <ul className="max-h-80 overflow-y-auto py-2">
                {suggestions.map((suggestion, index) => {
                  const isActive = index === activeIndex

                  return (
                    <li key={suggestion.id}>
                      <button
                        className={`w-full px-4 py-3 text-left transition ${
                          isActive
                            ? 'bg-[var(--accent-soft)]'
                            : 'hover:bg-[var(--surface-muted)]'
                        }`}
                        onClick={() => {
                          handleSuggestionSelect(suggestion)
                        }}
                        onMouseDown={(event) => {
                          event.preventDefault()
                        }}
                        type="button"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[var(--heading)] sm:text-base">
                              {suggestion.primary}
                            </p>
                            {suggestion.secondary ? (
                              <p className="mt-1 text-sm text-[var(--muted)]">
                                {suggestion.secondary}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
