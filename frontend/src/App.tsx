import React from 'react';
import './App.css';
import ProductGallery from "./product/gallery/ProductGallery";
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./static/Header";
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from "./product/detail/ProductDetail";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={"/menu"} element={
                        <ProductGallery/>
                    }/>
                    <Route path={"/details/:id"} element={
                        <ProductDetail/>
                    }/>
                </Routes>
            </BrowserRouter>
            <ToastContainer theme={"dark"}/>
        </div>
    );
}

export default App;
