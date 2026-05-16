import { motion } from 'framer-motion'
import { BatteryCharging, Gauge, Rows4, TimerReset, Zap } from 'lucide-react'
import { useState } from 'react'
import type { Locale, VehicleConfig, VehicleContent } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton'
import { SectionHeading } from '../ui/SectionHeading'

const specIcons = [Rows4, BatteryCharging, Gauge, TimerReset, Zap]

const vehicleHighlights = {
  vi: ['7 chỗ rộng rãi', 'Khoang xe yên tĩnh', 'Hợp gia đình và công tác'],
  en: ['Spacious 7 seats', 'Quiet EV cabin', 'Family and business ready'],
} as const

type VehicleShowcaseSectionProps = {
  content: VehicleContent
  locale: Locale
  vehicleConfig: VehicleConfig
}

export default function VehicleShowcaseSection({
  content,
  locale,
  vehicleConfig,
}: VehicleShowcaseSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(() => {
    const heroIndex = vehicleConfig.gallery.findIndex(
      (image) => image.src === vehicleConfig.heroImage,
    )

    return heroIndex >= 0 ? heroIndex : 0
  })
  const selectedImage = vehicleConfig.gallery[selectedImageIndex]
  const finishLabel = locale === 'vi' ? 'Màu đang xem' : 'Current finish'

  function getFinishName(image: VehicleConfig['gallery'][number]) {
    return image.color[locale]
  }

  return (
    <section className="section-padding" id="vehicle">
      <div className="section-shell">
        <div className="soft-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {finishLabel}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--heading)]">
                    {getFinishName(selectedImage)}
                  </p>
                </div>
                <div
                  className="h-4 w-4 rounded-full border border-white/40 shadow-sm"
                  style={{ background: selectedImage.accent }}
                />
              </div>

              <div
                className="flex min-h-[19rem] items-center justify-center overflow-hidden rounded-[1.8rem] border border-[var(--border)] p-4 sm:min-h-[23rem] sm:p-6 lg:min-h-[26rem]"
                style={{
                  background: `radial-gradient(circle at top right, ${selectedImage.accent}, transparent 34%), linear-gradient(145deg, var(--surface), var(--surface-muted))`,
                }}
              >
                <ImageWithSkeleton
                  alt={selectedImage.alt[locale]}
                  className="rounded-[1.5rem]"
                  imageClassName="w-full max-w-[34rem] object-contain drop-shadow-[0_26px_38px_rgba(0,0,0,0.22)]"
                  priority
                  src={selectedImage.src}
                />
              </div>

              {vehicleConfig.gallery.length > 1 ? (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {vehicleConfig.gallery.map((image, index) => (
                    <button
                      key={image.src}
                      aria-label={image.alt[locale]}
                      className={`rounded-[1.15rem] border p-3 text-left transition ${
                        selectedImageIndex === index
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                          : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                      type="button"
                    >
                      <div
                        className="overflow-hidden rounded-[0.95rem] border border-[var(--border)] p-2"
                        style={{
                          background: `linear-gradient(145deg, ${image.accent}, transparent 130%), var(--surface-muted)`,
                        }}
                      >
                        <img
                          alt={image.alt[locale]}
                          className="h-16 w-full object-contain sm:h-20"
                          loading="lazy"
                          src={image.src}
                        />
                      </div>
                      <p className="mt-2 text-sm font-medium text-[var(--text)]">
                        {getFinishName(image)}
                      </p>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <SectionHeading
                align="left"
                description={content.description}
                eyebrow={content.eyebrow}
                title={content.title}
              />

              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                initial="hidden"
                variants={staggerContainer}
                viewport={viewport}
                whileInView="visible"
              >
                {vehicleHighlights[locale].map((highlight) => (
                  <motion.span
                    key={highlight}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] shadow-[var(--shadow-soft)]"
                    variants={fadeUp}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="mt-6 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)]"
                initial="hidden"
                variants={staggerContainer}
                viewport={viewport}
                whileInView="visible"
              >
                <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
                  {content.specs.map((spec, index) => {
                    const Icon = specIcons[index % specIcons.length]

                    return (
                      <motion.article
                        key={spec.label}
                        className="bg-[var(--surface)] p-5"
                        variants={fadeUp}
                      >
                        <div className="flex items-start gap-4">
                          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                              {spec.label}
                            </p>
                            <p className="mt-2 text-lg font-semibold text-[var(--heading)] sm:text-xl">
                              {spec.value}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div
                className="mt-6 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:p-6"
                initial="hidden"
                variants={fadeUp}
                viewport={viewport}
                whileInView="visible"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                  {content.usageLabel}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {content.usageNotes.map((note) => (
                    <div
                      key={note}
                      className="rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm leading-7 text-[var(--text)] sm:text-base"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
