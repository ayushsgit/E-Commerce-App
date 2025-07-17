# 🛍️ E-Commerce Mobile App

A modern, feature-rich ecommerce mobile application built with React Native and Expo, offering a seamless shopping experience with intuitive navigation and beautiful UI.

## 📱 Features

- **🏠 Home Screen**: Attractive hero banner, category navigation, and personalized product recommendations
- **🔍 Smart Search**: Real-time product search with instant filtering capabilities
- **📋 Product Catalog**: Browse products by categories (New Arrivals, Best Sellers, Sale)
- **🛒 Shopping Cart**: Add, remove, and manage items with quantity controls
- **💳 Product Details**: Comprehensive product information with high-quality images
- **🎨 Modern UI/UX**: Clean, intuitive design with smooth animations and transitions
- **📱 Responsive Design**: Optimized for various screen sizes and devices

## 🚀 Tech Stack

- **React Native** with Expo SDK 51
- **React Navigation** for seamless navigation
- **Expo Linear Gradient** for beautiful gradients
- **Expo Vector Icons** (Ionicons) for consistent iconography
- **React Native Safe Area Context** for proper device handling
- **JavaScript ES6+** for modern development

## 📸 Screenshots

| Home Screen | Product Listing | Shopping Cart | Product Detail |
|-------------|----------------|---------------|----------------|
| ![Home](![home](https://github.com/user-attachments/assets/5e52ddea-ccb2-4e53-bf44-724fd9ae9f0b)
) | ![Products](![products](https://github.com/user-attachments/assets/72d08037-db25-4100-b3c2-0657dc21e731)
) | ![Cart](![cart](https://github.com/user-attachments/assets/202d82a8-672f-4743-95ba-ecdf8a1ca69c)
) | ![Detail](![detail](https://github.com/user-attachments/assets/c7231c38-c9e1-4e37-ba8b-88a7f7ee35b7)
) |


## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Steps

1. **Clone the repository**
```
git clone https://github.com/ayushsgit/E-Commerce-App.git
cd E-Commerce-App
```

2. **Install dependencies**
```
npm install
```
3. **Start the development server**
```
npx expo start
```
4. **Run on your device**

   * Install Expo Go app on your phone
   * Scan the QR code from the terminal
   * Or use simulators: ``` npx expo start --ios``` or ```npx expo start --android```

## 📱 Running the App

### Using Expo Go (Recommended)

  1. Install Expo Go on your mobile device from App Store/Play Store
  2. Run ```npx expo start --tunnel``` in your project directory
  3. Scan the QR code with your device camera
  4. The app will open in Expo Go

### Using Simulators
  * iOS Simulator: ```npx expo start --ios``` (requires Xcode)
  * Android Emulator: ```npx expo start --android``` (requires Android Studio)
  * Web Browser: ```npx expo start --web```

## 🏗️ Project Structure

```
E-Commerce-App/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ProductCard.js   # Product display component
│   │   ├── SearchBar.js     # Search functionality
│   │   ├── TopNavigation.js # Header navigation
│   │   └── StatusBar.js     # Custom status bar
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js           # Main landing page
│   │   ├── ProductListingScreen.js # Product catalog
│   │   ├── CartScreen.js           # Shopping cart
│   │   └── ProductDetailScreen.js  # Product details
│   ├── theme/              # Design system
│   │   └── index.js        # Colors, typography, spacing
│   └── navigation/         # Navigation setup
│       └── AppNavigator.js # Route configuration
├── assets/                 # Images and static files
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── README.md            # This file

```

## Dependencies

  * React Native 0.74.x
  * Expo SDK 51
  * React Navigation v6
  * Expo Linear Gradient
  * Expo Vector Icons

## 👨‍💻 Author

**Ayush** - [@ayushsgit](https://github.com/ayushsgit)
