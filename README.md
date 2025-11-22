[한국어 README](./README.ko.md)

# 📱 Transtalk

**TransTalk** is a real-time translation chat service that helps you communicate without language barriers.

For each chat room, you can choose a target language, and any message you send is immediately translated into that language before it’s delivered.  
By chatting with friends using different translation languages, you can naturally gain exposure to and learn new languages.

## 📂 Project Structure

```
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
│
├── public
│    └── transtalk-favicon.svg
└── src
     ├── api
          ├── apiRequest.ts
          └── reissue-access-token.ts
     ├── assets
          ├── logo
          │    ├── google-logo.png
          │    └── transtalk-logo.svg
          └── ui
          │    ├── arrow-down.svg
          │    ├── arrow-left.svg
          │    ├── arrow-up.svg
          │           .
          │           .
          │           .
     ├── components
     ├── constant
     ├── i18n
          ├── language
          └── index.ts
     ├── pages
          ├── ChatRoom
          │    ├── api
          │    ├── components
          │    ├── hooks
          │    ├── utils
          │    └── ChatRoom.tsx
          ├── Home
          │    ├── api
          │    ├── components
          │    ├── hooks
          │    ├── utils
          │    └── Home.tsx
          ├── Login
          │    ├── api
          │    ├── components
          │    ├── hooks
          │    ├── GoogleCallback.tsx
          │    └── Login.tsx
          └── Settings
          │    ├── api
          │    ├── components
          │    ├── hooks
          │    └── Settings.tsx
     ├── querykey
     ├── router
     ├── socket
     ├── styles
     ├── types
     ├── utils
     ├── App.tsx
     └── main.tsx
```

## 🛠 Front-end Developer Stack

<div align=start>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">  
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">  
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">  
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/tanstack query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
</div>

- Deployment: `Vercel`
- Build: `Vite`
- Internationalization: `i18next`
- Framework & Language: `React`, `TypeScript`
- Styling: `Tailwind CSS`
- State Management: `TanStack Query`
- Data Fetching: `axios`
- WebSocket: `STOMP.js`, `SockJS`

## 🔑 Key Technologies

- **Real-time communication with WebSocket**  
  Implemented real-time updates for the chat room list and chat messages using STOMP.js and SockJS.

- **Data/state management & infinite scroll with TanStack Query**  
  Manages server state efficiently with TanStack Query and applies **infinite scrolling** to both the chat room list and chat history to reduce unnecessary network requests.

- **Multilingual support with i18next**  
  Uses i18next to automatically apply the UI language based on the browser’s language settings, and is structured to make future language expansion easy.

## 📃 Page Features

### [Login]

- The first screen displayed when accessing the service.
- Users can quickly start using the service via Google social login without a separate sign-up process.

<img width="300" alt="login" src="https://github.com/user-attachments/assets/4f64c752-d847-4630-a2c1-57a467eee788" />
<img width="300" alt="login" src="https://github.com/user-attachments/assets/5a042da6-6a55-46b2-ae6f-1f0620e338af" />

### [Home (Chat Room List)]

- The main screen shown after logging in.
- Displays the list of chat rooms the user participates in, sorted by the most recent conversation time.
- Each chat room shows the other user’s profile image, name, translation language, timestamp of the latest message, original message, translated message, and the number of unread messages.
- Infinite scroll is applied for efficient data loading.
- When new messages arrive via WebSocket, the chat room list is updated in real time.

<img width="300" alt="home" src="https://github.com/user-attachments/assets/0b4de174-e035-4791-9848-4c7640676180" />
<img width="300" alt="home" src="https://github.com/user-attachments/assets/f1b4b569-a80d-471d-a92b-821cca0b2754" />

### [Search]

- Tap the search button in the home header to open the search input.
- You can search chat rooms by the other user’s name.
- A 0.5 second debounce is applied to optimize input handling and data requests.

<img width="300" alt="search" src="https://github.com/user-attachments/assets/ca2b977d-32dd-42b2-a049-090bdc137f3f" />

### [Start New Chat]

- Tap the floating button at the bottom-right of the home screen to open the new chat modal.
- You can start a new chat room by entering a registered user’s email and selecting a translation language. (Currently, only Gmail accounts are supported.)
- Supported translation languages: Korean, English, Japanese, Chinese, and Spanish.
- Once the chat room is successfully created, you are navigated directly into that chat room.
- If a chat room with the same information already exists, a new room is not created and you are redirected to the existing chat room instead.

<img width="300" alt="add-chat" src="https://github.com/user-attachments/assets/a55e30fe-f1d6-4072-bddd-0e620587c05b" />
<img width="300" alt="add-chat" src="https://github.com/user-attachments/assets/e48a0781-b235-4b7b-abd3-60e762c861d3" />

### [Chat Room]

- The header displays the other user’s profile information.
- Chat history is sorted by time, with the latest message at the bottom of the screen.
- Each message shows the original text, translated text, and the time it was sent.
- A **reverse infinite scroll** is implemented so that scrolling upward loads older messages.
- Real-time chatting is enabled via WebSocket, and when a new message arrives, the view automatically scrolls to the bottom.

<img width="300" alt="chat-room" src="https://github.com/user-attachments/assets/6fe38dab-b591-4b17-9014-d29041ed130d" />
<img width="300" alt="chat-room-2" src="https://github.com/user-attachments/assets/901f5be7-eb9c-41f2-ac83-2dcbc3652af9" />

### [Settings]

- Users can view their profile information and perform logout or account withdrawal.
- When the user selects logout or withdraw, a confirmation modal appears to prevent accidental actions.

<img width="300" alt="settings" src="https://github.com/user-attachments/assets/607defcf-fa18-492b-817a-e9e8caacb034" />
<img width="300" alt="logout-modal" src="https://github.com/user-attachments/assets/22a9ef8b-4c43-4257-a047-8ce41b83c38f" />
<img width="300" alt="logout-modal" src="https://github.com/user-attachments/assets/91ac410e-b493-4db5-9aad-e86788e1001e" />

## 🎨 UI Design (Figma)

### [Transtalk - Figma](https://www.figma.com/design/ugAgyCoQFW9h2ZVzums7wf/woowaprecourse-transtalk?node-id=0-1&t=qE1K3uPh7OuhgzAt-1)
