import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle2,
  LoaderCircle,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from 'lucide-react'
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react'
import { useState } from 'react'
import { siteConfig } from '../../data/siteContent'
import { submitBookingRequest } from '../../services/bookings'
import type {
  BookingContent,
  BookingFieldKey,
  BookingFormValues,
  Locale,
} from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { ActionButton } from '../ui/ActionButton'
import { SectionHeading } from '../ui/SectionHeading'

type BookingSectionProps = {
  content: BookingContent
  locale: Locale
  vehicleName: string
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

const supportIcons = [ShieldCheck, TimerReset, Sparkles]
const bookingMetaCopy = {
  vi: {
    availability: 'Thường phản hồi nhanh trong khung giờ phục vụ.',
    directCall: 'Cần chốt nhanh, hãy gọi trực tiếp',
    zaloLabel: 'Nhắn Zalo để giữ nhịp trao đổi',
    afterSendTitle: 'Sau khi gửi',
    afterSendNote: 'Lịch phù hợp sẽ được gọi lại hoặc xác nhận qua Zalo để chốt chuyến rõ ràng hơn.',
    tipTitle: 'Điền nhanh là đủ',
    tipNote: 'Chỉ cần điểm đón, điểm đến, giờ đi và số điện thoại là đã có thể giữ lịch sơ bộ.',
    steps: ['Điền điểm đón', 'Chọn giờ đi', 'Nhận xác nhận lại'],
  },
  en: {
    availability: 'Usually answered quickly during service hours.',
    directCall: 'For the fastest confirmation, call directly',
    zaloLabel: 'Use Zalo for a smoother back-and-forth',
    afterSendTitle: 'After you send it',
    afterSendNote: 'If the timing fits, the trip is confirmed back by phone call or Zalo with the key details.',
    tipTitle: 'Only the essentials',
    tipNote: 'Pickup, destination, time, and phone number are enough to hold the first confirmation.',
    steps: ['Add pickup details', 'Choose the ride time', 'Get confirmation back'],
  },
} as const

function getLocalDateTimeFloor() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 16)
}

function createInitialForm(): BookingFormValues {
  return {
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    dateTime: '',
    notes: '',
  }
}

