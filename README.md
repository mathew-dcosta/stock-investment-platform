# Investment Platform

An investment platform built with Angular and Ionic for portfolio management and stock search.

## Implementation Status

### Completed Features

- Portfolio dashboard with holdings display
- Stock purchasing functionality
- Use of Rxjs
- All the common components and it's variations
- Added edge cases

### Known Limitations

- **Animated Button**: Due to time constraints, animation button effects not implemented
- **Search Page**: Due to time constraints, only hardcoded data is used. If time was not an issue, would've added an endpoint for search and shown the data appropriately.
- **Top 3 volume stocks**: Due to time constraints, only hardcoded data is used. If time was not an issue, the data would've been fetched and displayed similar to trending stocks.
- **Unit Tests**: Only basic test implemented for a couple of methods.
- **UI Styling**: May not perfectly match original designs
- **Updating of % price change**: Will not update when a new buy is triggered
- **Duplicate Stock Purchases**: If the same stock is added multiple times, it doesn't combine to a single line
- **Horizontal Scrolling on desktop**: Desktop horizontal scrolling requires mobile viewport emulation in browser dev tools for optimal experience. Scrollbars are intentionally hidden on mobile to maintain clean UX as per design requirements. Horizontal mouse scrolls would work.
- **State Management / Data Persistence**: Implements BehaviorSubject for in-memory state management. Data resets on page refresh by design. Session storage could've also been used for the data persistence. Ideally would require API calls to persist data on the server.

## Technical Assumptions

- **Mock APIs**: Using mock data instead of actual API calls
- **Single Base URL**: All data obtained from one centralized endpoint
- **Development Focus**: Built for demonstration purposes

## Architecture Notes

- For larger projects, the common components, services, and data models would be extracted into separate npm packages and imported as dependencies. This would allow:
  - Code reusability across multiple applications
  - Independent versioning and updates
  - Better team separation and ownership

## Common Components

- **Card Component**: `DETAILED`, `COMPACT`, `SUMMARY` variants for different stock display formats
- **Instrument Component**: `STOCK`, `COMPANY` variants for holdings and company information
- **Badge Component**: `STOCK`, `ETF` variants for investment type indicators
- Components are designed with extensible variant patterns to easily add more variants in the future.
- Plans to add Storybook for component showcase and documentation would have been implemented if time was not a factor

## Application Flow

- Only on click of the trending stocks card, the add stock modal would appear
- Users can view their portfolio holdings on the main dashboard
- Stock purchasing is triggered through the trending stocks section

## Stackblitz

- https://stackblitz.com/~/github.com/mathew-dcosta/stock-investment-platform
- Kindly use the bash command below for running it locally.

```bash
npm install
npm run start
```
