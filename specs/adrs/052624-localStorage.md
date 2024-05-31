# Storing data using LocalStorage

## Context and Problem Statement

We are developing a Dev Journal application that includes features such as a to-do list, projects page, and a daily log for journals. The application needs to store data locally on the user's device to ensure quick access and make sure that their daily logs, task items, and project data isnt left if they shut the application. We need to decide on the most appropriate method for storing this data.

## Considered Options
* localStorage
* IndexedDB
* Some external database such as SQL or MongoDB

## Decision Outcome

**Chosen option**: localStorage

### Description of Options

#### localStorage
localStorage is a web storage API that allows websites to store data as key-value pairs in a web browser. The stored data persists even when the browser is closed and reopened.

**Advantages:**
- Simple to implement and use.
- Data persists across browser sessions.
- Sufficient for small to moderate amounts of data.
- No need for a server or backend setup.
- We learnt how to do this in lab and are familiar with how it works and why its useful.

**Disadvantages:**
- Limited storage capacity (typically around 5-10MB per domain).
- Not suitable for complex data structures (we don't have this though).
- Synchronous API, which might block the main thread.

#### IndexedDB
IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. It allows for complex queries and transactions.

**Advantages:**
- Capable of storing large amounts of data.
- Supports complex data structures and transactions.
- Asynchronous API, which avoids blocking the main thread.
- Provides powerful search and querying capabilities.

**Disadvantages:**
- More complex to implement compared to localStorage.
- Requires more boilerplate code and a deeper understanding of asynchronous programming.
- Overhead might be unnecessary for simple storage needs.

#### Some External Database such as SQL or MongoDB
Using an external database involves setting up a server-side database like SQL or MongoDB, where data is stored on a remote server and accessed via network requests.

**Advantages:**
- Capable of handling very large amounts of data.
- Suitable for complex queries and relationships between data.
- Provides robust security and data integrity features.
- Supports concurrent access and multi-user scenarios.

**Disadvantages:**
- Requires a backend server setup and maintenance.
- Introduces latency due to network requests.
- Dependency on an internet connection for data access.
- Increased complexity in terms of application architecture.
- We don't have time to implement this, nor are we familiar or have experience. Principle of Iron Triangle is important to remember here.

## Decision Outcome

**Chosen option**: localStorage

### Reasons for Choosing localStorage

We chose localStorage for storing data in the Dev Journal application due to several key reasons:

1. **Simplicity**: localStorage is straightforward to implement and requires minimal setup, making it ideal for our use case where we need to quickly store and retrieve small amounts of data.
2. **Persistence**: Data stored in localStorage persists across browser sessions, which is essential for maintaining user state and preferences between uses.
3. **Offline Capability**: With localStorage, users can access their to-do lists, project pages, and daily logs even when they are offline, ensuring uninterrupted usage.
4. **Sufficient Capacity**: For the scope of the Dev Journal application, the storage capacity provided by localStorage (around 5-10MB) is adequate to handle the expected amount of data.
5. **Familiarity**: This is particularly important since we do not have a lot of time for this project and need time to learn new tools. 

The benefits of localStorage for our specific use case outweigh the drawbacks. Its simplicity, persistence, and offline capabilities align well with the needs of the Dev Journal application, making it the best option for our current requirements.






