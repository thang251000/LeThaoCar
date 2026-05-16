import type { SiteConfig, SiteContent } from '../types/site'

const phoneDisplay = '0978 918 777'
const phoneHref = 'tel:+84978918777'
const zaloHref = 'https://zalo.me/84978918777'
const originAddressVi = 'Ấp Trầu, Phước Thiền, Nhơn Trạch, Đồng Nai'
const originAddressEn = 'Ap Trau, Phuoc Thien, Nhon Trach, Dong Nai'

export const siteConfig: SiteConfig = {
  brand: {
    vi: 'Lê Thảo Lái xe',
    en: 'Le Thao Lai Xe',
  },
  contact: {
    phoneDisplay,
    phoneHref,
    zaloHref,
    facebookHref: 'https://www.facebook.com/lethaochauffeur',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Ap+Trau,+Phuoc+Thien,+Nhon+Trach,+Dong+Nai,+Vietnam&z=13&output=embed',
    mapLink:
      'https://maps.google.com/?q=Ap+Trau,+Phuoc+Thien,+Nhon+Trach,+Dong+Nai,+Vietnam',
    originAddress: {
      vi: originAddressVi,
      en: originAddressEn,
    },
    originRouteQuery: 'Ap Trau, Phuoc Thien, Nhon Trach, Dong Nai, Vietnam',
  },
  ogImage: '/images/social-share-card.png?v=20260516',
  serviceArea: {
    vi: 'Phục vụ TP. Hồ Chí Minh, sân bay Tân Sơn Nhất, Nhơn Trạch, Đồng Nai và các tuyến liên tỉnh theo lịch hẹn.',
    en: 'Serving Ho Chi Minh City, Tan Son Nhat Airport, Nhon Trach, Dong Nai, and nearby provinces by advance booking.',
  },
  vehicle: {
    name: 'VinFast Limo Green 7 chỗ',
    heroImage: '/images/limo-green-white.png',
    gallery: [
      {
        src: '/images/limo-green-black.png',
        accent: 'rgba(255,255,255,0.08)',
        alt: {
          vi: 'VinFast Limo Green màu đen nhám',
          en: 'VinFast Limo Green in matte black',
        },
        color: {
          vi: 'Đen nhám',
          en: 'Matte black',
        },
      },
      {
        src: '/images/limo-green-gold.png',
        accent: 'rgba(205,170,92,0.22)',
        alt: {
          vi: 'VinFast Limo Green màu vàng champagne',
          en: 'VinFast Limo Green in champagne gold',
        },
        color: {
          vi: 'Vàng champagne',
          en: 'Champagne gold',
        },
      },
      {
        src: '/images/limo-green-silver.png',
        accent: 'rgba(184,191,199,0.24)',
        alt: {
          vi: 'VinFast Limo Green màu bạc ánh kim',
          en: 'VinFast Limo Green in metallic silver',
        },
        color: {
          vi: 'Bạc ánh kim',
          en: 'Metallic silver',
        },
      },
      {
        src: '/images/limo-green-red.png',
        accent: 'rgba(159,44,46,0.24)',
        alt: {
          vi: 'VinFast Limo Green màu đỏ burgundy',
          en: 'VinFast Limo Green in burgundy red',
        },
        color: {
          vi: 'Đỏ burgundy',
          en: 'Burgundy red',
        },
      },
      {
        src: '/images/limo-green-white.png',
        accent: 'rgba(232,239,247,0.48)',
        alt: {
          vi: 'VinFast Limo Green màu trắng ngọc trai',
          en: 'VinFast Limo Green in pearl white',
        },
        color: {
          vi: 'Trắng ngọc trai',
          en: 'Pearl white',
        },
      },
    ],
  },
}

