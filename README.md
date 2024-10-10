# Stock Frontend

This project is a React-based frontend that allows users to upload `.xlsx` files containing stock data, stream stock information from a backend API, and display detailed stock information using styled components.

[Sample XLSX file here](https://github.com/shivamsouravjha/stock-frontend/blob/master/dsp-tax-saver-fund.xlsx)

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

To get the project running locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shivamsouravjha/stock-frontend.git
   cd stock-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

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
