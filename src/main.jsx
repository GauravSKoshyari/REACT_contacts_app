import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./App";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { loadContact, loadContacts } from "./loaders";
import Contact from "./Contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={loadContacts}>
      {/* loader  - we can load the data associated with route , before that component is rendered and that data can be made available inside that component using some special hooks - useLoaderData*/}
      {/* component will have data returned by loader ; ContactList.jsx - line 8  ;  */}
      {/* ContactList is component within Layout */}

      {/* notice how we can access contactID */}
      <Route path="/contacts/:contactId" loader={({ params }) => loadContact(params.contactId)} element={<Contact />} />
      <Route
        path="/edit/:contactId"
        loader={({ params }) => loadContact(params.contactId)}
        element={<h1>edit contact</h1>}
      />
    </Route>
    // basically , <Layout/> wil be rendered and when i hit urls  like /contacts/:contactId , then  <Outlet/> in App.jsx is utilised
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
