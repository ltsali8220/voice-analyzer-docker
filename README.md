# Voice Analyzer App

Voice Analyzer is designed to take audio input from the user, and translate it into English if the user has not spoken in English. Additionally, it includes features to identify frequently used words and unique phrases.

### Frontend
- **Framework**: React.js ( Vite as the build tool )
- **Language**: JavaScript/TypeScript
- **Speech Recognition API**: Web Speech API
- **API Integration**: Axios or Fetch

### Backend
- **Framework**: Node.js with Express
- **Language**: JavaScript
- **API Integration**: Google Translation API
- **Database**: MongoDB 
- **Deployment**: Vercel

## Installation

### Frontend (Vite React.js)

#### Prerequisites
- Node.js (>=14.x)
- npm 

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/voice-analyzer.git
2. Navigate to the Client Directory
    ```bash
    cd voice-analyzer/client
3. Install the dependencies
    ```bash
    npm install
4. Start the development server
    ```bash
    npm run dev
-----------------------------------
### Backend (Node.js)

#### Prerequisites
- Node.js (>=14.x)
- npm 

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/voice-analyzer.git
2. Navigate to the backend directory:
    ```bash
    cd voice-analyzer/server
3. Install the dependencies
    ```bash
    npm install
4. Start the backend server
    ```bash
    npm start
## Usage

### Getting Started

1. **Accessing the Application:**
   - After installation and running the frontend and backend servers, access the application in your web browser.

2. **Recording and Translating Speech:**
   - Click on the "Record" button or speak into the microphone to provide audio input.
   - The application will transcribe the speech and, if necessary, translate it into English.

### Features

1. **Language Detection and Translation:**
   - The application detects the language spoken by the user based on user input.
   - If the spoken language is not English, the application translates the speech into English for user understanding.

2. **Identifying Frequently Used Words:**
   - The application analyzes transcribed text to identify frequently used words.
   - View a list of the most commonly used words for a given speech input.

3. **Identifying Unique Phrases:**
   - Analyzes the speech input to identify unique phrases or sentences spoken by the user.
   - Displays a list of the top 3 unique phrases detected.

## Supported Platforms

The Voice Analyzer App is compatible with the following web browsers and platforms:

### Desktop Browsers:
- Google Chrome
- Microsoft Edge
- Opera

### Mobile Browsers:
- Safari (iOS)
- Chrome (Android)
- Opera (Android)
- Samsung Internet
- WebView (Android)

## Usage Instructions

1. **Accessing the App:** Make sure you're using one of the supported browsers mentioned above.
2. **Recording Voice:** Grant the app permission to access your device's microphone.
3. **Analyzing Voice:** Speak clearly into the microphone to have your voice analyzed by the application.
4. **Viewing Insights:** The app will display insights and analysis based on your voice input.

## Known Limitations

- Functionality and performance might vary across different browser versions or platforms not listed in the supported platforms section.
- Some features may not be fully supported or optimized on non-supported browsers or platforms.

## Troubleshooting

If you encounter any issues while using the Voice Analyzer App, consider the following troubleshooting steps:

- Ensure you're using one of the supported browsers or platforms mentioned above.
- Check if the microphone permissions are enabled for the browser.
- Try refreshing the application or restarting the browser if you face any unexpected behavior.