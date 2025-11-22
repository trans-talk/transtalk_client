# 📱 Transtalk

**TransTalk** 는 언어의 장벽 없이 소통할 수 있도록 도와주는 실시간 번역 채팅 서비스입니다.

채팅방마다 원하는 언어를 선택하면, 보내는 메시지가 곧바로 선택된 언어로 번역되어 전달됩니다.  
친구와 번역 언어를 설정하여 대화하다 보면, 자연스럽게 새로운 언어를 익히는 경험도 할 수 있습니다.

## 📂 프로젝트 구조

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

- **배포** : `Vercel`
- 빌드 : `Vite`
- 다국어 지원 : `i18next`
- 프레임워크 & 언어 : `React`, `Typescript`
- 스타일링 : `Tailwind CSS`
- 상태관리 : `Tanstack query`
- 데이터 페칭 : `axios`
- 웹소켓 : `Stompjs`, `Sockjs`

## 📃 페이지별 기능

### [로그인]

- 서비스 접속 시 가장 먼저 보게 되는 화면입니다.
- 구글 소셜 로그인을 통해 별도의 회원가입 없이 빠르게 서비스를 이용할 수 있습니다.

<img width="300" alt="login" src="https://github.com/user-attachments/assets/5a042da6-6a55-46b2-ae6f-1f0620e338af" />

### [홈 (채팅방 리스트)]

- 로그인 후 가장 먼저 보여지는 메인 화면입니다.
- 참여 중인 채팅방 리스트가 최근 대화 시각을 기준으로 정렬되어 표시됩니다.
- 각 채팅방에는 상대방 프로필 사진, 이름, 번역 언어, 최근 메시지 시간, 원본 메시지, 번역 메시지, 읽지 않은 메시지 개수가 함께 표시됩니다.
- 효율적인 데이터 요청을 위해 무한 스크롤을 적용했습니다.
- 웹소켓을 통해 새로운 메시지가 도착하면 채팅방 리스트가 실시간으로 업데이트됩니다.

<img width="300" alt="home" src="https://github.com/user-attachments/assets/f1b4b569-a80d-471d-a92b-821cca0b2754" />

### [검색]

- 홈 화면 상단 헤더의 검색 버튼을 눌러 검색 창을 열 수 있습니다.
- 채팅 상대 이름을 기준으로 채팅방을 검색할 수 있습니다.
- 0.5초 디바운싱을 적용해 입력 이벤트와 데이터 요청을 최적화했습니다.

<img width="300" alt="search" src="https://github.com/user-attachments/assets/ca2b977d-32dd-42b2-a049-090bdc137f3f" />

### [새 채팅 시작하기]

- 홈 화면 우측 하단의 플로팅 버튼을 눌러 새 채팅 생성 모달을 띄울 수 있습니다.
- 가입된 사용자의 이메일과 번역 언어를 선택하여 새로운 채팅방을 생성할 수 있습니다. (Gmail 계정만 지원합니다.)
- 번역 언어는 한국어, 영어, 일본어, 중국어, 스페인어 중에서 선택할 수 있습니다.
- 채팅방이 성공적으로 생성되면 해당 채팅방 화면으로 바로 이동합니다.
- 동일한 정보로 이미 존재하는 채팅방이 있다면 새로 생성되지 않고 해당 채팅방으로 이동합니다.

<img width="300" alt="add-chat" src="https://github.com/user-attachments/assets/e48a0781-b235-4b7b-abd3-60e762c861d3" />

### [채팅방]

- 상단 헤더에 채팅 상대의 프로필 정보가 표시됩니다.
- 채팅 내역은 시간순으로 정렬되며, 최신 메시지는 화면 하단에 위치합니다.
- 각 메시지에는 원본 메시지, 번역된 메시지, 발송 시간이 함께 표시됩니다.
- 과거 메시지를 위로 스크롤하면 추가 데이터를 불러오는 **역방향 무한 스크롤**을 구현했습니다.
- 웹소켓을 이용해 실시간 채팅을 지원하며, 새 메시지를 받으면 자동으로 최하단으로 스크롤됩니다.

<img width="300" alt="chat-room" src="https://github.com/user-attachments/assets/6fe38dab-b591-4b17-9014-d29041ed130d" />
<img width="300" alt="chat-room-2" src="https://github.com/user-attachments/assets/901f5be7-eb9c-41f2-ac83-2dcbc3652af9" />

### [설정]

- 사용자 프로필 정보를 확인할 수 있고, 로그아웃 및 회원탈퇴 기능을 제공합니다.
- 로그아웃 또는 회원탈퇴를 누르면 실수 방지를 위해 확인 모달이 한 번 더 나타납니다.

<img width="300" alt="settings" src="https://github.com/user-attachments/assets/607defcf-fa18-492b-817a-e9e8caacb034" />
<img width="300" alt="logout-modal" src="https://github.com/user-attachments/assets/91ac410e-b493-4db5-9aad-e86788e1001e" />

## 🎨 화면설계서 (Figma)

### [Transtalk - Figma](https://www.figma.com/design/ugAgyCoQFW9h2ZVzums7wf/woowaprecourse-transtalk?node-id=0-1&t=qE1K3uPh7OuhgzAt-1)
