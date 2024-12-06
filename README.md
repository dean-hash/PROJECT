# ValueEx - Affiliate Application Automation

ValueEx is an advanced platform for automating affiliate applications and managing affiliate programs. It streamlines the process of applying to multiple affiliate networks and provides comprehensive insights into your affiliate marketing efforts.

## Features

- Affiliate Network Dashboard: View and manage your affiliate network statuses.
- Application Automation: Automate the process of applying to multiple affiliate networks.
- Financial Dashboard: Track your earnings and financial metrics.
- UIF Connectivity Insights: Gain insights into your Unified Intelligence Field connectivity.
- Ethical Considerations: Ensure ethical practices in affiliate marketing.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dean-hash/ValueEx.git
   ```

2. Navigate to the project directory:
   ```
   cd ValueEx
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   REACT_APP_API_BASE_URL=https://api.example.com
   REACT_APP_SHAREASALE_API_TOKEN=your_shareasale_api_token
   REACT_APP_SHAREASALE_API_SECRET=your_shareasale_api_secret
   REACT_APP_SHAREASALE_AFFILIATE_ID=your_shareasale_affiliate_id
   REACT_APP_SENTRY_DSN=your_sentry_dsn
   ```

### Running the Application

To start the development server:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `build` directory.

## Testing

To run the unit tests:

```
npm test
```

To run the Cypress end-to-end tests:

```
npm run cypress:open
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The CI pipeline runs on every push to the main branch and on pull requests. It performs the following checks:

- Builds the project
- Runs unit tests
- Runs Cypress end-to-end tests

## Error Logging

We use Sentry for error logging and monitoring. Make sure to set the `REACT_APP_SENTRY_DSN` environment variable with your Sentry project's DSN.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.