# ShoeZone React

A responsive React implementation of the ShoeZone mobile storefront from the supplied Figma design. The app is set up as a 375 × 812 mobile experience and adapts to desktop browsers.

## Run it

On Windows, double-click `start-shoezone.bat`. It installs the dependencies the first time and opens the app in your browser. Keep the terminal window open while the app is running; press `Ctrl+C` there to stop it.

You can also start it from a terminal in this folder:

```bash
npm install
npm run dev
```

Do not open `index.html` directly. Vite needs to serve the React modules. The project needs Node.js 20.19+ or 22.12+; install the current Node.js LTS release if `node` or `npm` is not available. See the [Vite setup guide](https://vite.dev/guide/).

## Included flows

- Three onboarding screens, sign-in, account creation, and password recovery
- Home catalog with brand filters, search, favourites, and quick add
- Product details with gallery selection, size selection, and add to cart
- Cart quantity changes and removal, checkout, and a payment success screen
- Notifications, profile, side menu, and order history

The storefront is a front-end prototype. Sign-in, payment, and order data use local UI state.
