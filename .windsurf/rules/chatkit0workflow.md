---
trigger: always_on
---

This app is a next js project using app router
1. Try to use ShadCN Components that exist in the root components/ui folder in my app.
2. Try to use inline tailwind css styling for customizations don't use JSX styling.
3. Try to reuse components and try to keep styling consistent, my app has black bg so keep contrast of UI elements and design accordingly.
4. Keep Logic and UI Seperate:
    a. Use logic folder to create custom react hooks
    b. Use components folder inside a route folder to store custom components relevant to that route
    c. Use store folder to store global zustand states in a file called store.tsx
5. Don't start server or call npm run build yourself.
6. Use a file called interfaces.tsx in app/interfaces.tsx which will be used to manage and maintain all types across my project. Create all new types in that file don't create types anywhere else.
