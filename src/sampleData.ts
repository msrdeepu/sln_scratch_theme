import { VentureData } from './types';

export const SAMPLE_VENTURES: VentureData[] = [
  {
    id: 'highlands',
    title: 'SLN HIGHLANDS @ TADA',
    tagline: 'Premium Residential Plotted Gated Community in Tada Sri City Corridor',
    location: 'Tada, Sri City Growth Corridor',
    address: 'NH-16 Chennai-Kolkata Expressway, Near Tada Railway Station, Sri City Zone',
    reraNumber: 'P03270120199',
    heroBanner: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    overviewText: [
      'SLN HIGHLANDS is a master-planned plotted layout approved by competent authorities, situated along the prime Chennai-Tada highway corridor. Nestled adjacent to the burgeoning Sri City multi-product SEZ hub, it offers an exceptional blend of tranquility and rapid capital appreciation.',
      'Designed with 100% Vaastu compliance, wide avenue tree plantations, underground drainage, and state-of-the-art infrastructure, SLN Highlands caters to both discerning homebuilders and long-term land investors looking for assured spot registration and clear titles.'
    ],
    aboutImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    totalPlots: '180+',
    roadWidth: '40 & 50 Feet',
    stats: [
      { value: '180+', label: 'Total Plots' },
      { value: '40 & 50 Ft', label: 'BT Roads' },
      { value: '100%', label: 'Vaastu' },
      { value: '24/7', label: 'Security' },
      { value: '10 Mins', label: 'To Sri City' },
      { value: 'Clear Title', label: 'Spot Registry' }
    ],
    whyChoosePoints: [
      {
        icon: 'explore',
        title: 'Strategic Location & Highway Access',
        description: 'Direct signal-free connectivity to NH-16 (Chennai-Nellore Expressway), Tada Railway Station, and Pulicat Lake scenic sanctuary.'
      },
      {
        icon: 'trending_up',
        title: 'High-Yield Appreciation Potential',
        description: 'Located in the immediate expansion zone of Sri City industrial corridor with 200+ multinational companies employing 60,000+ professionals.'
      },
      {
        icon: 'verified',
        title: '100% Clear Title & Spot Registration',
        description: 'Complete legal transparency with all government approvals, conversion orders, and immediate registry assistance with leading bank loan tie-ups.'
      }
    ],
    amenities: [
      {
        id: 1,
        title: 'WiFi',
        icon: 'wifi',
        category: 'Connectivity',
        image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236429_wifi.png',
        iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236429_wifi.png',
        desc: 'High-speed fiber connectivity integrated across the layout.'
      },
      {
        id: 2,
        title: 'Power Connection',
        icon: 'bolt',
        category: 'Utilities',
        image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236449_power-connection.png',
        iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236449_power-connection.png',
        desc: 'Dedicated underground power cabling with individual plot feeder pillars.'
      },
      {
        id: 3,
        title: 'Swimming Pool',
        icon: 'pool',
        category: 'Recreation',
        image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236466_swimming-pool.png',
        iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236466_swimming-pool.png',
        desc: 'Resort-style luxury community swimming pool and deck lounge.'
      },
      {
        id: 4,
        title: 'Sewage pipe',
        icon: 'plumbing',
        category: 'Utilities',
        image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236485_sewage-pipe.png',
        iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236485_sewage-pipe.png',
        desc: '100% concealed underground sewage pipeline network.'
      },
      {
        id: 5,
        title: 'Fire Safety Equipment',
        icon: 'local_fire_department',
        category: 'Safety',
        image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236496_fire-safety-equipment.png',
        iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236496_fire-safety-equipment.png',
        desc: 'Modern certified fire prevention and safety hydrants.'
      },
      {
        id: 6,
        title: 'GRAND ENTRANCE ARCH',
        icon: 'architecture',
        category: 'Architecture',
        image: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236515_grand-entrance-arch.png',
        iconImage: 'https://cms.slnmplapp.com/core/public/uploads/amenities/1790236515_grand-entrance-arch.png',
        desc: 'Monumental architectural gateway with 24/7 guarded security access.'
      }
    ],
    locations: [
      {
        id: 4,
        title: 'Tirupati International Airport',
        distance: '10 KM',
        travelTime: '15 Mins Drive',
        group: 'AIRPORT',
        image: 'https://cms.slnmplapp.com/core/public/uploads/venture_locations/1790229584_arjunprime1.png'
      },
      {
        id: 5,
        title: 'TCL',
        distance: '8 KM',
        travelTime: '10 Mins Drive',
        group: 'Manufacturing Hub',
        image: 'https://cms.slnmplapp.com/core/public/uploads/venture_locations/1790229921_arjunprime2.jpg'
      },
      {
        id: 6,
        title: 'Srikalahasti Temple',
        distance: '15 KM',
        travelTime: '20 Mins Drive',
        group: 'Famous Temple Town',
        image: 'https://cms.slnmplapp.com/core/public/uploads/venture_locations/1790230131_arjunprime3.jpg'
      },
      {
        id: 7,
        title: 'Yerpedu',
        distance: '5 KM',
        travelTime: '7 Mins Drive',
        group: 'Town',
        image: 'https://cms.slnmplapp.com/core/public/uploads/venture_locations/1790230335_arjunprime4.jpg'
      }
    ],
    brochureMockup: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    brochureUrl: '#download-brochure',
    mapEmbedImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
    vimeoId: '1224659064',
    vimeoUrl: 'https://player.vimeo.com/video/1224659064',
    droneVideoTitle: 'ARJUN VENTURES Tada — 4K Cinematic Aerial Drone Walkthrough',
    faqs: [
      {
        question: 'What is the approval status of SLN HIGHLANDS?',
        answer: 'SLN HIGHLANDS is fully approved by competent town planning authorities and complies with all state cadastral and local municipal guidelines with spot registration eligibility.'
      },
      {
        question: 'Are bank loans available for purchasing plots here?',
        answer: 'Yes, leading public and private sector banks (SBI, HDFC, ICICI, and LIC HFL) have pre-approved the venture for plot loans and home construction financing.'
      },
      {
        question: 'What are the available plot dimensions in this venture?',
        answer: 'Standard plot sizes range from 150 sq. yards (30x45) up to 400+ sq. yards, offering both East and West facing options.'
      },
      {
        question: 'How far is the venture from Sri City SEZ and Chennai?',
        answer: 'The project is situated just 10 minutes drive from the Sri City main entrance and approx 55 km from North Chennai / Koyambedu via the signal-free NH-16 expressway.'
      }
    ],
    contact: {
      phone: '+91 98480 12345 / +91 94400 54321',
      email: 'enquiry@slnmplapp.com',
      branchAddress: 'SLN Marketing Pvt. Ltd., Highway Site Office, Tada-Sri City Bypass Road, Tada, Andhra Pradesh 524401.',
      googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31050.15024419996!2d80.005085!3d13.585526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d81232870197d%3A0xb35a0cfb247f082e!2sTada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000'
    }
  }
];
