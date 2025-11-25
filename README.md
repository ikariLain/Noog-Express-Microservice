# Noog Express Microservice – Stream.IO API

Detta repo innehåller Noogs fristående **Express‑microservice**, dedikerad till att hantera:

* Skapande av Stream.IO‑videosamtal
* Start av gruppsamtal
* Join/Leave av användare
* Hard delete av samtal
* Avslutning av samtal

Microservicen är helt frikopplad från Noogs .NET‑backend och används som en specialiserad Stream.IO‑API‑tjänst.

---

## 📌 Översikt

Denna microservice ingår i det större Noog‑systemet som utvecklats av:
**Michael, Matheus, Oliver och Simon**.

Noog är en kollaborationsplattform där användare kan:

* Skapa konto & projektgrupper
* Bjuda in medlemmar
* Köra videosamtal via Stream.IO
* Skapa AI‑genererade mötessammanfattningar (OpenAI)
* Få transkript av möten (AssemblyAI)

Denna microservice fokuserar på **samtalsdelen**.

---

## 🏗 Arkitektur i helheten

### 🔧 Backend

* ASP.NET Web API (.NET 8)
* Identity
* OpenAI (sammanfattningar)
* AssemblyAI (transkript)

### 🎨 Frontend (1)

* ASP.NET MVC + Razor

### ⚛️ Frontend (2) – React (Videosamtal)

* React + TypeScript
* Stream.IO Video SDK

### 🧩 Microservice – *detta repo*

* Express.js
* Stream.IO Server SDK
* Swagger för dokumentation

---

## 🎥 Funktionalitet

Denna microservice hanterar alla serveroperationer för Stream.IO:

### ✔ Skapa eller hämta samtal

### ✔ Starta gruppsamtal

### ✔ Radera samtal (hard delete)

### ✔ Join/Leave

### ✔ Avsluta ett samtal för alla

Microservicen exponerar ett rent REST‑API som används av både backend och React‑klienten.

---

## 📡 API – Översiktliga routes

Alla routes ligger under:

```
/api/StreamIOVideoCall
```

| Endpoints               | Metod  | Beskrivning                |
| ----------------------- | ------ | -------------------------- |
| `/\:callId`             | POST   | Skapar eller hämtar samtal |
| `/\:callId/group/start` | POST   | Startar gruppsamtal        |
| `/\:callId/join`        | POST   | Joinar ett samtal          |
| `/\:callId/remove`      | POST   | Tar bort deltagare         |
| `/\:callId/end`         | POST   | Avslutar samtalet          |
| `/\:callId`             | DELETE | Hard delete                |

Swagger finns på:

```
/docs
```

---

## 🧪 Hälsokontroll

```
GET /health → OK
```

---

## 🚀 Installation

```bash
npm install
npm run dev
```


Miljövariabler krävs för Stream.IO:

```
VITE_STREAM_API_KEY=...
VITE_STREAMIO_SECRET=...
```

Microservicen startar normalt på port **5000**.

---

## 🌐 Deployment

Microservicen driftsätts separat från huvudsystemet.

Exempel:
👉 [https://noog-express-microservice.onrender.com/](https://noog-express-microservice.onrender.com/)

---

## 📄 Licens

Endast för utbildningssyfte inom vårt skolprojekt.
