# Investment Platform

An investment platform built with Angular and Ionic for portfolio management and stock search.

## Implementation Status

### Completed Features

- Portfolio dashboard with holdings display
- Stock purchasing functionality
- Use of Rxjs
- All the common components and it's variations

### Known Limitations

- **Animated Button**: Due to time constraints, animation button effects not implemented
- **Search Page**: Your organization's data cannot be pasted here, currently shows hardcoded data (not functional search)
- **Top 3 volume stocks**: Has not been implemented, but the common component is done
- **Unit Tests**: Only basic test implemented for a couple of methods.
- **UI Styling**: May not perfectly match original designs
- **Updating of % price change**: Will not update when a new buy is triggered
- **Duplicate Stock Purchases**: If the same stock is added multiple times, it doesn't combine to a single line

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

## Setup

- The project uses `json-server` for mock APIs and `concurrently` to run both the application and mock server together.
- This will start both the Angular development server and the json-server mock API concurrently.

## Stackblitz

- https://stackblitz.com/~/github.com/mathew-dcosta/stock-investment-platform
- **Note**: This project will not work with StackBlitz as `json-server` doesn't work well having other ports running in parallel.
- Kindly use the bash command below for running it locally.

```bash
npm install
npm run start
```