export const siteContent: SiteContent = {
  vi: {
    seo: {
      title: 'Lê Thảo Lái xe | Dịch vụ lái xe riêng, đưa đón sân bay và đi tỉnh',
      description:
        'Lê Thảo Lái xe chuyên lái xe riêng, đưa đón sân bay, đi công tác, đi gia đình và các chuyến liên tỉnh bằng VinFast Limo Green 7 chỗ. Liên hệ nhanh qua điện thoại hoặc Zalo.',
    },
    nav: {
      tagline: 'Dịch vụ tài xế riêng',
      callNow: 'Gọi ngay',
      zalo: 'Zalo',
      openMenu: 'Mở menu',
      closeMenu: 'Đóng menu',
      lightLabel: 'Sáng',
      darkLabel: 'Tối',
      switchToLight: 'Chuyển sang giao diện sáng',
      switchToDark: 'Chuyển sang giao diện tối',
      languageToggleLabel: 'Đổi ngôn ngữ',
      links: [
        { label: 'Giới thiệu', href: '#about' },
        { label: 'Xe', href: '#vehicle' },
        { label: 'Dịch vụ', href: '#services' },
        { label: 'Bảng giá', href: '#pricing' },
        { label: 'Liên hệ', href: '#contact' },
      ],
    },
    hero: {
      eyebrow: 'VinFast Limo Green 7 chỗ | Tài xế riêng',
      title: 'Di chuyển riêng tư, êm ái và đúng giờ.',
      description:
        'Dịch vụ tài xế riêng do chủ xe trực tiếp phục vụ, phù hợp cho sân bay, công tác, đi gia đình và các lịch trình liên tỉnh cần sự gọn gàng, rõ ràng.',
      badges: [
        'Không ghép khách',
        'Xe sạch trước mỗi chuyến',
        'Xác nhận nhanh qua điện thoại hoặc Zalo',
      ],
      primaryCta: 'Gọi đặt chuyến',
      secondaryCta: 'Nhắn Zalo',
      stats: [
        {
          value: '7 chỗ rộng rãi',
          label: 'Phù hợp cho gia đình, khách công tác và nhiều hành lý sân bay.',
        },
        {
          value: 'Đón đúng giờ',
          label: 'Thời gian đón và hành trình được xác nhận rõ trước khi đi.',
        },
        {
          value: 'Êm và yên tĩnh',
          label: 'Khoang xe điện phù hợp cho người lớn tuổi, trẻ nhỏ và các chuyến dài.',
        },
      ],
      imageAlt: 'VinFast Limo Green màu trắng ngọc trai',
      carCardLabel: 'Phương tiện phục vụ',
      assuranceLabel: 'Cam kết dịch vụ',
      assurances: [
        'Chủ xe trực tiếp nhận và phục vụ chuyến đi',
        'Lái xe điềm tĩnh, ưu tiên an toàn và sự dễ chịu',
        'Phù hợp cho sân bay, công tác, gia đình và liên tỉnh',
      ],
    },
    about: {
      eyebrow: 'Chủ xe trực tiếp phục vụ',
      title: 'Giới thiệu về chủ xe Lê Thảo và cách đồng hành trong từng chuyến đi.',
      description:
        'Lê Thảo trực tiếp nhận lịch, xác nhận giờ đón và lái xe cho khách trong suốt hành trình. Cách phục vụ ưu tiên sự rõ ràng, kín đáo và cảm giác yên tâm cho các chuyến sân bay, công tác, đi gia đình hoặc đi tỉnh.',
      differenceTitle: 'Khi đi cùng chủ xe',
      differencePoints: [
        'Trao đổi trực tiếp trước giờ đón để chốt rõ lịch trình',
        'Không ghép khách, không đổi tài xế giữa chừng',
        'Luôn theo sát giờ giấc và tình hình tuyến đường thực tế',
      ],
      highlights: [
        {
          title: 'Lái xe điềm tĩnh',
          description:
            'Giữ nhịp lái ổn định, ưu tiên an toàn và sự dễ chịu trong suốt chuyến đi.',
        },
        {
          title: 'Trao đổi rõ ràng',
          description:
            'Thông tin giờ đón, điểm dừng và lộ trình được xác nhận kỹ trước khi khởi hành.',
        },
        {
          title: 'Đúng giờ',
          description:
            'Giờ đón được xác nhận trước để hành trình chủ động và ít phải chờ.',
        },
        {
          title: 'Kín đáo, lịch sự',
          description:
            'Phù hợp cho khách công tác, gia đình hoặc những chuyến cần không gian riêng.',
        },
        {
          title: 'Xe luôn gọn gàng',
          description:
            'Khoang xe luôn gọn gàng, dễ chịu ngay từ lúc bước lên xe.',
        },
      ],
    },
    vehicle: {
      eyebrow: 'VinFast Limo Green 7 chỗ',
      title: 'Khoang rộng, đi êm và phù hợp cho gia đình lẫn khách công tác.',
      description:
        'VinFast Limo Green mang lại cảm giác sạch, yên và chỉnh chu cho những chuyến cần sự dễ chịu lâu dài.',
      specs: [
        { label: 'Kích thước', value: '4740 x 1872 x 1729 mm' },
        { label: 'Số chỗ ngồi', value: '7 chỗ rộng rãi' },
        { label: 'Dung lượng pin', value: '60.13 kWh' },
        { label: 'Tầm hoạt động', value: '450 km mỗi lần sạc (NEDC)' },
      ],
      usageLabel: 'Phù hợp cho',
      usageNotes: [
        'Gia đình có vali, xe đẩy hoặc nhiều hành lý sân bay.',
        'Khách công tác cần xe yên tĩnh, sạch và tác phong lịch sự.',
        'Lịch trình trong ngày hoặc liên tỉnh ngắn cần cảm giác nhẹ nhàng hơn.',
      ],
    },
    services: {
      eyebrow: 'Những nhu cầu thường gặp',
      title: 'Các chuyến đi được chuẩn bị gọn gàng và riêng tư.',
      description:
        'Mỗi dịch vụ đều ưu tiên sự riêng tư, dễ đặt lịch và cảm giác thoải mái cho cả khách đi gia đình lẫn công việc.',
      items: [
        {
          icon: 'airport',
          title: 'Đưa đón sân bay',
          description:
            'Đúng giờ, gọn hành lý và phù hợp cho các chuyến cần sự yên tâm từ sớm.',
        },
        {
          icon: 'business',
          title: 'Đi công tác',
          description:
            'Phù hợp cho họp hành, gặp đối tác và các lịch trình cần tác phong lịch sự.',
        },
        {
          icon: 'family',
          title: 'Đi gia đình',
          description:
            'Êm, rộng và dễ chịu cho người lớn tuổi, trẻ nhỏ và nhiều điểm dừng.',
        },
        {
          icon: 'province',
          title: 'Liên tỉnh',
          description:
            'Thích hợp cho các tuyến Đồng Nai, Bà Rịa - Vũng Tàu, Bình Dương và vùng lân cận.',
        },
        {
          icon: 'daily',
          title: 'Thuê theo ngày',
          description:
            'Giải pháp linh hoạt cho công việc, chăm sóc người thân hoặc lịch đi nhiều nơi.',
        },
        {
          icon: 'event',
          title: 'Đưa đón sự kiện',
          description:
            'Phù hợp cho cưới hỏi, hội họp, gặp gỡ riêng và lịch trình cần đúng giờ.',
        },
      ],
    },
    whyChooseUs: {
      eyebrow: 'Lý do khách quay lại',
      title: 'Điểm mạnh nhất là cảm giác yên tâm trong suốt chuyến đi.',
      description:
        'Một dịch vụ tài xế riêng không cần quá ồn ào. Điều quan trọng là xe sạch, lái êm và cách làm việc khiến khách thấy dễ phối hợp.',
      items: [
        {
          icon: 'driver',
          title: 'Lái xe vững',
          description:
            'Điềm tĩnh, quan sát tốt và xử lý ổn định trong cả đường nội thành lẫn liên tỉnh.',
        },
        {
          icon: 'clean',
          title: 'Xe sạch mỗi ngày',
          description:
            'Khoang xe được giữ gọn gàng để khách bước lên là thấy dễ chịu ngay.',
        },
        {
          icon: 'ontime',
          title: 'Luôn đúng giờ',
          description:
            'Giờ đón được chốt rõ ràng để hạn chế trễ lịch và chờ đợi không cần thiết.',
        },
        {
          icon: 'comfort',
          title: 'Ngồi lâu vẫn thoải mái',
          description:
            'Khoang xe yên tĩnh, rộng rãi và phù hợp cho cả trẻ nhỏ lẫn người lớn tuổi.',
        },
        {
          icon: 'booking',
          title: 'Đặt lịch nhanh',
          description:
            'Chỉ cần gọi điện hoặc nhắn Zalo là có thể chốt được thông tin cơ bản.',
        },
        {
          icon: 'support',
          title: 'Trao đổi dễ chịu',
          description:
            'Cách trao đổi ngắn gọn, rõ ý và không gây áp lực cho khách khi đang bận.',
        },
      ],
    },
    pricing: {
      eyebrow: 'Ước tính chi phí',
      title: 'Nhập điểm đón và điểm đến để xem mức giá tạm tính.',
      description:
        'Phần này giúp ước tính nhanh theo quãng đường và đơn giá mỗi kilomet, phù hợp khi cần tham khảo trước khi gọi.',
      note:
        'Giá cuối cùng có thể thay đổi theo thời gian chờ, phí cầu đường, bãi xe hoặc lịch trình nhiều điểm dừng. Báo giá chính xác sẽ được xác nhận khi có đầy đủ thông tin chuyến đi.',
      table: {
        service: 'Dịch vụ',
        price: 'Từ',
        suitableFor: 'Phù hợp',
      },
      rows: [
        {
          service: 'Đưa đón sân bay',
          price: '650.000đ',
          description:
            'TP. Hồ Chí Minh <-> Tân Sơn Nhất, phù hợp cho gia đình có nhiều hành lý.',
        },
        {
          service: 'Đi trong thành phố',
          price: '450.000đ',
          description:
            'Khám bệnh, gặp đối tác hoặc nhiều điểm dừng trong nội thành.',
        },
        {
          service: 'Chuyến liên tỉnh',
          price: '1.600.000đ',
          description:
            'Đồng Nai, Bình Dương, Bà Rịa - Vũng Tàu, Long An và vùng lân cận.',
        },
        {
          service: 'Thuê theo ngày',
          price: '2.800.000đ',
          description:
            'Khoảng 8-10 giờ linh hoạt cho công tác, sự kiện hoặc gia đình.',
        },
      ],
      cta: 'Nhận báo giá chính xác',
    },
    testimonials: {
      eyebrow: 'Khách hàng chia sẻ',
      title: 'Những nhận xét ngắn gọn về trải nghiệm dịch vụ.',
      description:
        'Phản hồi từ khách hàng cũ về độ đúng giờ, sự sạch sẽ và cảm giác dễ chịu trên xe.',
      items: [
        {
          name: 'Minh Anh',
          role: 'Gia đình, Thảo Điền',
          quote:
            'Xe sạch, đi êm và xác nhận lịch rất nhanh. Nhà mình có hai bé nhỏ nhưng chuyến đi ra sân bay vẫn rất nhẹ nhàng.',
        },
        {
          name: 'Hoàng Nam',
          role: 'Sales Manager, Quận 7',
          quote:
            'Mình cần đúng giờ cho các buổi gặp khách. Cách làm việc rõ ràng và rất dễ phối hợp.',
        },
        {
          name: 'Lan Hương',
          role: 'Gia đình, Vũng Tàu',
          quote:
            'Đặt cho ba mẹ đi khám, tài xế lái điềm tĩnh nên người lớn tuổi cũng thấy thoải mái.',
        },
        {
          name: 'Đức Trí',
          role: 'Event producer, Bình Thạnh',
          quote:
            'Lịch trình nhiều điểm dừng nhưng vẫn giữ được nhịp di chuyển rất gọn.',
        },
      ],
    },
    booking: {
      eyebrow: 'Đặt lịch nhanh',
      title: 'Gửi thông tin ngắn gọn để chốt chuyến thuận tiện hơn.',
      description:
        'Chỉ cần để lại điểm đón, điểm đến, thời gian và số điện thoại. Nếu lịch phù hợp, chuyến đi sẽ được xác nhận lại nhanh qua điện thoại hoặc Zalo.',
      reassurance: [
        {
          title: 'Xác nhận rõ ràng',
          description:
            'Giờ đón, số người đi cùng và hành lý được hỏi kỹ trước khi chốt.',
        },
        {
          title: 'Phản hồi nhanh',
          description:
            'Thông thường phản hồi trong khoảng 10-15 phút trong khung giờ phục vụ.',
        },
        {
          title: 'Thông tin riêng tư',
          description:
            'Dữ liệu chỉ dùng để xác nhận lịch và hỗ trợ chuyến đi, không chia sẻ ra ngoài.',
        },
      ],
      fields: {
        name: {
          label: 'Họ và tên',
          placeholder: 'Ví dụ: Nguyễn Minh Anh',
        },
        phone: {
          label: 'Số điện thoại',
          placeholder: phoneDisplay,
        },
        pickup: {
          label: 'Điểm đón',
          placeholder: 'Ví dụ: Thảo Điền, Quận 2',
        },
        destination: {
          label: 'Điểm đến',
          placeholder: 'Ví dụ: Sân bay Tân Sơn Nhất',
        },
        dateTime: {
          label: 'Ngày và giờ đón',
          placeholder: '',
        },
        notes: {
          label: 'Ghi chú thêm',
          placeholder:
            'Ví dụ: có người lớn tuổi, trẻ nhỏ, nhiều vali hoặc cần dừng thêm điểm.',
        },
      },
      errors: {
        name: 'Vui lòng nhập họ và tên rõ ràng.',
        phone: 'Vui lòng nhập số điện thoại hợp lệ.',
        pickup: 'Vui lòng nhập điểm đón.',
        destination: 'Vui lòng nhập điểm đến.',
        dateTime: 'Vui lòng chọn ngày và giờ đón.',
        dateTimePast: 'Vui lòng chọn thời gian hiện tại hoặc trong tương lai.',
      },
      submitLabel: 'Gửi yêu cầu đặt lịch',
      submittingLabel: 'Đang gửi yêu cầu',
      successMessage:
        'Yêu cầu đã được gửi thành công. Lê Thảo Lái xe sẽ liên hệ lại sớm để xác nhận chuyến đi.',
      errorFallback:
        'Chưa thể gửi yêu cầu lúc này. Vui lòng thử lại sau hoặc gọi trực tiếp qua số 0978 918 777.',
      privacyNote:
        'Thông tin chỉ dùng để xác nhận chuyến đi và hỗ trợ báo giá. Không chia sẻ cho bên thứ ba.',
    },
    contact: {
      eyebrow: 'Liên hệ',
      title: 'Liên hệ nhanh, bố cục gọn và dễ dùng trên cả điện thoại lẫn máy tính.',
      description:
        'Nếu cần chốt nhanh, hãy gọi hoặc nhắn Zalo trực tiếp. Bản đồ bên dưới chỉ để tham chiếu vị trí xe đậu, không phải điểm đón cố định của khách.',
      phoneLabel: 'Điện thoại',
      zaloValue: phoneDisplay,
      facebookValue: 'Facebook / Messenger',
      coverageLabel: 'Khu vực phục vụ',
      coverage: {
        vi: 'TP. Hồ Chí Minh, sân bay Tân Sơn Nhất, Nhơn Trạch, Đồng Nai và các tuyến liên tỉnh ngắn ngày.',
        en: 'Ho Chi Minh City, Tan Son Nhat Airport, Nhon Trach, Dong Nai, and nearby province routes.',
      },
      responseTime: {
        vi: 'Thường phản hồi trong khoảng 10-15 phút trong khung giờ hoạt động.',
        en: 'Typical response time is around 10-15 minutes during service hours.',
      },
      callNow: 'Gọi ngay',
      mapLabel: 'Bản đồ tham chiếu',
      mapTitle: 'Vị trí xe đậu và khu vực nhận chuyến',
      openMap: 'Mở Google Maps',
    },
    footer: {
      summaryTitle: 'Dịch vụ tài xế riêng bằng VinFast Limo Green 7 chỗ',
      summary:
        'Phù hợp cho sân bay, công tác, gia đình và các chuyến liên tỉnh cần sự đúng giờ, sạch sẽ và dễ phối hợp.',
      quickLinksTitle: 'Đi nhanh',
      contactTitle: 'Kết nối',
      location: 'TP. Hồ Chí Minh, Việt Nam',
      availability: '05:30 - 22:30 hằng ngày, nhận lịch sớm hoặc muộn khi hẹn trước',
      copyright:
        '© {year} Lê Thảo Lái xe. Dịch vụ lái xe riêng vận hành độc lập.',
    },
    mobileBar: {
      call: 'Gọi',
      zalo: 'Zalo',
      book: 'Đặt lịch',
    },
  },
  en: {
    seo: {
      title: 'Le Thao Lai Xe | Private driver, airport transfer, and intercity ride service',
      description:
        'Le Thao Lai Xe provides private driver service for airport transfers, business travel, family trips, and nearby province routes with a VinFast Limo Green 7-seat vehicle.',
    },
    nav: {
      tagline: 'Private chauffeur service',
      callNow: 'Call now',
      zalo: 'Zalo',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      lightLabel: 'Light',
      darkLabel: 'Dark',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      languageToggleLabel: 'Switch language',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Vehicle', href: '#vehicle' },
        { label: 'Services', href: '#services' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    hero: {
      eyebrow: 'VinFast Limo Green 7-seat | Private chauffeur',
      title: 'Private travel that feels calm, polished, and on time.',
      description:
        'An owner-operated chauffeur service for airport transfers, work schedules, family travel, and nearby province routes that need a smoother rhythm.',
      badges: [
        'No pooled rides',
        'Clean vehicle before every trip',
        'Fast confirmation by phone or Zalo',
      ],
      primaryCta: 'Call to book',
      secondaryCta: 'Message on Zalo',
      stats: [
        {
          value: 'Spacious 7-seat cabin',
          label: 'Comfortable for families, business guests, and airport luggage.',
        },
        {
          value: 'Punctual pickup',
          label: 'Pickup time and route are confirmed clearly before the trip.',
        },
        {
          value: 'Quiet electric ride',
          label: 'A gentler experience for children, older passengers, and longer routes.',
        },
      ],
      imageAlt: 'VinFast Limo Green in pearl white',
      carCardLabel: 'Serving vehicle',
      assuranceLabel: 'Service promise',
      assurances: [
        'Directly operated by the owner-driver',
        'Calm driving with safety-first priorities',
        'Suitable for airport, business, family, and nearby province travel',
      ],
    },
    about: {
      eyebrow: 'Owner-driver introduction',
      title: 'Meet Le Thao, the owner-driver behind each trip.',
      description:
        'Le Thao personally confirms the trip details, arrival time, and route before driving each journey. The service is designed for guests who want privacy, clarity, and a calmer ride for airport, business, family, or intercity travel.',
      differenceTitle: 'What it feels like to ride with the owner-driver',
      differencePoints: [
        'Direct confirmation before pickup time',
        'No shared rides or driver changes mid-trip',
        'Close attention to timing and real route conditions',
      ],
      highlights: [
        {
          title: 'Calm driving',
          description:
            'Steady pacing and smooth handling help the trip feel safer and more relaxed.',
        },
        {
          title: 'Clear communication',
          description:
            'Pickup time, stop points, and route details are confirmed clearly in advance.',
        },
        {
          title: 'Punctuality',
          description:
            'Pickup timing is prepared in advance to reduce waiting and confusion.',
        },
        {
          title: 'Discreet and polite',
          description:
            'Suitable for both business guests and private family schedules.',
        },
        {
          title: 'Clean vehicle',
          description:
            'The cabin stays tidy, fresh, and pleasant from the moment passengers step in.',
        },
      ],
    },
    vehicle: {
      eyebrow: 'VinFast Limo Green 7-seat',
      title: 'Spacious, quiet, and well suited to family or business travel.',
      description:
        'The VinFast Limo Green offers a calm electric cabin, generous space, and a neat presentation for trips that should feel comfortable from start to finish.',
      specs: [
        { label: 'Dimensions', value: '4740 x 1872 x 1729 mm' },
        { label: 'Seating', value: '7 spacious seats' },
        { label: 'Battery', value: '60.13 kWh' },
        { label: 'Driving range', value: '450 km per charge (NEDC)' },
      ],
      usageLabel: 'Well suited for',
      usageNotes: [
        'Families with luggage, strollers, or several airport bags.',
        'Business travelers who prefer a clean, quiet, prepared vehicle.',
        'Day schedules and nearby province routes where comfort matters.',
      ],
    },
    services: {
      eyebrow: 'Common trip types',
      title: 'Trips prepared with calm rhythm and personal attention.',
      description:
        'Each service focuses on privacy, comfort, and easy booking for both family and business guests.',
      items: [
        {
          icon: 'airport',
          title: 'Airport transfer',
          description:
            'Reliable pickup or drop-off with enough room for luggage and a smoother start or finish to the day.',
        },
        {
          icon: 'business',
          title: 'Business travel',
          description:
            'Professional transfers for meetings, client visits, and executive schedules.',
        },
        {
          icon: 'family',
          title: 'Family travel',
          description:
            'Comfortable for older parents, children, and flexible family itineraries.',
        },
        {
          icon: 'province',
          title: 'Nearby province travel',
          description:
            'Suitable for short countryside visits, getaways, and nearby province routes.',
        },
        {
          icon: 'daily',
          title: 'Daily booking',
          description:
            'A practical full-day option for several appointments or family support.',
        },
        {
          icon: 'event',
          title: 'Event transportation',
          description:
            'Polished transport for weddings, conferences, gatherings, and private events.',
        },
      ],
    },
    whyChooseUs: {
      eyebrow: 'Why guests return',
      title: 'The strongest impression is simply peace of mind.',
      description:
        'A personal chauffeur service does not need loud promises. It needs a clean car, calm driving, and communication that feels dependable.',
      items: [
        {
          icon: 'driver',
          title: 'Steady driving',
          description:
            'Calm road manners and smooth pacing on both city and nearby province routes.',
        },
        {
          icon: 'clean',
          title: 'Clean vehicle',
          description:
            'The cabin is kept tidy so passengers feel comfortable right away.',
        },
        {
          icon: 'ontime',
          title: 'Always on time',
          description:
            'Pickup timing is confirmed clearly and prepared in advance.',
        },
        {
          icon: 'comfort',
          title: 'Comfortable ride',
          description:
            'Quiet electric travel and a spacious cabin help reduce fatigue.',
        },
        {
          icon: 'booking',
          title: 'Quick booking',
          description:
            'A short phone call or Zalo message is enough to confirm the basics.',
        },
        {
          icon: 'support',
          title: 'Easy communication',
          description:
            'Clear and respectful communication without pressure or confusion.',
        },
      ],
    },
    pricing: {
      eyebrow: 'Fare estimate',
      title: 'Enter pickup and destination to preview the trip cost.',
      description:
        'This estimator gives a quick preview based on distance and a rate per kilometre before you call.',
      note:
        'Final pricing may vary depending on waiting time, tolls, parking, traffic conditions, or extra stop points. The exact quote is confirmed once the trip details are clear.',
      table: {
        service: 'Service',
        price: 'From',
        suitableFor: 'Best for',
      },
      rows: [
        {
          service: 'Airport transfer',
          price: '650,000 VND',
          description:
            'Ho Chi Minh City <-> Tan Son Nhat Airport, especially for families with luggage.',
        },
        {
          service: 'City transfer',
          price: '450,000 VND',
          description:
            'Medical visits, appointments, meetings, or several city stops.',
        },
        {
          service: 'Province trip',
          price: '1,600,000 VND',
          description:
            'Dong Nai, Binh Duong, Ba Ria - Vung Tau, Long An, and nearby routes.',
        },
        {
          service: 'Daily booking',
          price: '2,800,000 VND',
          description:
            'About 8-10 flexible hours for workdays, events, or family support.',
        },
      ],
      cta: 'Get an exact quote',
    },
    testimonials: {
      eyebrow: 'Client feedback',
      title: 'Short notes about what the service feels like.',
      description:
        'Past guests often mention punctuality, cleanliness, and a calmer travel experience.',
      items: [
        {
          name: 'Minh Anh',
          role: 'Family traveler, Thao Dien',
          quote:
            'The car was clean, the ride was smooth, and the airport trip felt easy even with two young children.',
        },
        {
          name: 'Hoang Nam',
          role: 'Sales Manager, District 7',
          quote:
            'Timing matters a lot in my work. Communication is clear and easy to coordinate.',
        },
        {
          name: 'Lan Huong',
          role: 'Family trip, Vung Tau',
          quote:
            'I booked the service for my elderly parents and they felt very comfortable throughout the ride.',
        },
        {
          name: 'Duc Tri',
          role: 'Event producer, Binh Thanh',
          quote:
            'The schedule had several stops, but the overall rhythm still felt neat and calm.',
        },
      ],
    },
    booking: {
      eyebrow: 'Quick booking',
      title: 'Share the essentials so the trip can be confirmed faster.',
      description:
        'Leave your pickup point, destination, preferred time, and phone number. If the schedule fits, the trip will be confirmed quickly by phone or Zalo.',
      reassurance: [
        {
          title: 'Clear confirmation',
          description:
            'Pickup time, passenger count, and luggage details are checked before the trip is confirmed.',
        },
        {
          title: 'Fast response',
          description:
            'Most requests receive a reply within about 10-15 minutes during service hours.',
        },
        {
          title: 'Private information',
          description:
            'Your details are only used for booking support and trip coordination.',
        },
      ],
      fields: {
        name: {
          label: 'Name',
          placeholder: 'Example: Nguyen Minh Anh',
        },
        phone: {
          label: 'Phone number',
          placeholder: phoneDisplay,
        },
        pickup: {
          label: 'Pickup point',
          placeholder: 'Example: Thao Dien, District 2',
        },
        destination: {
          label: 'Destination',
          placeholder: 'Example: Tan Son Nhat Airport',
        },
        dateTime: {
          label: 'Pickup date and time',
          placeholder: '',
        },
        notes: {
          label: 'Extra notes',
          placeholder:
            'Example: elderly passenger, child, several bags, or an extra stop point.',
        },
      },
      errors: {
        name: 'Please enter a clear full name.',
        phone: 'Please enter a valid phone number.',
        pickup: 'Please enter the pickup point.',
        destination: 'Please enter the destination.',
        dateTime: 'Please choose a pickup date and time.',
        dateTimePast: 'Please choose a current or future time.',
      },
      submitLabel: 'Send booking request',
      submittingLabel: 'Sending request',
      successMessage:
        'Your request was sent successfully. Le Thao Lai Xe will contact you shortly to confirm the trip.',
      errorFallback:
        'The request could not be sent right now. Please try again later or call 0978 918 777 directly.',
      privacyNote:
        'Your information is only used for trip confirmation and fare support. It is not shared outside the service process.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Quick to contact, easy to scan, and cleaner across the whole section.',
      description:
        'For the fastest confirmation, call or message on Zalo directly. The map below is only a reference for where the vehicle is based, not a fixed pickup point for guests.',
      phoneLabel: 'Phone',
      zaloValue: phoneDisplay,
      facebookValue: 'Facebook / Messenger',
      coverageLabel: 'Service area',
      coverage: {
        vi: 'TP. Hồ Chí Minh, sân bay Tân Sơn Nhất, Nhơn Trạch, Đồng Nai và các tuyến liên tỉnh ngắn ngày.',
        en: 'Ho Chi Minh City, Tan Son Nhat Airport, Nhon Trach, Dong Nai, and nearby province routes.',
      },
      responseTime: {
        vi: 'Thường phản hồi trong khoảng 10-15 phút trong khung giờ hoạt động.',
        en: 'Typical response time is around 10-15 minutes during service hours.',
      },
      callNow: 'Call now',
      mapLabel: 'Reference map',
      mapTitle: 'Vehicle base and service coverage reference',
      openMap: 'Open Google Maps',
    },
    footer: {
      summaryTitle: 'Private chauffeur service with a VinFast Limo Green 7-seat vehicle',
      summary:
        'Suitable for airport transfers, business travel, family trips, and nearby province routes that need punctual, clean, and easy coordination.',
      quickLinksTitle: 'Quick links',
      contactTitle: 'Connect',
      location: 'Ho Chi Minh City, Vietnam',
      availability: '05:30 - 22:30 daily, with earlier or later schedules by advance booking',
      copyright:
        '© {year} Le Thao Lai Xe. Independently operated private driver service.',
    },
    mobileBar: {
      call: 'Call',
      zalo: 'Zalo',
      book: 'Book',
    },
  },
}
