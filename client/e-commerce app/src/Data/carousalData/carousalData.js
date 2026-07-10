import CPU2 from './../../images/Carousal Images/CPU (2).jpg'
import headset from './../../images/Carousal Images/Headset (3).jpg'
import mouse from './../../images/Carousal Images/Mouse (5).jpg'
import monitor from './../../images/Carousal Images/Monitor (3).jpg'


export const carousalImageData = [
  {
    id: 1,
    name: "Gaming CPU",
    price: 899,
    originalPrice: 999,
    rating: 4.8,
    reviewsCount: 125,
    badge: "Sale",
    image: CPU2
  },
  {
    id: 2,
    name: "Wireless Ergonomic Mouse",
    price: 49.99,
    originalPrice: null, // No sale badge for this item
    rating: 4.6,
    reviewsCount: 88,
    badge: "Best Seller",
    image: mouse
  },
  {
    id: 3,
    name: "Ultra-Wide Quad HD Monitor",
    price: 329.99,
    originalPrice: 359.99,
    rating: 4.9,
    reviewsCount: 56,
    badge: "Hot",
    image: monitor
  },
  {
    id: 4,
    name: "Noise-Canceling Studio Headset",
    price: 129.99,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 210,
    badge: null,
    image: headset
  }
]