export default function BookingSection({
  content,
  locale,
  vehicleName,
}: BookingSectionProps) {
  const [formValues, setFormValues] = useState<BookingFormValues>(() =>
    createInitialForm(),
  )
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<BookingFieldKey, string>>
  >({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [minDateTime] = useState(() => getLocalDateTimeFloor())
  const metaCopy = bookingMetaCopy[locale]

  const validate = () => {
    const errors: Partial<Record<BookingFieldKey, string>> = {}
    const phoneRegex = /^[0-9+() .-]{8,20}$/
    const tripTime = formValues.dateTime ? new Date(formValues.dateTime) : null

    if (formValues.name.trim().length < 2) {
      errors.name = content.errors.name
    }
    if (!phoneRegex.test(formValues.phone.trim())) {
      errors.phone = content.errors.phone
    }
    if (!formValues.pickup.trim()) {
      errors.pickup = content.errors.pickup
    }
    if (!formValues.destination.trim()) {
      errors.destination = content.errors.destination
    }
    if (!formValues.dateTime) {
      errors.dateTime = content.errors.dateTime
    } else if (tripTime && tripTime.getTime() < Date.now() - 60_000) {
      errors.dateTime = content.errors.dateTimePast
    }

    return errors
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    const fieldName = name as BookingFieldKey

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }))

    if (fieldErrors[fieldName]) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: undefined,
      }))
    }

    if (submissionState !== 'idle') {
      setSubmissionState('idle')
      setSubmitMessage('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})
    setSubmissionState('submitting')
    setSubmitMessage('')

    try {
      await submitBookingRequest({
        ...formValues,
        locale,
        source: 'landing-page',
        status: 'new',
        vehicle: vehicleName,
      })

      setSubmissionState('success')
      setSubmitMessage(content.successMessage)
      setFormValues(createInitialForm())
    } catch (error) {
      setSubmissionState('error')
      setSubmitMessage(
        error instanceof Error ? error.message : content.errorFallback,
      )
    }
  }

  return (
    <section className="section-padding" id="booking">
      <div className="section-shell">
        <div className="mx-auto grid max-w-[86rem] gap-6 xl:grid-cols-[0.88fr_1.12fr] xl:items-stretch">
          <div className="soft-card h-full p-6 sm:p-8">
            <SectionHeading
              align="left"
              description={content.description}
              eyebrow={content.eyebrow}
              title={content.title}
            />

            <motion.div
              className="mt-6 grid gap-4 sm:grid-cols-2"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewport}
              whileInView="visible"
            >
              {content.reassurance.map((item, index) => {
                const Icon = supportIcons[index % supportIcons.length]

                return (
                  <motion.div
                    key={item.title}
                    className={`rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:p-5 ${
                      index === content.reassurance.length - 1 ? 'sm:col-span-2' : ''
                    }`}
                    variants={fadeUp}
                  >
                    <div className="flex items-start gap-4">
                      <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[var(--heading)]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-[var(--muted)] sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              className="mt-6 grid gap-4 lg:grid-cols-2"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewport}
              whileInView="visible"
            >
              <motion.article
                className="rounded-[1.65rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]"
                variants={fadeUp}
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                  {metaCopy.directCall}
                </p>
                <p className="mt-2 text-2xl font-semibold text-[var(--heading)]">
                  {siteConfig.contact.phoneDisplay}
                </p>
                <ActionButton
                  className="mt-4 w-full"
                  href={siteConfig.contact.phoneHref}
                  icon={<PhoneCall className="h-4 w-4" />}
                  size="sm"
                >
                  {locale === 'vi' ? 'Gọi ngay' : 'Call now'}
                </ActionButton>
              </motion.article>

              <motion.article
                className="rounded-[1.65rem] border border-[rgba(0,104,255,0.16)] bg-[linear-gradient(160deg,rgba(0,104,255,0.12),rgba(255,255,255,0.72))] p-5 shadow-[0_20px_46px_rgba(0,104,255,0.12)] dark:bg-[linear-gradient(160deg,rgba(28,116,255,0.18),rgba(17,23,31,0.92))]"
                variants={fadeUp}
              >
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--zalo-blue)] dark:text-white">
                  Zalo
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text)] dark:text-[var(--text-on-dark)] sm:text-base">
                  {metaCopy.zaloLabel}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted-on-dark)]">
                  {metaCopy.availability}
                </p>
                <ActionButton
                  className="mt-4 w-full"
                  href={siteConfig.contact.zaloHref}
                  icon={<MessageCircleMore className="h-4 w-4" />}
                  rel="noreferrer"
                  size="sm"
                  target="_blank"
                  variant="zalo"
                >
                  Zalo
                </ActionButton>
              </motion.article>
            </motion.div>
          </div>

          <motion.div
            className="soft-card flex h-full flex-col p-6 sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={viewport}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="mb-5 flex flex-wrap gap-2"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewport}
              whileInView="visible"
            >
              {metaCopy.steps.map((step) => (
                <motion.span
                  key={step}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm text-[var(--muted)]"
                  variants={fadeUp}
                >
                  {step}
                </motion.span>
              ))}
            </motion.div>

            <form className="grid flex-1 gap-5" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  content={content.fields.name}
                  error={fieldErrors.name}
                  name="name"
                  onChange={handleChange}
                  value={formValues.name}
                />
                <FormField
                  content={content.fields.phone}
                  error={fieldErrors.phone}
                  inputMode="tel"
                  name="phone"
                  onChange={handleChange}
                  value={formValues.phone}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  content={content.fields.pickup}
                  error={fieldErrors.pickup}
                  name="pickup"
                  onChange={handleChange}
                  value={formValues.pickup}
                />
                <FormField
                  content={content.fields.destination}
                  error={fieldErrors.destination}
                  name="destination"
                  onChange={handleChange}
                  value={formValues.destination}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  content={content.fields.dateTime}
                  error={fieldErrors.dateTime}
                  min={minDateTime}
                  name="dateTime"
                  onChange={handleChange}
                  type="datetime-local"
                  value={formValues.dateTime}
                />
                <FormField
                  className="md:col-span-1"
                  content={content.fields.notes}
                  error={fieldErrors.notes}
                  multiline
                  name="notes"
                  onChange={handleChange}
                  value={formValues.notes}
                />
              </div>

              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4 text-sm leading-6 text-[var(--muted)]">
                {content.privacyNote}
              </div>

              <ActionButton
                className="w-full"
                disabled={submissionState === 'submitting'}
                size="lg"
                type="submit"
              >
                <span className="inline-flex items-center gap-2">
                  {submissionState === 'submitting' ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : null}
                  {submissionState === 'submitting'
                    ? content.submittingLabel
                    : content.submitLabel}
                </span>
              </ActionButton>
            </form>

            <AnimatePresence mode="wait">
              {submitMessage ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 rounded-[1.5rem] border px-5 py-4 text-base leading-7 ${
                    submissionState === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300'
                      : 'border-amber-500/30 bg-amber-500/12 text-amber-800 dark:text-amber-300'
                  }`}
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="flex items-start gap-3">
                    {submissionState === 'success' ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    ) : (
                      <Sparkles className="mt-0.5 h-5 w-5 shrink-0" />
                    )}
                    <p>{submitMessage}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.45rem] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">
                  {metaCopy.afterSendTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {metaCopy.afterSendNote}
                </p>
              </div>
              <div className="rounded-[1.45rem] border border-[var(--border)] bg-[var(--surface-muted)] p-4">
                <p className="text-sm font-semibold text-[var(--heading)]">
                  {metaCopy.tipTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {metaCopy.tipNote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

type FormFieldProps = {
  className?: string
  content: BookingContent['fields'][BookingFieldKey]
  error?: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  min?: string
  multiline?: boolean
  name: BookingFieldKey
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  value: string
}

function FormField({
  className,
  content,
  error,
  inputMode,
  min,
  multiline = false,
  name,
  onChange,
  type = 'text',
  value,
}: FormFieldProps) {
  return (
    <label className={`grid gap-2 ${className ?? ''}`}>
      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {content.label}
      </span>
      {multiline ? (
        <textarea
          className={`input-shell min-h-[8.5rem] resize-y xl:min-h-[10rem] ${error ? 'input-shell-error' : ''}`}
          name={name}
          onChange={onChange}
          placeholder={content.placeholder}
          value={value}
        />
      ) : (
        <input
          className={`input-shell ${error ? 'input-shell-error' : ''}`}
          inputMode={inputMode}
          min={min}
          name={name}
          onChange={onChange}
          placeholder={content.placeholder}
          type={type}
          value={value}
        />
      )}
      {error ? <span className="text-sm text-rose-500">{error}</span> : null}
    </label>
  )
}
