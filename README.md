# Stock Frontend

This project is a React-based frontend that allows users to upload `.xlsx` files containing stock data, stream stock information from a backend API, and display detailed stock information using styled components.

[Sample XLSX file here](https://github.com/shivamsouravjha/stock-frontend/blob/master/public/sample.xlsx)

## Features

- **Upload XLSX Files**: Users can upload multiple `.xlsx` files, and the data is streamed and parsed in real-time.
- **Live Streaming**: Stock data is fetched from the backend via streaming, allowing for real-time updates of stock information.
- **Stock Cards**: Stock details are displayed on individual cards, showing important metrics like ISIN, Industry, Market Value, and more.
- **Chakra UI Integration**: The project leverages Chakra UI for styling and user interface components.

## Technologies Used

- **React**: The frontend is built using React for creating interactive user interfaces.
- **Chakra UI**: For component-based styling and design.
- **Fetch API**: To handle file uploads and stream data from the backend.
- **Custom Hooks**: Reusable logic for handling file uploads and state management.
- **TextDecoder API**: For streaming and decoding stock data received from the backend.

## Installation and Setup

### Installation

This project uses Yarn as the package manager. Please follow the instructions below to get the project running locally.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shivamsouravjha/stock-frontend.git
   cd stock-frontend
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Run the development server**:

   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:5173`.

### Setting up environment variables

The project uses some environment variables which need to be defined inside a **.env** file at the root directory. Follow the steps to configure the .env file

1. Create a .env file in the root of your project directory.
2. Add the following variables

   ```bash
   VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
   VITE_GOOGLE_REDIRECT_URL=<your-google-redirect-url>
   ```

   If you want to use the sign-in functionality in the local development server, follow the below steps to obtain a google client id for you. If you don't need the sign-in functionality, you can assign a random text to the `VITE_GOOGLE_CLIENT_ID` and `VITE_GOOGLE_REDIRECT_URL` environment variables, and all other functionalities will work properly without sign-in support.

### Obtaining google client id

1. Click [here](https://support.google.com/cloud/answer/6158849?hl=en) and follow the instructions to create a google client ID.
   When setting up, enter the following values in the respective fields:

   - **Authorized JavaScript Origins**: `http://localhost:5173`
   - **Authorized Redirect URIs**: `http://localhost:5173`

2. Finally, go to [Google cloud console](https://console.cloud.google.com/apis/library/gmail.googleapis.com) and enable the Gmail API. This enusres that your application can access Gmail functionalities as part of the OAuth 2.0 setup process.

Now, set **VITE_GOOGLE_CLIENT_ID** to the obtained Client ID and **VITE_GOOGLE_REDIRECT_URL** to `http://localhost:5173`. Your local development server should now be configured correctly and functioning properly.

## File Structure

The main components and logic are split into reusable hooks and UI components:

- **`useUpload.js`**: Handles file selection, validation, uploading, and data streaming from the backend.
- **`Upload.js`**: Provides the UI for selecting files, uploading them, and displaying the stock cards.
- **`StockCard.js`**: Displays the detailed information for each stock in a card format.
- **`StockDataStream.js`**: Fetches and streams stock data from the backend using the Fetch API and displays it.

## Usage

### Upload and Stream Stock Data

1. **Select XLSX Files**: Click on the "Select XLSX Files" button to upload `.xlsx` files. Only valid `.xlsx` files are accepted.
2. **Upload Files**: After selecting files, click the "Upload" button to start uploading. The system will display a spinner indicating that the files are being processed.
3. **View Stock Data**: Once the files are uploaded, stock details will be streamed and displayed as cards, with information like ISIN, Market Value, and more.

## Example Code for File Upload

```javascript
const {
  files,
  uploadedFiles,
  stockDetails,
  loading,
  handleChangeFiles,
  handleUploadFiles,
} = useUpload()
```

## Contribution

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with detailed information about your changes.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.
